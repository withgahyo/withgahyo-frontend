export interface RegionOption {
  id: string
  label: string
  areaCode: string
  sigunguCode: string
}

export interface KeywordOption {
  id: number
  label: string
}

export interface PlaceOption {
  id: number
  label: string
  address: string
}

export interface FamilyMemberOption {
  id: number
  name: string
  relationship: string
  profileImageUrl: string | null
}

export interface CourseCreateFormState {
  courseName: string
  region: RegionOption | null
  keywordIds: number[]
  preferredPlaces: PlaceOption[]
  startDate: Date | null
  endDate: Date | null
  familyMemberIds: number[]
}
