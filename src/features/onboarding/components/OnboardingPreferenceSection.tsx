import type { PreferenceOption } from '../api/types'
import OnboardingPreferenceGrid from './OnboardingPreferenceGrid'

interface OnboardingPreferenceSectionProps {
  isLoading: boolean
  isError: boolean
  isRetrying: boolean
  options: PreferenceOption[] | undefined
  selectedIds: number[]
  onToggle: (id: number) => void
  onRetry: () => void
}

function OnboardingPreferenceSection({
  isLoading,
  isError,
  isRetrying,
  options,
  selectedIds,
  onToggle,
  onRetry,
}: OnboardingPreferenceSectionProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-3" aria-hidden="true">
        {Array.from({ length: 9 }, (_, index) => (
          <div
            key={index}
            className="aspect-square w-full animate-pulse rounded-2xl bg-gray-200"
          />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl bg-gray-100 px-6 py-12 text-center">
        <p className="text-sm text-ink/60">선택지를 불러오지 못했어요.</p>
        <button
          type="button"
          onClick={onRetry}
          disabled={isRetrying}
          className="rounded-full bg-brand-blue px-4 py-2 text-sm font-semibold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
        >
          {isRetrying ? '불러오는 중…' : '다시 시도'}
        </button>
      </div>
    )
  }

  if (!options || options.length === 0) {
    return (
      <div className="rounded-2xl bg-gray-100 px-6 py-12 text-center text-sm text-ink/60">
        아직 등록된 선택지가 없어요.
      </div>
    )
  }

  return (
    <OnboardingPreferenceGrid
      options={options}
      selectedIds={selectedIds}
      onToggle={onToggle}
    />
  )
}

export default OnboardingPreferenceSection
