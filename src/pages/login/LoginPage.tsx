import { useEffect, useState } from 'react'
import AuthLandingScene from '../../features/auth/components/AuthLandingScene'
import { buildOAuthAuthorizeUrl, type OAuthProvider } from '../../features/auth/config/oauth'

function LoginPage() {
  const [loadingProvider, setLoadingProvider] = useState<OAuthProvider | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>()

  useEffect(() => {
    const resetLoadingState = () => {
      setLoadingProvider(null)
    }

    window.addEventListener('pageshow', resetLoadingState)
    window.addEventListener('focus', resetLoadingState)

    return () => {
      window.removeEventListener('pageshow', resetLoadingState)
      window.removeEventListener('focus', resetLoadingState)
    }
  }, [])

  const handleOAuthLogin = (provider: OAuthProvider) => {
    try {
      setLoadingProvider(provider)
      setErrorMessage(undefined)
      window.location.assign(buildOAuthAuthorizeUrl(provider))
    } catch (error) {
      setLoadingProvider(null)
      setErrorMessage(error instanceof Error ? error.message : '로그인 설정을 확인할 수 없어요.')
    }
  }

  return (
    <AuthLandingScene
      stage="buttonsIn"
      isKakaoLoading={loadingProvider === 'kakao'}
      isGoogleLoading={loadingProvider === 'google'}
      errorMessage={errorMessage}
      onKakaoLogin={() => handleOAuthLogin('kakao')}
      onGoogleLogin={() => handleOAuthLogin('google')}
    />
  )
}

export default LoginPage
