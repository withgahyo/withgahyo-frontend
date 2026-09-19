import { ChevronLeft, Pencil, RefreshCw } from 'lucide-react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import vectorDecoration from '../../assets/splash/Vector.svg'
import ConfirmLeaveModal from '../../components/common/ConfirmLeaveModal'
import { useBeforeUnloadWarning } from '../../hooks/useBeforeUnloadWarning'
import RecommendedCourseCard from '../../features/course/components/RecommendedCourseCard'
import { useGenerationExitBlocker } from '../../features/course/hooks/useGenerationExitBlocker'
import {
  useCourseCandidates,
  useSelectCourseCandidate,
} from '../../features/course/hooks/useCourseQueries'
import { ROUTE_PATHS } from '../../routes/routePaths'

interface RecommendationLocationState {
  courseName?: string
}

function CourseRecommendationsPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { courseId, generationId } = useParams<{ courseId: string; generationId: string }>()
  const state = location.state as RecommendationLocationState | null
  const courseName = state?.courseName?.trim() || '추천 코스'

  const numericGenerationId = generationId ? Number(generationId) : null
  const hasValidParams =
    Boolean(courseId) && numericGenerationId != null && Number.isFinite(numericGenerationId)

  const candidatesQuery = useCourseCandidates(hasValidParams ? numericGenerationId : null)
  const selectMutation = useSelectCourseCandidate(hasValidParams ? numericGenerationId : null)

  const candidates = candidatesQuery.data?.candidates ?? []

  // 후보를 아직 확정하지 않은 동안에는 flow 밖으로 나가는 이동을 막는다.
  const isUnconfirmed = hasValidParams
  const { blocker, allowNextNavigation } = useGenerationExitBlocker(isUnconfirmed)
  useBeforeUnloadWarning(isUnconfirmed)

  const handleSelect = (candidateId: number) => {
    if (selectMutation.isPending) return
    selectMutation.mutate(candidateId, {
      onSuccess: (data) => {
        allowNextNavigation()
        navigate(ROUTE_PATHS.courseDetail(String(data.courseId)), { replace: true })
      },
    })
  }

  return (
    // CourseCreatePage와 동일하게 Hero는 고정, 흰 Sheet 내부에서만 스크롤한다.
    <div className="relative -mt-[env(safe-area-inset-top)] -mb-[env(safe-area-inset-bottom)] flex h-app flex-col overflow-hidden">
      <ConfirmLeaveModal
        isOpen={blocker.state === 'blocked'}
        title="아직 코스를 확정하지 않았어요"
        description={'지금 나가면 생성된 추천 코스를 선택하지 못해요.\n그래도 나가시겠어요?'}
        onStay={() => blocker.reset?.()}
        onLeave={() => blocker.proceed?.()}
      />
      <div className="relative shrink-0 overflow-hidden bg-brand-blue">
        <img
          src={vectorDecoration}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 -top-10 w-[120%] max-w-none"
        />

        <div className="relative z-10 flex flex-col gap-3 px-6 py-12">
          <h1 className="whitespace-pre-line text-2xl font-bold leading-snug text-white">
            <button
              type="button"
              onClick={() => navigate(-1)}
              aria-label="뒤로 가기"
              className="mr-0.5 -ml-1 pb-1 inline-flex items-center justify-center rounded-full align-middle text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-lime"
            >
              <ChevronLeft aria-hidden="true" size={24} />
            </button>
            {'우리 가족을 위한\n맞춤 여행 코스를 완성했어요!'}
          </h1>
          <p className="text-xs text-brand-lime">
            가족 구성원의 취향을 분석해 오늘 가장 잘 맞는 코스를 추천했어요.
          </p>
        </div>
      </div>

      <div className="relative -mt-6 min-h-0 flex-1 overflow-y-auto rounded-t-card bg-white">
        <div className="flex flex-col gap-5 px-5 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-5">
          <div className="flex items-center justify-between px-2">
            <div className="flex min-w-0 items-center gap-1.5">
              <h2 className="truncate text-lg font-bold text-ink">{courseName}</h2>
              <Pencil aria-hidden="true" size={16} className="shrink-0 text-gray-400" />
            </div>

            {/* 재생성 API 미구현 — UI만 노출하고 비활성 처리한다 */}
            <button
              type="button"
              disabled
              aria-label="코스 다시 생성하기"
              className="flex h-9 shrink-0 cursor-not-allowed items-center justify-center rounded-full text-gray-300"
            >
              <RefreshCw aria-hidden="true" size={20} />
            </button>
          </div>

          {!hasValidParams || candidatesQuery.isError ? (
            <div className="flex flex-col items-center gap-3 px-4 py-10 text-center">
              <p className="text-base font-semibold text-ink">추천 결과를 불러올 수 없어요</p>
              <p className="text-caption text-gray-400">잠시 후 다시 시도해주세요.</p>
              <div className="mt-1 flex gap-2">
                <button
                  type="button"
                  onClick={() => navigate(ROUTE_PATHS.courseCreate, { replace: true })}
                  className="rounded-full border border-gray-300 px-5 py-2.5 text-sm font-semibold text-ink"
                >
                  코스 다시 만들기
                </button>
                {hasValidParams && (
                  <button
                    type="button"
                    onClick={() => candidatesQuery.refetch()}
                    className="rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white"
                  >
                    다시 시도
                  </button>
                )}
              </div>
            </div>
          ) : candidatesQuery.isLoading ? (
            <p className="py-10 text-center text-caption text-gray-400">
              추천 코스를 불러오는 중...
            </p>
          ) : candidates.length === 0 ? (
            <div className="flex flex-col items-center gap-3 px-4 py-10 text-center">
              <p className="text-base font-semibold text-ink">추천 가능한 코스를 찾지 못했어요</p>
              <p className="text-caption text-gray-400">
                여행 조건을 조금 바꿔서 다시 시도해보세요.
              </p>
              <button
                type="button"
                onClick={() => navigate(ROUTE_PATHS.courseCreate, { replace: true })}
                className="mt-1 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white"
              >
                코스 정보 다시 입력하기
              </button>
            </div>
          ) : (
            <>
              {selectMutation.isError && (
                <p className="text-center text-sm text-red-500">
                  코스 확정에 실패했습니다. 다시 시도해주세요.
                </p>
              )}

              {candidates.map((candidate, index) => (
                <RecommendedCourseCard
                  key={candidate.candidateId}
                  rank={index + 1}
                  candidate={{
                    candidateId: candidate.candidateId,
                    title: candidate.title,
                    summary: candidate.summary,
                    matchScore: candidate.matchScore,
                    tags: candidate.tags ?? [],
                    thumbnailImageUrl: candidate.thumbnailImageUrl,
                  }}
                  courseId={courseId ?? ''}
                  generationId={generationId ?? ''}
                  onSelect={handleSelect}
                  isSelecting={
                    selectMutation.isPending && selectMutation.variables === candidate.candidateId
                  }
                  disabled={selectMutation.isPending}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default CourseRecommendationsPage
