import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PrimaryButton from '../../components/common/PrimaryButton'
import OnboardingHeading from '../../features/onboarding/components/OnboardingHeading'
import OnboardingPreferenceSection from '../../features/onboarding/components/OnboardingPreferenceSection'
import OnboardingStepLayout from '../../features/onboarding/components/OnboardingStepLayout'
import { useFoodPreferenceOptions } from '../../features/onboarding/hooks/useOnboardingQueries'
import { ROUTE_PATHS } from '../../routes/routePaths'
import { useOnboardingStore } from '../../stores/onboardingStore'

function OnboardingFoodPage() {
  const navigate = useNavigate()
  const { data: options, isLoading, isError, isFetching, refetch } =
    useFoodPreferenceOptions()
  const tourismPreferenceIds = useOnboardingStore(
    (state) => state.tourismPreferenceIds,
  )
  const foodPreferenceIds = useOnboardingStore((state) => state.foodPreferenceIds)
  const toggleFoodPreference = useOnboardingStore(
    (state) => state.toggleFoodPreference,
  )

  const hasTourismSelection = tourismPreferenceIds.length > 0

  useEffect(() => {
    if (!hasTourismSelection) {
      navigate(ROUTE_PATHS.onboardingTourism, { replace: true })
    }
  }, [hasTourismSelection, navigate])

  if (!hasTourismSelection) {
    return null
  }

  const handleNext = () => {
    navigate(ROUTE_PATHS.onboardingCondition)
  }

  return (
    <OnboardingStepLayout
      currentStep={2}
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
        <OnboardingPreferenceSection
          isLoading={isLoading}
          isError={isError}
          isRetrying={isFetching}
          options={options}
          selectedIds={foodPreferenceIds}
          onToggle={toggleFoodPreference}
          onRetry={() => {
            void refetch()
          }}
        />
      </div>
    </OnboardingStepLayout>
  )
}

export default OnboardingFoodPage
