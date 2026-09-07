import { unwrapApiResponse } from './auth'
import { apiClient } from './client'
import type { ApiResponse } from '../types/api'

type BackendApiResponse<T> =
  | ApiResponse<T>
  | {
      success: boolean
      code: string
      message: string
      data: T
    }

export interface CourseRegionResponse {
  areaCode: string
  sigunguCode: string
  name: string
  parentName: string
  displayName: string
}

export interface SearchRegionsResponse {
  regions: CourseRegionResponse[]
}

export interface CoursePlaceResponse {
  placeId: number
  source: string
  externalPlaceId: string
  name: string
  category: string
  address: string
  areaCode: string
  sigunguCode: string
  imageUrl: string | null
  latitude: number | null
  longitude: number | null
}

export interface SearchPlacesResponse {
  places: CoursePlaceResponse[]
  hasNext: boolean
  nextCursor: string | null
}

export interface CourseKeywordResponse {
  keywordId: number
  code: string
  name: string
}

export interface CourseKeywordSuggestionsResponse {
  keywords: CourseKeywordResponse[]
}

export interface CourseFamilyMemberResponse {
  familyMemberId: number
  nickname: string
  relationship: string
  profileImageUrl: string | null
}

export interface CourseFamilyMembersResponse {
  familyMembers: CourseFamilyMemberResponse[]
}

export interface FamilyMemberCandidateResponse {
  userId: number
  nickname: string
  profileImageUrl: string | null
  maskedEmail: string
  alreadyConnected: boolean
}

export interface ConnectFamilyMemberRequest {
  familyUserId: number
  relationship: string
}

export interface ConnectFamilyMemberResponse {
  familyMemberId: number
  nickname: string
  relationship: string
  profileImageUrl: string | null
}

export interface CreateCourseRequest {
  title: string
  areaCode: string
  sigunguCode: string
  startDate: string
  endDate: string
  familyMemberIds: number[]
  keywordIds: number[]
  mustVisitPlaceIds: number[]
  transportMode: 'CAR'
}

export interface CreateCourseResponse {
  courseId: number
  title: string
  status: string
  createdAt: string
}

export async function searchRegions(query?: string) {
  const response = await apiClient.get<BackendApiResponse<SearchRegionsResponse>>(
    '/api/v1/regions/search',
    {
      params: query ? { query } : undefined,
    },
  )

  return unwrapApiResponse(response.data)
}

export async function searchPlaces(params: {
  areaCode: string
  sigunguCode: string
  query: string
  cursor?: string | null
  size?: number
}) {
  const response = await apiClient.get<BackendApiResponse<SearchPlacesResponse>>(
    '/api/v1/places/search',
    {
      params: {
        areaCode: params.areaCode,
        sigunguCode: params.sigunguCode,
        query: params.query,
        cursor: params.cursor,
        size: params.size,
      },
    },
  )

  return unwrapApiResponse(response.data)
}

export async function getCourseKeywordSuggestions() {
  const response = await apiClient.get<BackendApiResponse<CourseKeywordSuggestionsResponse>>(
    '/api/v1/course-keywords/suggestions',
  )

  return unwrapApiResponse(response.data)
}

export async function getCourseFamilyMembers() {
  const response = await apiClient.get<BackendApiResponse<CourseFamilyMembersResponse>>(
    '/api/v1/family/members',
  )

  return unwrapApiResponse(response.data)
}

export async function findFamilyMemberCandidate(email: string) {
  const response = await apiClient.get<BackendApiResponse<FamilyMemberCandidateResponse>>(
    '/api/v1/family/members',
    {
      params: { email },
    },
  )

  return unwrapApiResponse(response.data)
}

export async function connectFamilyMember(request: ConnectFamilyMemberRequest) {
  const response = await apiClient.post<BackendApiResponse<ConnectFamilyMemberResponse>>(
    '/api/v1/family/members',
    request,
  )

  return unwrapApiResponse(response.data)
}

export async function disconnectFamilyMember(familyMemberId: number) {
  const response = await apiClient.delete<BackendApiResponse<null>>(
    `/api/v1/family/members/${familyMemberId}`,
  )

  return unwrapApiResponse(response.data)
}

export async function createCourse(request: CreateCourseRequest) {
  const response = await apiClient.post<BackendApiResponse<CreateCourseResponse>>(
    '/api/v1/courses',
    request,
  )

  return unwrapApiResponse(response.data)
}

// --- 코스 상세 조회 (GET /api/v1/courses/{courseId}) ---
// 실제 API 응답 스펙 그대로 정의한다. 현재 상세 화면에서 사용하지 않는 필드도 포함한다.
export interface CourseDetailParticipantResponse {
  familyMemberId: number
  name: string
  relationship: string
  profileImageUrl: string | null
}

export interface CourseDetailPlaceResponse {
  placeId: number
  source: string
  externalPlaceId: string
  name: string
  category: string
  address: string
  areaCode: string
  sigunguCode: string
  imageUrl: string | null
  latitude: number
  longitude: number
}

export interface CourseDetailDayResponse {
  day: number
  date: string
  places: CourseDetailPlaceResponse[]
}

export interface CourseDetailResponse {
  courseId: number
  title: string
  status: string
  startDate: string
  endDate: string
  daysUntilTrip: number
  region: CourseRegionResponse
  imageUrl: string | null
  tags: string[]
  liked: boolean
  likeCount: number
  albumId: number | null
  participants: CourseDetailParticipantResponse[]
  days: CourseDetailDayResponse[]
}

export async function getCourseDetail(courseId: number) {
  const response = await apiClient.get<BackendApiResponse<CourseDetailResponse>>(
    `/api/v1/courses/${courseId}`,
  )

  return unwrapApiResponse(response.data)
}
