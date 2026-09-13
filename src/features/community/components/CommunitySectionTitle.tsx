import { ChevronRight } from 'lucide-react'

interface CommunitySectionTitleProps {
  title: string
}

function CommunitySectionTitle({ title }: CommunitySectionTitleProps) {
  return (
    <div className="flex items-center justify-between px-5">
      <h2 className="text-lg font-extrabold tracking-[-0.01em]">{title}</h2>
      <button
        type="button"
        className="flex items-center gap-0.5 text-[10px] font-bold text-brand-lime"
      >
        더보기
        <ChevronRight aria-hidden="true" size={14} strokeWidth={3} />
      </button>
    </div>
  )
}

export default CommunitySectionTitle
