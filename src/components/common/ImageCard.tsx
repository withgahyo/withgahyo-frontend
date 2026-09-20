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
        <>
          <img
            src={imageSrc}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span
            className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-black/70"
            aria-hidden="true"
          />
        </>
      )}

      <span
        className={`absolute inset-x-0 bottom-0 px-2 pb-2 text-center text-xs font-semibold leading-tight ${
          imageSrc ? 'text-white' : 'text-ink/70'
        }`}
      >
        {label}
      </span>

      {selected && (
        <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-blue text-white">
          <Check size={12} strokeWidth={3} aria-hidden="true" />
        </span>
      )}
    </button>
  )
}

export default ImageCard
