import { Accessibility, Armchair, Clock, Mountain, Utensils } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import PrimaryButton from '../../components/common/PrimaryButton'
import SelectChip from '../../components/common/SelectChip'
import OnboardingHeading from '../../features/onboarding/components/OnboardingHeading'
import OnboardingStepLayout from '../../features/onboarding/components/OnboardingStepLayout'
import {
  BURDENSOME_FOOD_OPTIONS,
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

function isChoiceSelected(selected: string | string[], id: string) {
  return Array.isArray(selected) ? selected.includes(id) : selected === id
}

interface ConditionChipRowProps {
  subtitle?: string
  options: ConditionChoice[]
  selected: string | string[]
  onSelect: (id: string) => void
}

function ConditionChipRow({
  subtitle,
  options,
  selected,
  onSelect,
}: ConditionChipRowProps) {
  return (
    <div>
      {subtitle && <p className="mb-2 text-xs text-ink/50">{subtitle}</p>}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <SelectChip
            key={option.id}
            label={option.label}
            selected={isChoiceSelected(selected, option.id)}
            onClick={() => onSelect(option.id)}
          />
        ))}
      </div>
    </div>
  )
}

function ConditionGroup({
  icon: Icon,
  title,
  subtitle,
  options,
  selected,
  onSelect,
}: ConditionGroupProps) {
  return (
    <div role="group" aria-label={title}>
      <div className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-ink">
        <Icon size={16} aria-hidden="true" />
        <span>{title}</span>
      </div>
      <ConditionChipRow
        subtitle={subtitle}
        options={options}
        selected={selected}
        onSelect={onSelect}
      />
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
    burdensomeFoodIds,
    setWalkingTime,
    setRestNeed,
    setStairsTolerance,
    toggleFacility,
    setMealCaution,
    toggleBurdensomeFood,
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
        <div role="group" aria-label="식사 주의사항">
          <div className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-ink">
            <Utensils size={16} aria-hidden="true" />
            <span>식사 주의사항</span>
          </div>
          <div className="flex flex-col gap-5">
            <ConditionChipRow
              subtitle="자극적인 음식"
              options={MEAL_CAUTION_OPTIONS}
              selected={mealCautionId ?? ''}
              onSelect={setMealCaution}
            />
            <ConditionChipRow
              subtitle="섭취가 부담될 수 있는 음식"
              options={BURDENSOME_FOOD_OPTIONS}
              selected={burdensomeFoodIds}
              onSelect={toggleBurdensomeFood}
            />
          </div>
        </div>
      </div>
    </OnboardingStepLayout>
  )
}

export default OnboardingConditionPage
