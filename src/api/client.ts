import axios, { AxiosHeaders, type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import type { ApiError, ApiResponse } from '../types/api'
import {
  clearAuthTokens,
  getAccessToken,
  getRefreshToken,
  setAuthTokens,
} from '../features/auth/utils/tokenStorage'
import { ROUTE_PATHS } from '../routes/routePaths'
import type { AuthTokenResponse } from './auth'

interface RetriableRequestConfig extends InternalAxiosRequestConfig {
  isRetry?: boolean
}

function unwrapTokenResponse(response: BackendApiResponse<AuthTokenResponse>) {
  if ('result' in response) {
    return response.result
  }

  return response.data
}

type BackendApiResponse<T> =
  | ApiResponse<T>
  | {
      success: boolean
      code: string
      message: string
      data: T
    }

const TOKEN_REFRESH_PATH = '/api/v1/auth/token/refresh'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''
const PUBLIC_AUTH_PATHS = [
  '/api/v1/auth/login/kakao',
  '/api/v1/auth/login/google',
  TOKEN_REFRESH_PATH,
]

let refreshPromise: Promise<AuthTokenResponse> | null = null

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken()
    const requestUrl = config.url ?? ''

    if (accessToken && !isPublicAuthPath(requestUrl)) {
      const headers = AxiosHeaders.from(config.headers)
      headers.set('Authorization', `Bearer ${accessToken}`)
      config.headers = headers
    }

    return config
  },
  (error) => Promise.reject(error),
)

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (axios.isAxiosError(error) && isUnauthorizedProtectedRequest(error)) {
      if (!shouldRefreshToken(error)) {
        handleAuthExpired()
        return Promise.reject(toApiError(error))
      }

      try {
        const tokens = await refreshTokens()
        const originalRequest = error.config as RetriableRequestConfig
        const headers = AxiosHeaders.from(originalRequest.headers)
        headers.set('Authorization', `Bearer ${tokens.accessToken}`)
        originalRequest.headers = headers
        originalRequest.isRetry = true

        return apiClient(originalRequest)
      } catch (refreshError) {
        handleAuthExpired()
        return Promise.reject(toApiError(refreshError))
      }
    }

    return Promise.reject(toApiError(error))
  },
)

function isUnauthorizedProtectedRequest(error: AxiosError) {
  const originalRequest = error.config as RetriableRequestConfig | undefined
  const requestUrl = originalRequest?.url ?? ''

  return (
    error.response?.status === 401 &&
    Boolean(originalRequest) &&
    !isPublicAuthPath(requestUrl)
  )
}

function shouldRefreshToken(error: AxiosError) {
  const originalRequest = error.config as RetriableRequestConfig | undefined

  return (
    !originalRequest?.isRetry &&
    Boolean(getRefreshToken())
  )
}

function isPublicAuthPath(url: string) {
  return PUBLIC_AUTH_PATHS.some((path) => url.includes(path))
}

function redirectToLogin() {
  if (typeof window === 'undefined') {
    return
  }

  const currentPath = `${window.location.pathname}${window.location.search}`
  if (currentPath.startsWith(ROUTE_PATHS.login)) {
    return
  }

  const redirect = encodeURIComponent(currentPath)
  window.location.assign(`${ROUTE_PATHS.login}?redirect=${redirect}`)
}

function handleAuthExpired() {
  clearAuthTokens()
  redirectToLogin()
}

async function refreshTokens() {
  const refreshToken = getRefreshToken()

  if (!refreshToken) {
    throw new Error('refresh token이 없습니다.')
  }

  if (!refreshPromise) {
    refreshPromise = axios
      .post<BackendApiResponse<AuthTokenResponse>>(
        `${API_BASE_URL}${TOKEN_REFRESH_PATH}`,
        { refreshToken },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((response) => {
        const tokens = unwrapTokenResponse(response.data)
        setAuthTokens(tokens)
        return tokens
      })
      .finally(() => {
        refreshPromise = null
      })
  }

  return refreshPromise
}

function toApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as ApiResponse<unknown> | undefined

    if (data && typeof data.code === 'string' && typeof data.message === 'string') {
      return {
        code: data.code,
        message: data.message,
        status: error.response?.status,
        cause: error,
      }
    }

    return {
      code: 'NETWORK_ERROR',
      message: error.message,
      status: error.response?.status,
      cause: error,
    }
  }

  return {
    code: 'UNKNOWN_ERROR',
    message: '알 수 없는 오류가 발생했습니다.',
    cause: error,
  }
}
