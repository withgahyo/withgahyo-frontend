import { ChevronRight } from 'lucide-react'

interface CommunitySectionTitleProps {
  title: string
  actionLabel?: string
  showAction?: boolean
}

function CommunitySectionTitle({
  title,
  actionLabel = '더보기',
  showAction = true,
}: CommunitySectionTitleProps) {
  return (
    <div className="flex items-center justify-between px-5">
      <h2 className="text-[17px] font-extrabold">{title}</h2>
      {showAction && (
        <button
          type="button"
          className="flex items-center gap-0.5 text-[10px] font-bold text-brand-lime"
        >
          {actionLabel}
          <ChevronRight aria-hidden="true" size={14} strokeWidth={3} />
        </button>
      )}
    </div>
  )
}

export default CommunitySectionTitle
