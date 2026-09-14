import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import BrandLoadingScreen from '../../components/common/BrandLoadingScreen'
import ConfirmLeaveModal from '../../components/common/ConfirmLeaveModal'
import { useBeforeUnloadWarning } from '../../hooks/useBeforeUnloadWarning'
import { ROUTE_PATHS } from '../../routes/routePaths'
import { COURSE_GENERATION_POLL_TIMEOUT_MS } from '../../features/course/constants'
import CourseGenerationTips from '../../features/course/components/CourseGenerationTips'
import { useGenerationExitBlocker } from '../../features/course/hooks/useGenerationExitBlocker'
import {
  isGenerationCompleted,
  isGenerationFailed,
  useCourseGeneration,
} from '../../features/course/hooks/useCourseQueries'

interface GenerationStateScreenProps {
  title: string
  description: string
  onRetry: () => void
  onHome: () => void
}

// 브랜드 블루 풀블리드 배경 위의 안내 + 액션 화면. (로딩 화면과 톤을 맞춘다)
function GenerationStateScreen({
  title,
  description,
  onRetry,
  onHome,
}: GenerationStateScreenProps) {
  return (
    <div className="min-h-app relative -mb-[env(safe-area-inset-bottom)] -mt-[env(safe-area-inset-top)] flex h-[calc(100%+env(safe-area-inset-top)+env(safe-area-inset-bottom))] flex-col items-center justify-center gap-4 bg-brand-blue px-8 text-center">
      <p className="text-lg font-bold text-white">{title}</p>
      <p className="whitespace-pre-line text-sm text-brand-lime">{description}</p>
      <div className="mt-2 flex gap-2">
        <button
          type="button"
          onClick={onHome}
          className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white"
        >
          홈으로
        </button>
        <button
          type="button"
          onClick={onRetry}
          className="rounded-full bg-brand-lime px-5 py-2.5 text-sm font-semibold text-brand-blue"
        >
          다시 시도
        </button>
      </div>
    </div>
  )
}

function CourseGeneratingPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { courseId, generationId } = useParams<{ courseId: string; generationId: string }>()

  const numericGenerationId = generationId ? Number(generationId) : null
  const hasValidParams =
    Boolean(courseId) && numericGenerationId != null && Number.isFinite(numericGenerationId)

  const [timedOut, setTimedOut] = useState(false)

  const { data, isError } = useCourseGeneration(hasValidParams ? numericGenerationId : null, {
    enabled: !timedOut,
  })

  const completed = isGenerationCompleted(data?.status)
  const failed = isGenerationFailed(data?.status) || data?.failureCode != null

  // 실제로 생성이 "진행 중"인 동안에만 이탈을 막는다. 완료/실패/타임아웃/에러/잘못된 접근이면 막지 않는다.
  const isGenerationInProgress = hasValidParams && !completed && !failed && !timedOut && !isError
  const { blocker, allowNextNavigation } = useGenerationExitBlocker(isGenerationInProgress)
  useBeforeUnloadWarning(isGenerationInProgress)

  // COMPLETED → 추천 후보 목록으로 이동. 자동 이동이므로 이탈 방지 blocker에 걸리면 안 된다.
  useEffect(() => {
    if (!completed || !courseId || !generationId) return
    allowNextNavigation()
    navigate(ROUTE_PATHS.courseRecommendations(courseId, generationId), {
      replace: true,
      state: location.state,
    })
  }, [completed, courseId, generationId, location.state, navigate, allowNextNavigation])

  // 90초 timeout 가드 — backend FAILED 와는 구분되는 별도 상태. unmount 시 timer 정리.
  useEffect(() => {
    if (completed || failed) return
    const timer = setTimeout(() => setTimedOut(true), COURSE_GENERATION_POLL_TIMEOUT_MS)
    return () => clearTimeout(timer)
  }, [completed, failed])

  const handleRetry = () => navigate(ROUTE_PATHS.courseCreate, { replace: true })
  const handleHome = () => navigate(ROUTE_PATHS.home, { replace: true })

  if (!hasValidParams) {
    return (
      <GenerationStateScreen
        title="잘못된 접근이에요"
        description={'추천 생성 정보를 찾을 수 없습니다.\n코스를 다시 만들어주세요.'}
        onRetry={handleRetry}
        onHome={handleHome}
      />
    )
  }

  if (isError) {
    return (
      <GenerationStateScreen
        title="상태를 불러오지 못했어요"
        description={
          '추천 생성 상태를 확인하는 중 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.'
        }
        onRetry={handleRetry}
        onHome={handleHome}
      />
    )
  }

  if (failed) {
    return (
      <GenerationStateScreen
        title="추천 생성에 실패했어요"
        description={
          data?.failureMessage ??
          '조건에 맞는 코스를 만들지 못했습니다.\n조건을 바꿔 다시 시도해주세요.'
        }
        onRetry={handleRetry}
        onHome={handleHome}
      />
    )
  }

  if (timedOut) {
    return (
      <GenerationStateScreen
        title="조금만 더 기다려주세요"
        description={'추천 생성 시간이 예상보다 길어지고 있습니다.\n다시 시도해주세요.'}
        onRetry={handleRetry}
        onHome={handleHome}
      />
    )
  }

  // progress/currentStage 는 API 스펙상 null 을 허용한다. null이면 0%로 오해할 수 있는
  // progress bar 를 그리지 않고 기존 pulse 애니메이션(indeterminate)만 보여준다.
  const progress =
    typeof data?.progress === 'number' && Number.isFinite(data.progress) ? data.progress : null
  const stageDescription = data?.currentStage?.trim() ? data.currentStage : null

  return (
    <>
      <BrandLoadingScreen
        message="AI 코스 생성 중..."
        srMessage={
          progress != null
            ? `AI가 여행 코스를 만들고 있습니다. 진행률 ${Math.round(progress)}퍼센트`
            : 'AI가 여행 코스를 만들고 있습니다'
        }
        description={stageDescription}
        progress={progress}
      >
        <CourseGenerationTips />
      </BrandLoadingScreen>

      <ConfirmLeaveModal
        isOpen={blocker.state === 'blocked'}
        title="코스를 생성하고 있어요"
        description={'지금 나가면 생성 중인 코스를 확인하지 못할 수 있어요.\n그래도 나가시겠어요?'}
        onStay={() => blocker.reset?.()}
        onLeave={() => blocker.proceed?.()}
      />
    </>
  )
}

export default CourseGeneratingPage
