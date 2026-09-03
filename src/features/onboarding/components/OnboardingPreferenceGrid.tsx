import ImageCard from '../../../components/common/ImageCard'
import type { PreferenceOption } from '../api/types'

interface OnboardingPreferenceGridProps {
  options: PreferenceOption[]
  selectedIds: number[]
  onToggle: (id: number) => void
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
          label={option.name}
          imageSrc={null}
          selected={selectedIds.includes(option.id)}
          onClick={() => onToggle(option.id)}
        />
      ))}
    </div>
  )
}

export default OnboardingPreferenceGrid
