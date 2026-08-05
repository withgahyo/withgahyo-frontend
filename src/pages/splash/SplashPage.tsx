import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTE_PATHS } from '../../routes/routePaths'
import AuthLandingScene, {
  type AuthLandingStage,
} from '../../features/auth/components/AuthLandingScene'

const ILLUSTRATION_CROSSFADE_DELAY_MS = 900
const BUTTONS_IN_DELAY_MS = 1700
const NAVIGATE_DELAY_MS = 2400

function SplashPage() {
  const navigate = useNavigate()
  const [stage, setStage] = useState<AuthLandingStage>('initial')

  useEffect(() => {
    const rafId = requestAnimationFrame(() => setStage('logoIn'))
    const illustrationTimer = setTimeout(
      () => setStage('illustrationCrossfade'),
      ILLUSTRATION_CROSSFADE_DELAY_MS,
    )
    const buttonsTimer = setTimeout(
      () => setStage('buttonsIn'),
      BUTTONS_IN_DELAY_MS,
    )
    const navigateTimer = setTimeout(() => {
      navigate(ROUTE_PATHS.login, { replace: true })
    }, NAVIGATE_DELAY_MS)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(illustrationTimer)
      clearTimeout(buttonsTimer)
      clearTimeout(navigateTimer)
    }
  }, [navigate])

  return (
    <>
      <span role="status" aria-live="polite" className="sr-only">
        로그인 화면으로 이동합니다
      </span>
      <AuthLandingScene stage={stage} />
    </>
  )
}

export default SplashPage
