export interface PreferenceOption {
  id: number
  code: string
  name: string
}

export interface OnboardingSaveRequest {
  walkingTolerance: string | null
  restPreference: string | null
  stairsPreference: string | null
  slopePreference: string | null
  spicyPreference: string | null
  tourismPreferenceIds: number[]
  foodPreferenceIds: number[]
}

export interface OnboardingResponse {
  walkingTolerance: string | null
  restPreference: string | null
  stairsPreference: string | null
  slopePreference: string | null
  spicyPreference: string | null
  tourismPreferenceIds: number[]
  foodPreferenceIds: number[]
  onboardingCompleted: boolean
}
