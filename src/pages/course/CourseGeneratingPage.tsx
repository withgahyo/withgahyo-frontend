import { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import brandLogo from '../../assets/splash/splash-logo-lime.svg'
import vectorDecoration from '../../assets/splash/Vector.svg'
import { ROUTE_PATHS } from '../../routes/routePaths'

// 실제 API 연동 전 UI 확인을 위한 임시 대기 시간
const MOCK_GENERATION_DELAY_MS = 1800

function CourseGeneratingPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { generationId } = useParams<{ generationId: string }>()

  useEffect(() => {
    if (!generationId) return

    // TODO: AI 코스 생성 API 연동 후 응답 완료 시점에 추천 결과 페이지로 이동
    const timer = setTimeout(() => {
      navigate(ROUTE_PATHS.courseRecommendations(generationId), {
        replace: true,
        state: location.state,
      })
    }, MOCK_GENERATION_DELAY_MS)

    return () => clearTimeout(timer)
  }, [generationId, location.state, navigate])

  return (
    // Splash/온보딩 완료 화면과 동일하게 배경을 AppContainer의 Safe Area padding 밖까지
    // 확장하고, 콘텐츠는 안쪽 wrapper에서 다시 Safe Area 안으로 배치한다.
    <div className="min-h-app relative -mt-[env(safe-area-inset-top)] -mb-[env(safe-area-inset-bottom)] h-[calc(100%+env(safe-area-inset-top)+env(safe-area-inset-bottom))] overflow-hidden bg-brand-blue">
      <span role="status" aria-live="polite" className="sr-only">
        AI가 여행 코스를 만들고 있습니다
      </span>

      <div className="absolute inset-x-0 top-[env(safe-area-inset-top)] bottom-[env(safe-area-inset-bottom)]">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <img
            src={brandLogo}
            alt=""
            aria-hidden="true"
            className="w-16 animate-pulse motion-reduce:animate-none"
          />
          <p className="text-base font-semibold text-brand-lime">AI 코스 생성 중...</p>
        </div>

        <img
          src={vectorDecoration}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-4 -right-8 w-[130%] max-w-none"
        />
      </div>
    </div>
  )
}

export default CourseGeneratingPage
