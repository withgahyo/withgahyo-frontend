import { Check } from 'lucide-react'

interface SelectChipProps {
  label: string
  selected: boolean
  onClick: () => void
  className?: string
}

function SelectChip({ label, selected, onClick, className = '' }: SelectChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`inline-flex items-center gap-1 rounded-2xl border-2 px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${
        selected
          ? 'border-brand-blue bg-brand-blue/10 text-brand-blue'
          : 'border-transparent bg-gray-100 text-ink'
      } ${className}`}
    >
      {selected && <Check size={14} strokeWidth={3} aria-hidden="true" />}
      {label}
    </button>
  )
}

export default SelectChip
