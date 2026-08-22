import { apiClient } from './client'
import type { ApiResponse } from '../types/api'

export interface SocialLoginRequest {
  authorizationCode: string
  redirectUri: string
}

export interface AuthTokenResponse {
  accessToken: string
  refreshToken: string
  tokenType?: string
  expiresIn?: number
  isNewUser?: boolean
  user?: AuthUserResponse
}

export interface AuthUserResponse {
  userId: number
  nickname: string
  profileImageUrl?: string | null
  email?: string | null
  onboardingCompleted?: boolean
}

export interface TokenRefreshRequest {
  refreshToken: string
}

type BackendApiResponse<T> = ApiResponse<T> | LegacyApiResponse<T>

interface LegacyApiResponse<T> {
  success: boolean
  code: string
  message: string
  data: T
}

export async function loginWithKakao(request: SocialLoginRequest) {
  const response = await apiClient.post<BackendApiResponse<AuthTokenResponse>>(
    '/api/v1/auth/login/kakao',
    request,
  )

  return unwrapApiResponse(response.data)
}

export async function loginWithGoogle(request: SocialLoginRequest) {
  const response = await apiClient.post<BackendApiResponse<AuthTokenResponse>>(
    '/api/v1/auth/login/google',
    request,
  )

  return unwrapApiResponse(response.data)
}

export async function refreshAuthToken(request: TokenRefreshRequest) {
  const response = await apiClient.post<BackendApiResponse<AuthTokenResponse>>(
    '/api/v1/auth/token/refresh',
    request,
  )

  return unwrapApiResponse(response.data)
}

export async function logout() {
  await apiClient.post<BackendApiResponse<null>>('/api/v1/auth/logout')
}

export async function withdrawUser() {
  await apiClient.delete<BackendApiResponse<null>>('/api/v1/users/me')
}

export function unwrapApiResponse<T>(response: BackendApiResponse<T>) {
  if ('result' in response) {
    return response.result
  }

  return response.data
}
