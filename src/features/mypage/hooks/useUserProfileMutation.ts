import { useMutation } from '@tanstack/react-query'
import {
  updateUserProfile,
  uploadProfileImage,
  type ProfileImageUploadResponse,
  type UserProfileResponse,
} from '../../../api/user'
import { getStoredAuthUser, setAuthUser } from '../../auth/utils/tokenStorage'

export function useUserProfileMutation() {
  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (profile: UserProfileResponse) => {
      const storedUser = getStoredAuthUser()

      setAuthUser({
        userId: profile.userId,
        email: profile.email,
        nickname: profile.nickname,
        profileImageUrl: profile.profileImageUrl,
        onboardingCompleted: storedUser?.onboardingCompleted,
      })
    },
  })
}

export function useProfileImageUploadMutation() {
  return useMutation({
    mutationFn: uploadProfileImage,
    onSuccess: (profileImage: ProfileImageUploadResponse) => {
      const storedUser = getStoredAuthUser()

      if (!storedUser) {
        return
      }

      setAuthUser({
        ...storedUser,
        profileImageUrl: profileImage.profileImageUrl,
      })
    },
  })
}
