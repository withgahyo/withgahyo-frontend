import ImageCard from '../../../components/common/ImageCard'
import type { PreferenceImageOption } from '../constants'

interface OnboardingPreferenceGridProps {
  options: PreferenceImageOption[]
  selectedIds: string[]
  onToggle: (id: string) => void
}

function OnboardingPreferenceGrid({
  options,
  selectedIds,
  onToggle,
}: OnboardingPreferenceGridProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {options.map((option) => (
        <ImageCard
          key={option.id}
          label={option.label}
          imageSrc={option.imageSrc}
          selected={selectedIds.includes(option.id)}
          onClick={() => onToggle(option.id)}
        />
      ))}
    </div>
  )
}

export default OnboardingPreferenceGrid
