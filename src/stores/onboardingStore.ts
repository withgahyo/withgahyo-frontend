import { create } from 'zustand'

function toggleId(ids: string[], id: string) {
  return ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id]
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

  setDuration: (id: string) => void
  toggleTourismPreference: (id: string) => void
  toggleFoodPreference: (id: string) => void
  setWalkingTime: (id: string) => void
  setRestNeed: (id: string) => void
  setStairsTolerance: (id: string) => void
  toggleFacility: (id: string) => void
  setMealCaution: (id: string) => void
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

  setDuration: (id) => set({ durationId: id }),
  toggleTourismPreference: (id) =>
    set((state) => ({
      tourismPreferenceIds: toggleId(state.tourismPreferenceIds, id),
    })),
  toggleFoodPreference: (id) =>
    set((state) => ({
      foodPreferenceIds: toggleId(state.foodPreferenceIds, id),
    })),
  setWalkingTime: (id) => set({ walkingTimeId: id }),
  setRestNeed: (id) => set({ restNeedId: id }),
  setStairsTolerance: (id) => set({ stairsToleranceId: id }),
  toggleFacility: (id) =>
    set((state) => ({ facilityIds: toggleId(state.facilityIds, id) })),
  setMealCaution: (id) => set({ mealCautionId: id }),
}))
