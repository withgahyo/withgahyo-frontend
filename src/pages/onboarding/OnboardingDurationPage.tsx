import { Calendar, Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import PrimaryButton from '../../components/common/PrimaryButton'
import OnboardingHeading from '../../features/onboarding/components/OnboardingHeading'
import OnboardingStepLayout from '../../features/onboarding/components/OnboardingStepLayout'
import { DURATION_OPTIONS } from '../../features/onboarding/constants'
import { ROUTE_PATHS } from '../../routes/routePaths'
import { useOnboardingStore } from '../../stores/onboardingStore'

function OnboardingDurationPage() {
  const navigate = useNavigate()
  const durationId = useOnboardingStore((state) => state.durationId)
  const setDuration = useOnboardingStore((state) => state.setDuration)

  const handleNext = () => {
    navigate(ROUTE_PATHS.onboardingTourism)
  }

  return (
    <OnboardingStepLayout
      currentStep={1}
      footer={
        <PrimaryButton disabled={!durationId} onClick={handleNext}>
          다음
        </PrimaryButton>
      }
    >
      <OnboardingHeading
        title={'여행 기간을\n선택해주세요.'}
        description="부모님과 함께할 여행 일정을 정해볼까요?"
      />

      <div className="mt-6 flex flex-col gap-3">
        {DURATION_OPTIONS.map((option) => {
          const isSelected = durationId === option.id
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setDuration(option.id)}
              className={`relative flex w-full items-center gap-4 rounded-card border-2 p-5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${
                isSelected
                  ? 'border-brand-blue bg-brand-lime'
                  : 'border-transparent bg-gray-100'
              }`}
            >
              {/* TODO: 실제 브랜드 아이콘 asset 준비되면 Calendar 아이콘 교체 */}
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/70 text-brand-blue">
                <Calendar size={22} aria-hidden="true" />
              </span>
              <span className="flex-1">
                <span className="block text-base font-bold text-ink">
                  {option.title}
                </span>
                <span className="mt-1 block text-sm text-ink/60">
                  {option.description}
                </span>
              </span>
              {isSelected && (
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-blue text-white">
                  <Check size={14} strokeWidth={3} aria-hidden="true" />
                </span>
              )}
            </button>
          )
        })}
      </div>
    </OnboardingStepLayout>
  )
}

export default OnboardingDurationPage
