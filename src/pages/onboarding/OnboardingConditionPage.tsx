import { Accessibility, Armchair, Clock, Mountain, Utensils } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import PrimaryButton from '../../components/common/PrimaryButton'
import SelectChip from '../../components/common/SelectChip'
import OnboardingHeading from '../../features/onboarding/components/OnboardingHeading'
import OnboardingStepLayout from '../../features/onboarding/components/OnboardingStepLayout'
import {
  FACILITY_OPTIONS,
  MEAL_CAUTION_OPTIONS,
  REST_NEED_OPTIONS,
  STAIRS_TOLERANCE_OPTIONS,
  WALKING_TIME_OPTIONS,
  type ConditionChoice,
} from '../../features/onboarding/constants'
import { ROUTE_PATHS } from '../../routes/routePaths'
import { useOnboardingStore } from '../../stores/onboardingStore'

interface ConditionGroupProps {
  icon: LucideIcon
  title: string
  subtitle?: string
  options: ConditionChoice[]
  selected: string | string[]
  onSelect: (id: string) => void
}

function ConditionGroup({
  icon: Icon,
  title,
  subtitle,
  options,
  selected,
  onSelect,
}: ConditionGroupProps) {
  const isSelected = (id: string) =>
    Array.isArray(selected) ? selected.includes(id) : selected === id

  return (
    <div role="group" aria-label={title}>
      <div className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-ink">
        <Icon size={16} aria-hidden="true" />
        <span>{title}</span>
      </div>
      {subtitle && <p className="-mt-1.5 mb-2 text-xs text-ink/50">{subtitle}</p>}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <SelectChip
            key={option.id}
            label={option.label}
            selected={isSelected(option.id)}
            onClick={() => onSelect(option.id)}
          />
        ))}
      </div>
    </div>
  )
}

function OnboardingConditionPage() {
  const navigate = useNavigate()
  const {
    walkingTimeId,
    restNeedId,
    stairsToleranceId,
    facilityIds,
    mealCautionId,
    setWalkingTime,
    setRestNeed,
    setStairsTolerance,
    toggleFacility,
    setMealCaution,
  } = useOnboardingStore((state) => state)

  const handleNext = () => {
    // TODO: API 명세 확정 후 온보딩 저장 API 호출 → 성공 시 /onboarding/complete로 이동하는 구조로 변경
    navigate(ROUTE_PATHS.onboardingComplete)
  }

  return (
    <OnboardingStepLayout
      currentStep={4}
      footer={
        <div>
          <PrimaryButton onClick={handleNext}>다음</PrimaryButton>
          <p className="mt-3 text-center text-xs text-ink/50">
            특별한 주의사항이 없으면, 다음으로 넘겨주세요.
          </p>
        </div>
      }
    >
      <OnboardingHeading
        title="당신의 컨디션을 알려주세요"
        description="맞춤 코스 추천에 활용됩니다"
      />

      <div className="mt-6 flex flex-col gap-6">
        <ConditionGroup
          icon={Clock}
          title="걷는 시간"
          options={WALKING_TIME_OPTIONS}
          selected={walkingTimeId ?? ''}
          onSelect={setWalkingTime}
        />
        <ConditionGroup
          icon={Armchair}
          title="휴식 필요도"
          options={REST_NEED_OPTIONS}
          selected={restNeedId ?? ''}
          onSelect={setRestNeed}
        />
        <ConditionGroup
          icon={Mountain}
          title="계단·경사 부담"
          options={STAIRS_TOLERANCE_OPTIONS}
          selected={stairsToleranceId ?? ''}
          onSelect={setStairsTolerance}
        />
        <ConditionGroup
          icon={Accessibility}
          title="필요한 편의시설"
          options={FACILITY_OPTIONS}
          selected={facilityIds}
          onSelect={toggleFacility}
        />
        <ConditionGroup
          icon={Utensils}
          title="식사 주의사항"
          subtitle="자극적인 음식"
          options={MEAL_CAUTION_OPTIONS}
          selected={mealCautionId ?? ''}
          onSelect={setMealCaution}
        />
      </div>
    </OnboardingStepLayout>
  )
}

export default OnboardingConditionPage
