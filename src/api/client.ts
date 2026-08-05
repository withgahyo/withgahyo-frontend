import axios from 'axios'
import type { ApiError, ApiResponse } from '../types/api'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
)

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(toApiError(error)),
)

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
