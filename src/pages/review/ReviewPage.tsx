import { ChevronLeft } from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PrimaryButton from '../../components/common/PrimaryButton'
import vectorDecoration from '../../assets/splash/Vector.svg'
import ReviewCourseSummaryCard from '../../features/review/components/ReviewCourseSummaryCard'
import ReviewHighlightField from '../../features/review/components/ReviewHighlightField'
import ReviewMemoField from '../../features/review/components/ReviewMemoField'
import ReviewRatingField from '../../features/review/components/ReviewRatingField'
import ReviewRecommendationSlider from '../../features/review/components/ReviewRecommendationSlider'
import { REVIEW_RECOMMENDATION_RANGE } from '../../features/review/formOptions'
import { useCreateReview, useReviewForm } from '../../features/review/hooks/useReviewQueries'
import { ROUTE_PATHS } from '../../routes/routePaths'

function ReviewPage() {
  const navigate = useNavigate()
  const { courseId = '0' } = useParams()
  const numericCourseId = Number(courseId)
  const validCourseId =
    Number.isFinite(numericCourseId) && numericCourseId > 0 ? numericCourseId : null
  const reviewFormQuery = useReviewForm(validCourseId)
  const createReviewMutation = useCreateReview(validCourseId)
  const [rating, setRating] = useState(4)
  const [highlights, setHighlights] = useState<string[]>([])
  const [memo, setMemo] = useState('')
  const [recommendationScore, setRecommendationScore] = useState<number>(
    REVIEW_RECOMMENDATION_RANGE.defaultValue,
  )
  const reviewForm = reviewFormQuery.data

  useEffect(() => {
    if (!reviewForm) return

    setRating(reviewForm.ratingMax - 1)
    setRecommendationScore(
      Math.min(
        reviewForm.recommendationMax,
        Math.max(reviewForm.recommendationMin, REVIEW_RECOMMENDATION_RANGE.defaultValue),
      ),
    )
    setHighlights(reviewForm.highlightOptions.slice(0, 3))
  }, [reviewForm])

  const handleToggleHighlight = (value: string) => {
    setHighlights((currentHighlights) =>
      currentHighlights.includes(value)
        ? currentHighlights.filter((highlight) => highlight !== value)
        : [...currentHighlights, value],
    )
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (validCourseId == null) return

    createReviewMutation.mutate(
      {
        rating,
        comment: memo.trim() || null,
        recommendationScore,
        highlights,
      },
      {
        onSuccess: () => {
          navigate(ROUTE_PATHS.communityWithTab('mine'), { replace: true })
        },
      },
    )
  }

  return (
    <main className="relative -mt-[env(safe-area-inset-top)] min-h-app overflow-hidden bg-brand-blue pt-[env(safe-area-inset-top)]">
      <img
        src={vectorDecoration}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 -top-24 w-[150%] max-w-none opacity-45"
      />

      <header className="relative z-1 flex h-18 items-center px-5">
        <button
          type="button"
          onClick={() => navigate(ROUTE_PATHS.communityWithTab('mine'))}
          className="flex items-center gap-1 text-brand-lime"
          aria-label="뒤로가기"
        >
          <ChevronLeft size={27} strokeWidth={2.6} />
          <span className="text-lg font-extrabold">여행 후기 작성하기</span>
        </button>
      </header>

      <form
        onSubmit={handleSubmit}
        className="relative z-1 mx-2 rounded-t-card bg-white px-5 pb-7 pt-6"
      >
        {reviewFormQuery.isLoading && (
          <div className="rounded-lg border border-ink/15 bg-white px-4 py-10 text-center text-sm font-extrabold text-ink/55">
            후기 작성 정보를 불러오고 있어요.
          </div>
        )}

        {(reviewFormQuery.isError || validCourseId == null) && (
          <div className="rounded-lg border border-ink/15 bg-white px-4 py-10 text-center">
            <p className="text-sm font-extrabold text-ink/75">
              후기 작성 정보를 불러오지 못했어요.
            </p>
            <p className="mt-2 text-xs font-semibold text-ink/45">잠시 후 다시 시도해주세요.</p>
          </div>
        )}

        {reviewForm && (
          <div className="space-y-2.5">
            <ReviewCourseSummaryCard course={reviewForm.course} />
            <ReviewRatingField value={rating} onChange={setRating} />
            <ReviewHighlightField
              values={highlights}
              onToggle={handleToggleHighlight}
              options={reviewForm.highlightOptions}
            />
            <ReviewMemoField value={memo} onChange={setMemo} />
            <ReviewRecommendationSlider
              value={recommendationScore}
              onChange={setRecommendationScore}
              min={reviewForm.recommendationMin}
              max={reviewForm.recommendationMax}
            />
          </div>
        )}

        {createReviewMutation.isError && (
          <p className="mt-4 text-center text-xs font-bold text-red-500">
            후기를 저장하지 못했어요. 잠시 후 다시 시도해주세요.
          </p>
        )}

        <PrimaryButton
          type="submit"
          variant="lime"
          disabled={!reviewForm || createReviewMutation.isPending}
          className="mt-6 font-extrabold"
        >
          {createReviewMutation.isPending ? '저장 중...' : '평가 완료하기'}
        </PrimaryButton>
      </form>
    </main>
  )
}

export default ReviewPage
