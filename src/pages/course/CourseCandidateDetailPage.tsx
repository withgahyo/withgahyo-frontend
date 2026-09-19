import { useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import ConfirmLeaveModal from '../../components/common/ConfirmLeaveModal'
import { useBeforeUnloadWarning } from '../../hooks/useBeforeUnloadWarning'
import type { BackNavigationState } from '../../features/course/backNavigation'
import CourseDetailSheet from '../../features/course/components/CourseDetailSheet'
import CourseMap from '../../features/course/components/CourseMap'
import { useGenerationExitBlocker } from '../../features/course/hooks/useGenerationExitBlocker'
import {
  useCourseCandidateDetail,
  useSelectCourseCandidate,
} from '../../features/course/hooks/useCourseQueries'
import { ROUTE_PATHS } from '../../routes/routePaths'
import type { SheetState } from '../../features/course/types'

// CourseDetailPage 와 동일: 시트가 expanded일 때 지도 하단이 가려지는 비율.
const SHEET_RATIO = 0.62

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function CourseCandidateDetailPage() {
  const navigate = useNavigate()
  // courseId 는 경로에만 존재한다. 최종 이동 대상 courseId 는 selection 응답에서 받는다.
  const { generationId, candidateId } = useParams<{
    generationId: string
    candidateId: string
  }>()

  const numericGenerationId = generationId ? Number(generationId) : null
  const numericCandidateId = candidateId ? Number(candidateId) : null
  const hasValidParams =
    numericGenerationId != null &&
    Number.isFinite(numericGenerationId) &&
    numericCandidateId != null &&
    Number.isFinite(numericCandidateId)

  const {
    data: candidate,
    isError,
    isLoading,
  } = useCourseCandidateDetail(
    hasValidParams ? numericGenerationId : null,
    hasValidParams ? numericCandidateId : null,
  )
  const selectMutation = useSelectCourseCandidate(hasValidParams ? numericGenerationId : null)

  // 후보를 아직 확정하지 않은 동안에는 flow 밖으로 나가는 이동을 막는다.
  const isUnconfirmed = hasValidParams
  const { blocker, allowNextNavigation } = useGenerationExitBlocker(isUnconfirmed)
  useBeforeUnloadWarning(isUnconfirmed)

  const [sheetState, setSheetState] = useState<SheetState>('expanded')
  const [selectedPlaceId, setSelectedPlaceId] = useState<number | null>(null)
  const [cameraTick, setCameraTick] = useState(0)

  const bumpCamera = () => setCameraTick((tick) => tick + 1)
  const handleBack = () => navigate(-1)

  const changeSheetState = (next: SheetState) => {
    if (sheetState === next) return
    setSheetState(next)
    if (prefersReducedMotion()) bumpCamera()
  }

  const handleToggleSheet = () => {
    changeSheetState(sheetState === 'expanded' ? 'collapsed' : 'expanded')
  }

  const handlePlaceSelect = (id: number) => {
    setSelectedPlaceId(id)
    if (sheetState === 'expanded') {
      changeSheetState('collapsed')
    } else {
      bumpCamera()
    }
  }

  const handleShowFullCourse = () => {
    setSelectedPlaceId(null)
    bumpCamera()
  }

  const handleConfirm = () => {
    if (!hasValidParams || selectMutation.isPending) return
    selectMutation.mutate(numericCandidateId as number, {
      onSuccess: (data) => {
        allowNextNavigation()
        navigate(ROUTE_PATHS.courseDetail(String(data.courseId)), {
          replace: true,
          state: { backTo: ROUTE_PATHS.home } satisfies BackNavigationState,
        })
      },
    })
  }

  const mapBottomPadding =
    typeof window !== 'undefined' ? Math.round(window.innerHeight * SHEET_RATIO) : 0

  return (
    <div className="relative -mt-[env(safe-area-inset-top)] -mb-[env(safe-area-inset-bottom)] flex h-app flex-col overflow-hidden bg-surface-muted">
      <ConfirmLeaveModal
        isOpen={blocker.state === 'blocked'}
        title="아직 코스를 확정하지 않았어요"
        description={
          '지금 나가면 생성된 추천 코스를 선택하지 못할 수 있어요.\n그래도 나가시겠어요?'
        }
        onStay={() => blocker.reset?.()}
        onLeave={() => blocker.proceed?.()}
      />

      <button
        type="button"
        onClick={handleBack}
        aria-label="뒤로 가기"
        className="absolute left-3 top-[calc(env(safe-area-inset-top)+0.75rem)] z-20 flex h-10 w-10 items-center justify-center text-gray-500"
      >
        <ChevronLeft aria-hidden="true" size={30} />
      </button>

      {!hasValidParams || isError ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
          <p className="text-base font-semibold text-ink">추천 코스를 불러올 수 없어요</p>
          <p className="text-caption text-gray-400">잠시 후 다시 시도해주세요.</p>
          <button
            type="button"
            onClick={handleBack}
            className="mt-2 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white"
          >
            돌아가기
          </button>
        </div>
      ) : isLoading || !candidate ? (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-caption text-gray-400">추천 코스를 불러오는 중...</p>
        </div>
      ) : (
        <>
          <div className="absolute inset-0">
            <CourseMap
              places={candidate.places}
              selectedPlaceId={selectedPlaceId}
              sheetState={sheetState}
              bottomPadding={mapBottomPadding}
              cameraTick={cameraTick}
              onShowFullCourse={handleShowFullCourse}
            />
          </div>
          <CourseDetailSheet
            places={candidate.places}
            courseTitle={candidate.title}
            sheetState={sheetState}
            selectedPlaceId={selectedPlaceId}
            onToggleSheet={handleToggleSheet}
            onSheetStateChange={changeSheetState}
            onPlaceSelect={handlePlaceSelect}
            onSheetTransitionEnd={bumpCamera}
            onWishlist={() => {}}
            onConfirm={handleConfirm}
            confirmLabel={selectMutation.isPending ? '확정 중...' : '이 코스로 확정'}
            isConfirmPending={selectMutation.isPending}
            hideWishlist
          />
          {selectMutation.isError && (
            <p className="absolute inset-x-0 bottom-[calc(6rem+env(safe-area-inset-bottom))] z-20 text-center text-sm font-medium text-red-500">
              코스 확정에 실패했습니다. 다시 시도해주세요.
            </p>
          )}
        </>
      )}
    </div>
  )
}

export default CourseCandidateDetailPage
