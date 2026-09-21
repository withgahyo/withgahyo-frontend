import { Accessibility, Armchair, ArrowLeft, Clock, Mountain, Utensils } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PrimaryButton from '../../components/common/PrimaryButton'
import SelectChip from '../../components/common/SelectChip'
import OnboardingHeading from '../../features/onboarding/components/OnboardingHeading'
import OnboardingPreferenceSection from '../../features/onboarding/components/OnboardingPreferenceSection'
import OnboardingProgressBar from '../../features/onboarding/components/OnboardingProgressBar'
import {
  BURDENSOME_FOOD_OPTIONS,
  FACILITY_OPTIONS,
  MEAL_CAUTION_OPTIONS,
  REST_NEED_OPTIONS,
  STAIRS_TOLERANCE_OPTIONS,
  WALKING_TIME_OPTIONS,
  type ConditionChoice,
} from '../../features/onboarding/constants'
import {
  useFoodPreferenceOptions,
  useOnboarding,
  useTourismPreferenceOptions,
  useUpdateOnboardingMutation,
} from '../../features/onboarding/hooks/useOnboardingQueries'
import {
  getFoodPreferenceImage,
  getTourismPreferenceImage,
} from '../../features/onboarding/utils/preferenceImages'
import { ROUTE_PATHS } from '../../routes/routePaths'

type Step = 1 | 2 | 3

interface ConditionGroupProps {
  icon: LucideIcon
  title: string
  subtitle?: string
  options: ConditionChoice[]
  selected: string | string[]
  onSelect: (id: string) => void
}

function toggleSelectedId<T>(ids: T[], id: T) {
  return ids.includes(id) ? ids.filter((selectedId) => selectedId !== id) : [...ids, id]
}

function toggleSingle(current: string | null, id: string) {
  return current === id ? null : id
}

function isChoiceSelected(selected: string | string[], id: string) {
  return Array.isArray(selected) ? selected.includes(id) : selected === id
}

function ConditionChipRow({
  subtitle,
  options,
  selected,
  onSelect,
}: Omit<ConditionGroupProps, 'icon' | 'title'>) {
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

const EMPTY_IDS: number[] = []

function TravelPreferenceEditPage() {
  const navigate = useNavigate()
  const onboardingQuery = useOnboarding()
  const tourismOptionsQuery = useTourismPreferenceOptions()
  const foodOptionsQuery = useFoodPreferenceOptions()
  const updateOnboardingMutation = useUpdateOnboardingMutation()
  const [step, setStep] = useState<Step>(1)
  const [draftTourismPreferenceIds, setDraftTourismPreferenceIds] = useState<number[] | null>(null)
  const [draftFoodPreferenceIds, setDraftFoodPreferenceIds] = useState<number[] | null>(null)
  const [draftWalkingTimeId, setDraftWalkingTimeId] = useState<string | null | undefined>()
  const [draftRestNeedId, setDraftRestNeedId] = useState<string | null | undefined>()
  const [draftStairsToleranceId, setDraftStairsToleranceId] = useState<string | null | undefined>()
  const [draftMealCautionId, setDraftMealCautionId] = useState<string | null | undefined>()
  const [facilityIds, setFacilityIds] = useState<string[]>([])
  const [burdensomeFoodIds, setBurdensomeFoodIds] = useState<string[]>([])

  const tourismPreferenceIds = useMemo(
    () => draftTourismPreferenceIds ?? onboardingQuery.data?.tourismPreferenceIds ?? EMPTY_IDS,
    [draftTourismPreferenceIds, onboardingQuery.data?.tourismPreferenceIds],
  )
  const foodPreferenceIds = useMemo(
    () => draftFoodPreferenceIds ?? onboardingQuery.data?.foodPreferenceIds ?? EMPTY_IDS,
    [draftFoodPreferenceIds, onboardingQuery.data?.foodPreferenceIds],
  )
  const walkingTimeId =
    draftWalkingTimeId !== undefined
      ? draftWalkingTimeId
      : onboardingQuery.data?.walkingTolerance ?? null
  const restNeedId =
    draftRestNeedId !== undefined ? draftRestNeedId : onboardingQuery.data?.restPreference ?? null
  const stairsToleranceId =
    draftStairsToleranceId !== undefined
      ? draftStairsToleranceId
      : onboardingQuery.data?.stairsPreference ?? null
  const mealCautionId =
    draftMealCautionId !== undefined ? draftMealCautionId : onboardingQuery.data?.spicyPreference ?? null

  const hasTourismSelection = tourismPreferenceIds.length > 0
  const hasFoodSelection = foodPreferenceIds.length > 0
  const canSubmit =
    Boolean(onboardingQuery.data) &&
    hasTourismSelection &&
    hasFoodSelection &&
    !updateOnboardingMutation.isPending

  const handleBack = () => {
    if (step === 1) {
      navigate(ROUTE_PATHS.mypage)
      return
    }

    setStep((currentStep) => (currentStep === 3 ? 2 : 1))
  }

  const handleSubmit = () => {
    const onboarding = onboardingQuery.data
    if (!onboarding || !canSubmit) return

    updateOnboardingMutation.mutate(
      {
        walkingTolerance: walkingTimeId,
        restPreference: restNeedId,
        stairsPreference: stairsToleranceId,
        slopePreference: onboarding.slopePreference,
        spicyPreference: mealCautionId,
        tourismPreferenceIds,
        foodPreferenceIds,
      },
      {
        onSuccess: () => {
          navigate(ROUTE_PATHS.mypage, { replace: true })
        },
      },
    )
  }

  const footer =
    step === 1 ? (
      <PrimaryButton disabled={!hasTourismSelection} onClick={() => setStep(2)}>
        다음
      </PrimaryButton>
    ) : step === 2 ? (
      <PrimaryButton disabled={!hasFoodSelection} onClick={() => setStep(3)}>
        다음
      </PrimaryButton>
    ) : (
      <div>
        <PrimaryButton onClick={handleSubmit} disabled={!canSubmit}>
          {updateOnboardingMutation.isPending ? '저장 중...' : '저장하기'}
        </PrimaryButton>
        {updateOnboardingMutation.isError ? (
          <p className="mt-3 text-center text-xs text-red-600">
            저장에 실패했어요. 잠시 후 다시 시도해주세요.
          </p>
        ) : (
          <p className="mt-3 text-center text-xs text-ink/50">
            특별한 주의사항이 없으면 저장해 주세요.
          </p>
        )}
      </div>
    )

  return (
    <main className="flex min-h-app flex-col bg-app-backdrop">
      <header className="flex items-center gap-3 px-5 py-4">
        <button
          type="button"
          onClick={handleBack}
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors active:bg-ink/5"
          aria-label="뒤로 가기"
        >
          <ArrowLeft size={22} aria-hidden="true" />
        </button>
        <h1 className="text-lg font-extrabold text-ink">나의 여행 취향 관리</h1>
      </header>

      <div className="px-6 pt-4">
        <OnboardingProgressBar currentStep={step} />
      </div>

      <div className="flex-1 px-6 pb-8">
        {onboardingQuery.isLoading ? (
          <div className="mt-8 space-y-6" aria-hidden="true">
            <div className="h-16 w-60 animate-pulse rounded-2xl bg-gray-200" />
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 9 }, (_, index) => (
                <div
                  key={index}
                  className="aspect-square w-full animate-pulse rounded-2xl bg-gray-200"
                />
              ))}
            </div>
          </div>
        ) : onboardingQuery.isError ? (
          <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
            <p className="text-sm font-semibold text-ink/60">
              저장된 여행 취향을 불러오지 못했어요.
            </p>
            <button
              type="button"
              onClick={() => onboardingQuery.refetch()}
              disabled={onboardingQuery.isFetching}
              className="rounded-full bg-brand-blue px-5 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
            >
              {onboardingQuery.isFetching ? '불러오는 중...' : '다시 시도'}
            </button>
          </div>
        ) : step === 1 ? (
          <>
            <OnboardingHeading
              title={'당신의 관광\n취향을 알려주세요.'}
              description="마음에 드는 이미지를 선택해주세요"
            />

            <div className="mt-6">
              <OnboardingPreferenceSection
                isLoading={tourismOptionsQuery.isLoading}
                isError={tourismOptionsQuery.isError}
                isRetrying={tourismOptionsQuery.isFetching}
                options={tourismOptionsQuery.data}
                selectedIds={tourismPreferenceIds}
                onToggle={(id) =>
                  setDraftTourismPreferenceIds((ids) =>
                    toggleSelectedId(ids ?? tourismPreferenceIds, id),
                  )
                }
                onRetry={() => {
                  void tourismOptionsQuery.refetch()
                }}
                getImage={getTourismPreferenceImage}
              />
            </div>
          </>
        ) : step === 2 ? (
          <>
            <OnboardingHeading
              title={'당신의 식사\n취향을 알려주세요.'}
              description="마음에 드는 이미지를 선택해주세요"
            />

            <div className="mt-6">
              <OnboardingPreferenceSection
                isLoading={foodOptionsQuery.isLoading}
                isError={foodOptionsQuery.isError}
                isRetrying={foodOptionsQuery.isFetching}
                options={foodOptionsQuery.data}
                selectedIds={foodPreferenceIds}
                onToggle={(id) =>
                  setDraftFoodPreferenceIds((ids) => toggleSelectedId(ids ?? foodPreferenceIds, id))
                }
                onRetry={() => {
                  void foodOptionsQuery.refetch()
                }}
                getImage={getFoodPreferenceImage}
              />
            </div>
          </>
        ) : (
          <>
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
                onSelect={(id) =>
                  setDraftWalkingTimeId((current) =>
                    toggleSingle(current !== undefined ? current : walkingTimeId, id),
                  )
                }
              />
              <ConditionGroup
                icon={Armchair}
                title="휴식 필요도"
                options={REST_NEED_OPTIONS}
                selected={restNeedId ?? ''}
                onSelect={(id) =>
                  setDraftRestNeedId((current) =>
                    toggleSingle(current !== undefined ? current : restNeedId, id),
                  )
                }
              />
              <ConditionGroup
                icon={Mountain}
                title="계단·경사 부담"
                options={STAIRS_TOLERANCE_OPTIONS}
                selected={stairsToleranceId ?? ''}
                onSelect={(id) =>
                  setDraftStairsToleranceId((current) =>
                    toggleSingle(current !== undefined ? current : stairsToleranceId, id),
                  )
                }
              />
              <ConditionGroup
                icon={Accessibility}
                title="필요한 편의시설"
                options={FACILITY_OPTIONS}
                selected={facilityIds}
                onSelect={(id) => setFacilityIds((ids) => toggleSelectedId(ids, id))}
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
                    onSelect={(id) =>
                      setDraftMealCautionId((current) =>
                        toggleSingle(current !== undefined ? current : mealCautionId, id),
                      )
                    }
                  />
                  <ConditionChipRow
                    subtitle="섭취가 부담될 수 있는 음식"
                    options={BURDENSOME_FOOD_OPTIONS}
                    selected={burdensomeFoodIds}
                    onSelect={(id) => setBurdensomeFoodIds((ids) => toggleSelectedId(ids, id))}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="sticky bottom-0 bg-app-backdrop px-6 pb-6 pt-3">{footer}</div>
    </main>
  )
}

export default TravelPreferenceEditPage
