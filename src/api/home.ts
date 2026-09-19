import { unwrapApiResponse } from './auth'
import { resolveApiAssetUrl } from './assetUrl'
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

export interface HomeAlternativeCandidateResponse {
  candidateId: number
  title: string
  summary: string
  thumbnailImageUrl: string | null
}

export interface HomeCourseResponse {
  courseId: number
  title: string
  regionName: string
  imageUrl: string | null
  startDate: string
  daysUntilTrip: number
  tags: string[]
  alternativeCandidates: HomeAlternativeCandidateResponse[]
}

export interface HomeResponse {
  familyCourses: HomeCourseResponse[]
}

export async function getHome() {
  const response = await apiClient.get<BackendApiResponse<HomeResponse>>('/api/v1/home')
  const home = unwrapApiResponse(response.data)

  return {
    ...home,
    familyCourses: home.familyCourses.map(normalizeHomeCourse),
  }
}

function normalizeHomeCourse(course: HomeCourseResponse): HomeCourseResponse {
  return {
    ...course,
    imageUrl: resolveApiAssetUrl(course.imageUrl),
    alternativeCandidates: course.alternativeCandidates.map(normalizeAlternativeCandidate),
  }
}

function normalizeAlternativeCandidate(
  candidate: HomeAlternativeCandidateResponse,
): HomeAlternativeCandidateResponse {
  return {
    ...candidate,
    thumbnailImageUrl: resolveApiAssetUrl(candidate.thumbnailImageUrl),
  }
}
