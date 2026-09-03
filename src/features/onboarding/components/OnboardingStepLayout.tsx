import type { ReactNode } from 'react'
import OnboardingProgressBar from './OnboardingProgressBar'

interface OnboardingStepLayoutProps {
  currentStep: 1 | 2 | 3
  children: ReactNode
  footer: ReactNode
}

function OnboardingStepLayout({ currentStep, children, footer }: OnboardingStepLayoutProps) {
  return (
    <div className="flex min-h-app flex-col">
      <div className="px-6 pt-20">
        <OnboardingProgressBar currentStep={currentStep} />
      </div>

      <div className="flex-1 px-6 pb-8">{children}</div>

      <div className="sticky bottom-0 bg-app-backdrop px-6 pb-6 pt-3">{footer}</div>
    </div>
  )
}

export default OnboardingStepLayout
