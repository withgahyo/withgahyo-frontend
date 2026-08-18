import { useNavigate } from 'react-router-dom'
import PrimaryButton from '../../components/common/PrimaryButton'
import OnboardingHeading from '../../features/onboarding/components/OnboardingHeading'
import OnboardingPreferenceGrid from '../../features/onboarding/components/OnboardingPreferenceGrid'
import OnboardingStepLayout from '../../features/onboarding/components/OnboardingStepLayout'
import { FOOD_PREFERENCE_OPTIONS } from '../../features/onboarding/constants'
import { ROUTE_PATHS } from '../../routes/routePaths'
import { useOnboardingStore } from '../../stores/onboardingStore'

function OnboardingFoodPage() {
  const navigate = useNavigate()
  const foodPreferenceIds = useOnboardingStore(
    (state) => state.foodPreferenceIds,
  )
  const toggleFoodPreference = useOnboardingStore(
    (state) => state.toggleFoodPreference,
  )

  const handleNext = () => {
    navigate(ROUTE_PATHS.onboardingCondition)
  }

  return (
    <OnboardingStepLayout
      currentStep={3}
      footer={
        <PrimaryButton
          disabled={foodPreferenceIds.length === 0}
          onClick={handleNext}
        >
          다음
        </PrimaryButton>
      }
    >
      <OnboardingHeading
        title={'당신의 식사\n취향을 알려주세요.'}
        description="마음에 드는 이미지를 선택해주세요"
      />

      <div className="mt-6">
        <OnboardingPreferenceGrid
          options={FOOD_PREFERENCE_OPTIONS}
          selectedIds={foodPreferenceIds}
          onToggle={toggleFoodPreference}
        />
      </div>
    </OnboardingStepLayout>
  )
}

export default OnboardingFoodPage
