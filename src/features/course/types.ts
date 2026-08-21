export interface RegionOption {
  id: string
  label: string
}

export interface KeywordOption {
  id: string
  label: string
}

export interface PlaceOption {
  id: string
  label: string
}

export interface FamilyMemberOption {
  id: string
  name: string
}

export type PlaceOptionsByRegion = Record<string, PlaceOption[]>

export interface CourseCreateFormState {
  courseName: string
  region: RegionOption | null
  keywordIds: string[]
  preferredPlaces: PlaceOption[]
  startDate: Date | null
  endDate: Date | null
  familyMemberIds: string[]
}
