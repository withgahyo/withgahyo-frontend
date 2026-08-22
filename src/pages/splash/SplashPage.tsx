import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTE_PATHS } from '../../routes/routePaths'
import AuthLandingScene, {
  type AuthLandingStage,
} from '../../features/auth/components/AuthLandingScene'
import { getStoredAuthTokens } from '../../features/auth/utils/tokenStorage'

const ILLUSTRATION_CROSSFADE_DELAY_MS = 900
const BUTTONS_IN_DELAY_MS = 1700
const NAVIGATE_DELAY_MS = 2400

function SplashPage() {
  const navigate = useNavigate()
  const [stage, setStage] = useState<AuthLandingStage>('initial')

  useEffect(() => {
    const hasStoredTokens = Boolean(getStoredAuthTokens())
    const navigationDelay = hasStoredTokens ? BUTTONS_IN_DELAY_MS : NAVIGATE_DELAY_MS
    const rafId = requestAnimationFrame(() => setStage('logoIn'))
    const illustrationTimer = setTimeout(
      () => setStage('illustrationCrossfade'),
      ILLUSTRATION_CROSSFADE_DELAY_MS,
    )
    const buttonsTimer = hasStoredTokens
      ? undefined
      : setTimeout(() => setStage('buttonsIn'), BUTTONS_IN_DELAY_MS)
    const navigateTimer = setTimeout(() => {
      const destination = hasStoredTokens ? ROUTE_PATHS.home : ROUTE_PATHS.login
      navigate(destination, { replace: true })
    }, navigationDelay)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(illustrationTimer)
      if (buttonsTimer) {
        clearTimeout(buttonsTimer)
      }
      clearTimeout(navigateTimer)
    }
  }, [navigate])

  return (
    <>
      <span role="status" aria-live="polite" className="sr-only">
        로그인 상태를 확인합니다
      </span>
      <AuthLandingScene stage={stage} />
    </>
  )
}

export default SplashPage
