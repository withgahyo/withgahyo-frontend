import { create } from 'zustand'

function toggleId(ids: string[], id: string) {
  return ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id]
}

function toggleSingle(current: string | null, id: string) {
  return current === id ? null : id
}

interface OnboardingState {
  durationId: string | null
  tourismPreferenceIds: string[]
  foodPreferenceIds: string[]
  walkingTimeId: string | null
  restNeedId: string | null
  stairsToleranceId: string | null
  facilityIds: string[]
  mealCautionId: string | null
  burdensomeFoodIds: string[]

  setDuration: (id: string) => void
  toggleTourismPreference: (id: string) => void
  toggleFoodPreference: (id: string) => void
  setWalkingTime: (id: string) => void
  setRestNeed: (id: string) => void
  setStairsTolerance: (id: string) => void
  toggleFacility: (id: string) => void
  setMealCaution: (id: string) => void
  toggleBurdensomeFood: (id: string) => void
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  durationId: null,
  tourismPreferenceIds: [],
  foodPreferenceIds: [],
  walkingTimeId: null,
  restNeedId: null,
  stairsToleranceId: null,
  facilityIds: [],
  mealCautionId: null,
  burdensomeFoodIds: [],

  setDuration: (id) => set({ durationId: id }),
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
}))
