import { unwrapApiResponse } from '../../../api/auth'
import { apiClient } from '../../../api/client'
import type { ApiResponse } from '../../../types/api'
import type { OnboardingSaveRequest, PreferenceOption } from './types'

type BackendApiResponse<T> =
  | ApiResponse<T>
  | {
      success: boolean
      code: string
      message: string
      data: T
    }

export async function getTourismPreferenceOptions() {
  const response = await apiClient.get<BackendApiResponse<PreferenceOption[]>>(
    '/api/v1/onboarding/tourism-preferences',
  )

  return unwrapApiResponse(response.data)
}

export async function getFoodPreferenceOptions() {
  const response = await apiClient.get<BackendApiResponse<PreferenceOption[]>>(
    '/api/v1/onboarding/food-preferences',
  )

  return unwrapApiResponse(response.data)
}

export async function saveOnboarding(request: OnboardingSaveRequest) {
  const response = await apiClient.put<BackendApiResponse<null>>(
    '/api/v1/users/me/onboarding',
    request,
  )

  // HTTP 2xx 라도 envelope 가 논리적 실패(success/isSuccess === false)면 throw 한다.
  unwrapApiResponse(response.data)
}

export async function completeOnboarding() {
  const response = await apiClient.post<BackendApiResponse<null>>(
    '/api/v1/users/me/onboarding/complete',
  )

  unwrapApiResponse(response.data)
}
