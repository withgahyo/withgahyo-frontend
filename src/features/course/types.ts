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

export interface RecommendedCourse {
  id: string
  title: string
  satisfaction: number
  tags: string[]
  totalDistanceKm: number
  totalDurationMinutes: number
  imageUrl?: string
}

// --- 코스 상세 화면 뷰 모델 ---
// API 응답(CourseDetailResponse)을 features/course/mappers/toCourseDetail 로 이 형태로
// 변환해 컴포넌트에서 사용한다.
export type PlaceCategory = 'BAKERY' | 'RESTAURANT' | 'NATURE' | 'CAFE' | 'ATTRACTION' | 'ETC'

export type TravelMode = 'CAR' | 'WALK'

export interface CoursePlace {
  id: number
  order: number
  name: string
  category: PlaceCategory
  latitude: number
  longitude: number
  /** 주소 (응답 place.address). 없으면 렌더링하지 않는다. */
  address?: string
  imageUrl?: string
  /** 영업시간 표시 문자열. 현재 상세 응답에는 없음(향후 확장용). */
  openingHours?: string
  /** 직전 장소로부터의 이동 시간(분). 현재 상세 응답에는 없음(향후 확장용). */
  travelTimeFromPrevious?: number
  travelMode?: TravelMode
}

export interface CourseDetail {
  id: string
  title: string
  places: CoursePlace[]
}

// 코스 상세 화면의 바텀시트 상태 (지도 크게 보기 ↔ 장소 목록 보기)
export type SheetState = 'expanded' | 'collapsed'
