import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
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
      .then(() => {
        navigate(ROUTE_PATHS.home, { replace: true })
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

  const message = getCallbackMessage({
    hasCode: Boolean(code),
    isError: Boolean(oauthError || status === 'error'),
    isPending: status === 'pending',
  })

  return (
    <main className="flex min-h-app flex-col items-center justify-center bg-brand-lime px-6 text-center">
      <p className="text-lg font-semibold text-ink">{message}</p>
      {(oauthError || status === 'error' || !code) && (
        <Link
          to={ROUTE_PATHS.login}
          replace
          className="mt-6 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink shadow-sm"
        >
          로그인 화면으로 돌아가기
        </Link>
      )}
    </main>
  )
}

interface CallbackMessageState {
  hasCode: boolean
  isError: boolean
  isPending: boolean
}

function getCallbackMessage({ hasCode, isError, isPending }: CallbackMessageState) {
  if (!hasCode) {
    return '로그인 정보를 확인할 수 없어요.'
  }

  if (isError) {
    return '로그인에 실패했어요. 로그인 화면으로 돌아갑니다.'
  }

  if (isPending) {
    return '로그인 중입니다.'
  }

  return '로그인을 준비하고 있어요.'
}

export default OAuthCallbackPage
