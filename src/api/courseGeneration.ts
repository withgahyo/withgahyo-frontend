import { unwrapApiResponse } from './auth'
import { apiClient } from './client'
import type { CourseTransportToNextResponse } from './course'
import type { ApiResponse } from '../types/api'

type BackendApiResponse<T> =
  | ApiResponse<T>
  | {
      success: boolean
      code: string
      message: string
      data: T
    }

// --- AI Generation 생성 (POST /api/v1/courses/{courseId}/generations) ---
// baseGenerationId / excludedPlaceIds / additionalRequest 는 "재생성" 전용 필드다.
// 최초 생성 시에는 빈 body 를 보낸다. (재생성 연동은 후속 이슈로 분리)
export interface CreateCourseGenerationRequest {
  baseGenerationId?: number
  excludedPlaceIds?: number[]
  additionalRequest?: string
}

export interface CreateCourseGenerationResponse {
  generationId: number
  courseId: number
  status: string
  requestedAt: string
}

export async function createCourseGeneration(
  courseId: number,
  request: CreateCourseGenerationRequest = {},
) {
  const response = await apiClient.post<BackendApiResponse<CreateCourseGenerationResponse>>(
    `/api/v1/courses/${courseId}/generations`,
    request,
    { timeout: 60_000 },
  )

  return unwrapApiResponse(response.data)
}

// --- Generation 상태 조회 (GET /api/v1/course-generations/{generationId}) ---
// terminal status 로 확정된 값은 'COMPLETED' / 'FAILED' 뿐이다.
// 진행중 status 문자열은 백엔드 미확정 → 그 외 모든 값은 "진행 중"으로 취급한다.
export interface CourseGenerationStatusResponse {
  generationId: number
  courseId: number
  status: string
  currentStage: string | null
  progress: number | null
  failureCode: string | null
  failureMessage: string | null
  retryable: boolean | null
  startedAt: string | null
  completedAt: string | null
}

export async function getCourseGeneration(generationId: number) {
  const response = await apiClient.get<BackendApiResponse<CourseGenerationStatusResponse>>(
    `/api/v1/course-generations/${generationId}`,
  )

  return unwrapApiResponse(response.data)
}

// --- 추천 Candidate 목록 (GET /api/v1/course-generations/{generationId}/candidates) ---
// candidates 는 1~3개가 올 수 있고, 정책상 0개도 방어해야 한다.
export interface CourseCandidateSummaryResponse {
  candidateId: number
  title: string
  summary: string
  matchScore: number
  tags: string[]
  thumbnailImageUrl: string | null
  totalDistanceKm: number | null
  estimatedTravelMinutes: number | null
  transportMode: string | null
}

export interface CourseCandidatesResponse {
  generationId: number
  courseId: number
  selectedCandidateId: number | null
  candidates: CourseCandidateSummaryResponse[]
}

export async function getCourseCandidates(generationId: number) {
  const response = await apiClient.get<BackendApiResponse<CourseCandidatesResponse>>(
    `/api/v1/course-generations/${generationId}/candidates`,
  )

  return unwrapApiResponse(response.data)
}

// --- Candidate 상세 (GET /api/v1/course-generations/{generationId}/candidates/{candidateId}) ---
export interface CourseCandidatePlaceResponse {
  order: number
  placeId: number
  source: string | null
  name: string
  category: string
  address: string | null
  imageUrl: string | null
  arrivalTime: string | null
  departureTime: string | null
  latitude: number
  longitude: number
  recommendationReason: string | null
  // 빈 객체({})가 올 수 있다. 현재 화면에서는 사용하지 않는다.
  accessibility: Record<string, unknown>
  transportToNext: CourseTransportToNextResponse
}

export interface CourseCandidateDayResponse {
  day: number
  date: string
  places: CourseCandidatePlaceResponse[]
}

export interface CourseCandidateDetailResponse {
  generationId: number
  candidateId: number
  title: string
  summary: string
  matchScore: number
  tags: string[]
  recommendationReasons: string[]
  accessibilityHighlights: string[]
  days: CourseCandidateDayResponse[]
}

export async function getCourseCandidateDetail(generationId: number, candidateId: number) {
  const response = await apiClient.get<BackendApiResponse<CourseCandidateDetailResponse>>(
    `/api/v1/course-generations/${generationId}/candidates/${candidateId}`,
  )

  return unwrapApiResponse(response.data)
}

// --- Candidate 선택 (POST /api/v1/course-generations/{generationId}/selection) ---
export interface SelectCourseCandidateRequest {
  candidateId: number
}

export interface SelectCourseCandidateResponse {
  courseId: number
  generationId: number
  selectedCandidateId: number
  courseStatus: string
  albumId: number | null
  confirmedAt: string
}

export async function selectCourseCandidate(generationId: number, candidateId: number) {
  const request: SelectCourseCandidateRequest = { candidateId }
  const response = await apiClient.post<BackendApiResponse<SelectCourseCandidateResponse>>(
    `/api/v1/course-generations/${generationId}/selection`,
    request,
  )

  return unwrapApiResponse(response.data)
}
