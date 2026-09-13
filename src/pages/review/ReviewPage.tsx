import { ChevronLeft } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PrimaryButton from '../../components/common/PrimaryButton'
import vectorDecoration from '../../assets/splash/Vector.svg'
import ReviewCourseSummaryCard from '../../features/review/components/ReviewCourseSummaryCard'
import ReviewHighlightField from '../../features/review/components/ReviewHighlightField'
import ReviewMemoField from '../../features/review/components/ReviewMemoField'
import ReviewRatingField from '../../features/review/components/ReviewRatingField'
import ReviewRecommendationSlider from '../../features/review/components/ReviewRecommendationSlider'
import { REVIEW_RECOMMENDATION_RANGE } from '../../features/review/formOptions'

function ReviewPage() {
  const navigate = useNavigate()
  const { courseId = '0' } = useParams()
  const [rating, setRating] = useState(4)
  const [highlights, setHighlights] = useState<string[]>([
    'COURSE',
    'FOOD',
    'RECOMMENDABLE',
  ])
  const [memo, setMemo] = useState('')
  const [recommendationScore, setRecommendationScore] = useState<number>(
    REVIEW_RECOMMENDATION_RANGE.defaultValue,
  )

  const handleToggleHighlight = (value: string) => {
    setHighlights((currentHighlights) =>
      currentHighlights.includes(value)
        ? currentHighlights.filter((highlight) => highlight !== value)
        : [...currentHighlights, value],
    )
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate(-1)
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
          onClick={() => navigate(-1)}
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
        <div className="space-y-2.5">
          <ReviewCourseSummaryCard courseId={courseId} />
          <ReviewRatingField value={rating} onChange={setRating} />
          <ReviewHighlightField values={highlights} onToggle={handleToggleHighlight} />
          <ReviewMemoField value={memo} onChange={setMemo} />
          <ReviewRecommendationSlider
            value={recommendationScore}
            onChange={setRecommendationScore}
          />
        </div>

        <PrimaryButton type="submit" variant="lime" className="mt-6 font-extrabold">
          평가 완료하기
        </PrimaryButton>
      </form>
    </main>
  )
}

export default ReviewPage
