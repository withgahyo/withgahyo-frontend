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

// AI 추천 후보 목록 카드용 뷰 모델. summary 문자열(거리/일수 포함)이 표시의 source of truth.
export interface CourseCandidateSummary {
  candidateId: number
  title: string
  summary: string
  matchScore: number
  tags: string[]
  thumbnailImageUrl: string | null
}

// --- 코스 상세 화면 뷰 모델 ---
// API 응답(CourseDetailResponse / CourseCandidateDetailResponse)을 mappers 로 이 형태로
// 변환해 컴포넌트에서 사용한다.
// category 는 백엔드 enum이 완전히 확정되지 않아 string 으로 둔다.
// 확인된 값: FOOD / RESTAURANT / CAFE / BAKERY / TOUR / CULTURE / WALK / NATURE / ATTRACTION.
// PlaceCategoryIcon 이 알 수 없는 값은 기본 아이콘으로 처리한다.
export type PlaceCategory = string

export type TravelMode = 'CAR' | 'WALK'

export interface CoursePlace {
  id: number
  /** days 를 펼친 전역 순번(1-base). 지도 폴리라인/목록 정렬 기준. */
  order: number
  /** 소속 일자(1-base). Day 구분 헤더용. days[].day 를 그대로 보존한다. */
  day?: number
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

// AI 추천 후보 상세 뷰 모델. 지도/시트는 CourseDetail 과 동일하게 places 를 쓴다.
export interface CourseCandidateDetailView {
  candidateId: number
  generationId: number
  title: string
  summary: string
  matchScore: number
  tags: string[]
  recommendationReasons: string[]
  accessibilityHighlights: string[]
  places: CoursePlace[]
}

// 코스 상세 화면의 바텀시트 상태 (지도 크게 보기 ↔ 장소 목록 보기)
export type SheetState = 'expanded' | 'collapsed'
