import { Check } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTE_PATHS } from '../../routes/routePaths'

const NAVIGATE_DELAY_MS = 1500

function OnboardingCompletePage() {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const rafId = requestAnimationFrame(() => setIsVisible(true))
    const navigateTimer = setTimeout(() => {
      navigate(ROUTE_PATHS.home, { replace: true })
    }, NAVIGATE_DELAY_MS)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(navigateTimer)
    }
  }, [navigate])

  return (
    // Splash/Login과 동일하게 배경을 AppContainer의 Safe Area padding 밖까지 확장하고,
    // 콘텐츠는 안쪽 wrapper에서 다시 Safe Area 안으로 배치한다.
    // 이 라우트는 FlowLayout 하위라 FullscreenLayout을 쓰지 않으므로 이 페이지 안에서 자체 처리한다.
    <div className="min-h-app relative -mt-[env(safe-area-inset-top)] -mb-[env(safe-area-inset-bottom)] h-[calc(100%+env(safe-area-inset-top)+env(safe-area-inset-bottom))] overflow-hidden bg-brand-lime">
      <span role="status" aria-live="polite" className="sr-only">
        홈 화면으로 이동합니다
      </span>

      <div className="absolute inset-x-0 top-[env(safe-area-inset-top)] bottom-[env(safe-area-inset-bottom)] flex flex-col items-center justify-center gap-4 px-6 text-center">
        {/* TODO: 실제 브랜드 완료 일러스트 asset 준비되면 Check 아이콘 교체 */}
        <div
          className={`flex h-20 w-20 items-center justify-center rounded-full bg-brand-blue transition-all duration-300 ease-out motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${
            isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
          }`}
        >
          <Check size={40} strokeWidth={3} className="text-white" aria-hidden="true" />
        </div>

        <h1
          className={`text-heading font-bold text-ink transition-all delay-150 duration-300 ease-out motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
          }`}
        >
          이제 같이 가효!
        </h1>

        <p
          className={`whitespace-pre-line text-sm text-ink/70 transition-all delay-300 duration-300 ease-out motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
          }`}
        >
          {'취향과 컨디션을 모두 확인했어요.\n우리 가족에게 꼭 맞는 여행을 준비해드릴게요.'}
        </p>
      </div>
    </div>
  )
}

export default OnboardingCompletePage
