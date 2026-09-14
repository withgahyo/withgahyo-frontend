import { REVIEW_RECOMMENDATION_RANGE } from '../formOptions'

interface ReviewRecommendationSliderProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  readOnly?: boolean
}

function ReviewRecommendationSlider({
  value,
  onChange,
  min = REVIEW_RECOMMENDATION_RANGE.min,
  max = REVIEW_RECOMMENDATION_RANGE.max,
  readOnly = false,
}: ReviewRecommendationSliderProps) {
  return (
    <section className="rounded-lg border border-ink/15 bg-white px-4 py-4 shadow-[0_3px_8px_rgb(20_20_43/0.05)]">
      <h2 className="text-center text-sm font-extrabold text-ink/75">
        이 여행 코스를 친구에게 추천할 의향이 있나요?
      </h2>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        disabled={readOnly}
        onChange={(event) => onChange(Number(event.target.value))}
        className={`mt-5 h-2 w-full accent-brand-blue ${readOnly ? 'cursor-default' : ''}`}
      />
      <div className="mt-1 flex justify-between text-[9px] font-extrabold text-ink/65">
        <span>전혀 없음</span>
        <span>매우 추천함</span>
      </div>
    </section>
  )
}

export default ReviewRecommendationSlider
