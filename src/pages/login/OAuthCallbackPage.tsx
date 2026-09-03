import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import BrandLoadingScreen from '../../components/common/BrandLoadingScreen'
import { useSocialLoginMutation } from '../../features/auth/hooks/useAuthMutations'
import { getOAuthRedirectUri, type OAuthProvider } from '../../features/auth/config/oauth'
import { clearAuthTokens } from '../../features/auth/utils/tokenStorage'
import { ROUTE_PATHS } from '../../routes/routePaths'

interface OAuthCallbackPageProps {
  provider: OAuthProvider
}

type CallbackStatus = 'ready' | 'pending' | 'error'

function OAuthCallbackPage({ provider }: OAuthCallbackPageProps) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const socialLoginMutation = useSocialLoginMutation()
  const { mutateAsync } = socialLoginMutation
  const code = searchParams.get('code')
  const oauthError = searchParams.get('error')
  const attemptedLoginKeyRef = useRef<string | undefined>(undefined)
  const [status, setStatus] = useState<CallbackStatus>('ready')

  useEffect(() => {
    const loginKey = code ? `${provider}:${code}` : undefined

    if (!code || !loginKey || oauthError) {
      return
    }

    if (attemptedLoginKeyRef.current === loginKey) {
      return
    }

    attemptedLoginKeyRef.current = loginKey
    setStatus('pending')

    mutateAsync({
      provider,
      authorizationCode: code,
      redirectUri: getOAuthRedirectUri(provider),
    })
      .then((result) => {
        const onboardingCompleted = result.user?.onboardingCompleted ?? false
        navigate(onboardingCompleted ? ROUTE_PATHS.home : ROUTE_PATHS.onboardingTourism, {
          replace: true,
        })
      })
      .catch(() => {
        clearAuthTokens()
        setStatus('error')

        window.setTimeout(() => {
          navigate(ROUTE_PATHS.login, { replace: true })
        }, 1200)
      })
  }, [code, mutateAsync, navigate, oauthError, provider])

  useEffect(() => {
    if (!oauthError) {
      return
    }

    clearAuthTokens()

    const timerId = window.setTimeout(() => {
      navigate(ROUTE_PATHS.login, { replace: true })
    }, 1200)

    return () => {
      window.clearTimeout(timerId)
    }
  }, [navigate, oauthError])

  const isFailure = Boolean(oauthError || status === 'error' || !code)

  // 로그인 진행 중에는 코스 생성 화면과 동일한 브랜드 로딩 화면을 보여준다.
  if (!isFailure) {
    return (
      <BrandLoadingScreen
        message={status === 'pending' ? '로그인 중이에요...' : '로그인을 준비하고 있어요...'}
        srMessage="로그인을 진행하고 있습니다"
      />
    )
  }

  return (
    <main className="flex min-h-app flex-col items-center justify-center bg-brand-lime px-6 text-center">
      <p className="text-lg font-semibold text-ink">{getFailureMessage(Boolean(code))}</p>
      <Link
        to={ROUTE_PATHS.login}
        replace
        className="mt-6 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink shadow-sm"
      >
        로그인 화면으로 돌아가기
      </Link>
    </main>
  )
}

function getFailureMessage(hasCode: boolean) {
  if (!hasCode) {
    return '로그인 정보를 확인할 수 없어요.'
  }

  return '로그인에 실패했어요. 로그인 화면으로 돌아갑니다.'
}

export default OAuthCallbackPage
