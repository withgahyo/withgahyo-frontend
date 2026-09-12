import { unwrapApiResponse } from './auth'
import { resolveApiAssetUrl } from './assetUrl'
import { apiClient } from './client'
import type { ApiResponse } from '../types/api'

type BackendApiResponse<T> =
  | ApiResponse<T>
  | {
      success: boolean
      code: string
      message: string
      data: T
    }

export interface UpdateUserProfileRequest {
  nickname?: string
  profileImageUrl?: string | null
}

export interface UserProfileResponse {
  userId: number
  email: string | null
  nickname: string
  profileImageUrl: string | null
}

export interface ProfileImageUploadResponse {
  profileImageUrl: string
}

export async function updateUserProfile(request: UpdateUserProfileRequest) {
  const response = await apiClient.patch<BackendApiResponse<UserProfileResponse>>(
    '/api/v1/users/me',
    request,
  )

  return normalizeProfileResponse(unwrapApiResponse(response.data))
}

export async function uploadProfileImage(file: File) {
  const formData = new FormData()
  formData.append('file', file)

  const response = await apiClient.post<BackendApiResponse<ProfileImageUploadResponse>>(
    '/api/v1/users/me/profile-image',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )

  const uploadResult = unwrapApiResponse(response.data)

  return {
    ...uploadResult,
    profileImageUrl: resolveApiAssetUrl(uploadResult.profileImageUrl),
  }
}

function normalizeProfileResponse(profile: UserProfileResponse): UserProfileResponse {
  return {
    ...profile,
    profileImageUrl: profile.profileImageUrl
      ? resolveApiAssetUrl(profile.profileImageUrl)
      : null,
  }
}
