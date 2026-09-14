import { REVIEW_HIGHLIGHT_OPTIONS } from '../formOptions'

interface ReviewHighlightFieldProps {
  values: string[]
  onToggle: (value: string) => void
  options?: string[]
  readOnly?: boolean
}

function ReviewHighlightField({
  values,
  onToggle,
  options,
  readOnly = false,
}: ReviewHighlightFieldProps) {
  const highlightOptions = options ?? REVIEW_HIGHLIGHT_OPTIONS.map((option) => option.label)

  return (
    <section className="rounded-lg border border-ink/15 bg-white px-4 py-4 shadow-[0_3px_8px_rgb(20_20_43/0.05)]">
      <h2 className="text-center text-sm font-extrabold text-ink/75">어떤 점이 가장 좋았나요?</h2>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {highlightOptions.map((option) => {
          const isSelected = values.includes(option)
          return (
            <button
              key={option}
              type="button"
              disabled={readOnly}
              onClick={() => onToggle(option)}
              className={`h-6 rounded-full border text-[10px] font-extrabold ${
                isSelected
                  ? 'border-brand-lime bg-brand-lime text-brand-blue'
                  : 'border-brand-blue bg-white text-brand-blue'
              } ${readOnly ? 'cursor-default' : ''}`}
            >
              {option}
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default ReviewHighlightField
