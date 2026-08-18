import { useNavigate } from 'react-router-dom'
import PrimaryButton from '../../components/common/PrimaryButton'
import OnboardingHeading from '../../features/onboarding/components/OnboardingHeading'
import OnboardingPreferenceGrid from '../../features/onboarding/components/OnboardingPreferenceGrid'
import OnboardingStepLayout from '../../features/onboarding/components/OnboardingStepLayout'
import { TOURISM_PREFERENCE_OPTIONS } from '../../features/onboarding/constants'
import { ROUTE_PATHS } from '../../routes/routePaths'
import { useOnboardingStore } from '../../stores/onboardingStore'

function OnboardingTourismPage() {
  const navigate = useNavigate()
  const tourismPreferenceIds = useOnboardingStore(
    (state) => state.tourismPreferenceIds,
  )
  const toggleTourismPreference = useOnboardingStore(
    (state) => state.toggleTourismPreference,
  )

  const handleNext = () => {
    navigate(ROUTE_PATHS.onboardingFood)
  }

  return (
    <OnboardingStepLayout
      currentStep={2}
      footer={
        <PrimaryButton
          disabled={tourismPreferenceIds.length === 0}
          onClick={handleNext}
        >
          다음
        </PrimaryButton>
      }
    >
      <OnboardingHeading
        title={'당신의 관광\n취향을 알려주세요.'}
        description="마음에 드는 이미지를 선택해주세요"
      />

      <div className="mt-6">
        <OnboardingPreferenceGrid
          options={TOURISM_PREFERENCE_OPTIONS}
          selectedIds={tourismPreferenceIds}
          onToggle={toggleTourismPreference}
        />
      </div>
    </OnboardingStepLayout>
  )
}

export default OnboardingTourismPage
