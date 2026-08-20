import { X } from 'lucide-react'

interface SelectedItemChipProps {
  label: string
  onRemove: () => void
}

function SelectedItemChip({ label, onRemove }: SelectedItemChipProps) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-lime py-2 pl-4 pr-2 text-sm font-semibold text-brand-blue">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`${label} 삭제`}
        className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-blue text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
      >
        <X aria-hidden="true" size={11} strokeWidth={3} />
      </button>
    </span>
  )
}

export default SelectedItemChip
