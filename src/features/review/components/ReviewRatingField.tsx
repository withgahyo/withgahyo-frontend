import { Star } from 'lucide-react'

interface ReviewRatingFieldProps {
  value: number
  onChange: (value: number) => void
}

function ReviewRatingField({ value, onChange }: ReviewRatingFieldProps) {
  return (
    <section className="rounded-lg border border-ink/15 bg-white px-4 py-4 text-center shadow-[0_3px_8px_rgb(20_20_43/0.05)]">
      <h2 className="text-sm font-extrabold text-ink/75">이번 여행에 얼마나 만족하시나요?</h2>
      <div className="mt-3 flex justify-center gap-2">
        {[1, 2, 3, 4, 5].map((rating) => {
          const isSelected = rating <= value
          return (
            <button
              key={rating}
              type="button"
              aria-label={`${rating}점`}
              onClick={() => onChange(rating)}
              className={isSelected ? 'text-brand-blue' : 'text-gray-300'}
            >
              <Star aria-hidden="true" size={32} fill="currentColor" strokeWidth={1.5} />
            </button>
          )
        })}
      </div>
      <p className="mt-1 text-xl font-black text-brand-blue">{value.toFixed(1)} / 5.0</p>
    </section>
  )
}

export default ReviewRatingField
