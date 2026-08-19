import { Check } from 'lucide-react'

interface ImageCardProps {
  label: string
  imageSrc: string | null
  selected: boolean
  onClick: () => void
}

function ImageCard({ label, imageSrc, selected, onClick }: ImageCardProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={label}
      onClick={onClick}
      className={`relative aspect-square w-full overflow-hidden rounded-2xl border-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${
        selected ? 'border-brand-blue bg-brand-blue/10' : 'border-transparent bg-gray-200'
      }`}
    >
      {imageSrc && (
        <img src={imageSrc} alt="" className="h-full w-full object-cover" />
      )}
      {selected && (
        <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-blue text-white">
          <Check size={12} strokeWidth={3} aria-hidden="true" />
        </span>
      )}
    </button>
  )
}

export default ImageCard
