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

export interface PendingReviewItemResponse {
  courseId: number
  title: string
  period: string
  imageUrl: string | null
}

export interface PendingReviewListResponse {
  reviews: PendingReviewItemResponse[]
}

export interface ReviewFormResponse {
  course: PendingReviewItemResponse
  ratingMin: number
  ratingMax: number
  recommendationMin: number
  recommendationMax: number
  highlightOptions: string[]
}

export interface CreateReviewRequest {
  rating: number
  comment?: string | null
  recommendationScore: number
  highlights: string[]
}

export interface UpdateReviewRequest extends CreateReviewRequest {}

export interface ReviewResponse {
  reviewId: number
  courseId: number
  rating: number
  comment: string | null
  recommendationScore: number
  highlights: string[]
  createdAt: string
  updatedAt: string
}

export interface MyReviewItemResponse {
  reviewId: number
  course: PendingReviewItemResponse
  rating: number
  comment: string | null
  recommendationScore: number
  highlights: string[]
  createdAt: string
  updatedAt: string
}

export interface MyReviewListResponse {
  reviews: MyReviewItemResponse[]
}

export async function getPendingReviews() {
  const response = await apiClient.get<BackendApiResponse<PendingReviewListResponse>>(
    '/api/v1/users/me/reviews/pending',
  )

  return unwrapApiResponse(response.data)
}

export async function getMyReviews() {
  const response = await apiClient.get<BackendApiResponse<MyReviewListResponse>>(
    '/api/v1/users/me/reviews',
  )

  return unwrapApiResponse(response.data)
}

export async function getReviewForm(courseId: number) {
  const response = await apiClient.get<BackendApiResponse<ReviewFormResponse>>(
    `/api/v1/courses/${courseId}/review-form`,
  )

  return unwrapApiResponse(response.data)
}

export async function createReview(courseId: number, request: CreateReviewRequest) {
  const response = await apiClient.post<BackendApiResponse<ReviewResponse>>(
    `/api/v1/courses/${courseId}/reviews`,
    request,
  )

  return unwrapApiResponse(response.data)
}

export async function getMyReview(courseId: number) {
  const response = await apiClient.get<BackendApiResponse<ReviewResponse>>(
    `/api/v1/courses/${courseId}/reviews/me`,
  )

  return unwrapApiResponse(response.data)
}

export async function updateMyReview(courseId: number, request: UpdateReviewRequest) {
  const response = await apiClient.patch<BackendApiResponse<ReviewResponse>>(
    `/api/v1/courses/${courseId}/reviews/me`,
    request,
  )

  return unwrapApiResponse(response.data)
}
