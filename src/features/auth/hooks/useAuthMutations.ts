import { useMutation } from '@tanstack/react-query'
import {
  loginWithGoogle,
  loginWithKakao,
  logout,
  type AuthTokenResponse,
  type SocialLoginRequest,
} from '../../../api/auth'
import { clearAuthTokens, setAuthTokens } from '../utils/tokenStorage'
import type { OAuthProvider } from '../config/oauth'

interface SocialLoginVariables extends SocialLoginRequest {
  provider: OAuthProvider
}

function loginByProvider({ provider, ...request }: SocialLoginVariables) {
  if (provider === 'kakao') {
    return loginWithKakao(request)
  }

  return loginWithGoogle(request)
}

export function useSocialLoginMutation() {
  return useMutation<AuthTokenResponse, Error, SocialLoginVariables>({
    mutationFn: loginByProvider,
    onSuccess: setAuthTokens,
  })
}

export function useLogoutMutation() {
  return useMutation({
    mutationFn: logout,
    onSettled: clearAuthTokens,
  })
}
