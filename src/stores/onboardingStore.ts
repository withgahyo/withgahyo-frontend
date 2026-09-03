import { create } from 'zustand'

function toggleId<T>(ids: T[], id: T) {
  return ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id]
}

function toggleSingle(current: string | null, id: string) {
  return current === id ? null : id
}

interface OnboardingState {
  tourismPreferenceIds: number[]
  foodPreferenceIds: number[]
  walkingTimeId: string | null
  restNeedId: string | null
  stairsToleranceId: string | null
  facilityIds: string[]
  mealCautionId: string | null
  burdensomeFoodIds: string[]

  toggleTourismPreference: (id: number) => void
  toggleFoodPreference: (id: number) => void
  setWalkingTime: (id: string) => void
  setRestNeed: (id: string) => void
  setStairsTolerance: (id: string) => void
  toggleFacility: (id: string) => void
  setMealCaution: (id: string) => void
  toggleBurdensomeFood: (id: string) => void
  resetOnboarding: () => void
}

type OnboardingSelectionSnapshot = Pick<
  OnboardingState,
  | 'tourismPreferenceIds'
  | 'foodPreferenceIds'
  | 'walkingTimeId'
  | 'restNeedId'
  | 'stairsToleranceId'
  | 'facilityIds'
  | 'mealCautionId'
  | 'burdensomeFoodIds'
>

const INITIAL_SELECTION: OnboardingSelectionSnapshot = {
  tourismPreferenceIds: [],
  foodPreferenceIds: [],
  walkingTimeId: null,
  restNeedId: null,
  stairsToleranceId: null,
  facilityIds: [],
  mealCautionId: null,
  burdensomeFoodIds: [],
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  ...INITIAL_SELECTION,

  toggleTourismPreference: (id) =>
    set((state) => ({
      tourismPreferenceIds: toggleId(state.tourismPreferenceIds, id),
    })),
  toggleFoodPreference: (id) =>
    set((state) => ({
      foodPreferenceIds: toggleId(state.foodPreferenceIds, id),
    })),
  setWalkingTime: (id) =>
    set((state) => ({ walkingTimeId: toggleSingle(state.walkingTimeId, id) })),
  setRestNeed: (id) =>
    set((state) => ({ restNeedId: toggleSingle(state.restNeedId, id) })),
  setStairsTolerance: (id) =>
    set((state) => ({
      stairsToleranceId: toggleSingle(state.stairsToleranceId, id),
    })),
  toggleFacility: (id) =>
    set((state) => ({ facilityIds: toggleId(state.facilityIds, id) })),
  setMealCaution: (id) =>
    set((state) => ({ mealCautionId: toggleSingle(state.mealCautionId, id) })),
  toggleBurdensomeFood: (id) =>
    set((state) => ({
      burdensomeFoodIds: toggleId(state.burdensomeFoodIds, id),
    })),
  resetOnboarding: () => set({ ...INITIAL_SELECTION }),
}))
