const TOTAL_STEPS = 4

interface OnboardingProgressBarProps {
  currentStep: 1 | 2 | 3 | 4
}

function OnboardingProgressBar({ currentStep }: OnboardingProgressBarProps) {
  return (
    <div
      className="flex gap-2"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={TOTAL_STEPS}
      aria-valuenow={currentStep}
      aria-label={`온보딩 ${TOTAL_STEPS}단계 중 ${currentStep}단계`}
    >
      {Array.from({ length: TOTAL_STEPS }, (_, index) => (
        <span
          key={index}
          className={`h-1.5 flex-1 rounded-full ${
            index < currentStep ? 'bg-brand-blue' : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  )
}

export default OnboardingProgressBar
