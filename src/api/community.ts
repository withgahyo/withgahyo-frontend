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

export interface CommunityPostSummaryResponse {
  postId: number
  authorId: number
  authorNickname: string
  category: string
  title: string
  contentPreview: string
  commentCount: number
  likeCount: number
  createdAt: string
}

export interface CommunityPostListResponse {
  posts: CommunityPostSummaryResponse[]
  hasNext: boolean
  nextCursor: string | null
}

export interface CommunityPostDetailResponse {
  postId: number
  authorId: number
  authorNickname: string
  category: string
  title: string
  content: string
  commentCount: number
  likeCount: number
  createdAt: string
}

export interface CommunityCommentResponse {
  commentId: number
  authorId: number
  authorNickname: string
  content: string
  createdAt: string
}

export interface CommunityCommentListResponse {
  comments: CommunityCommentResponse[]
  hasNext: boolean
  nextCursor: string | null
}

export interface CreateCommunityCommentRequest {
  content: string
}

export interface CreateCommunityCommentResponse {
  commentId: number
  postId: number
  authorId: number
  content: string
  createdAt: string
}

export interface ReportCommunityPostRequest {
  reason: string
  description?: string | null
}

export interface ReportCommunityPostResponse {
  reportId: number
  postId: number
  reason: string
}

export interface BlockCommunityUserResponse {
  blockId: number
  blockedUserId: number
}

export interface CommunityPostShareUrlResponse {
  postId: number
  shareUrl: string
}

export async function getCommunityPosts(params?: {
  keyword?: string
  category?: string
  sort?: string
  cursor?: string | null
  size?: number
}) {
  const response = await apiClient.get<BackendApiResponse<CommunityPostListResponse>>(
    '/api/v1/community/posts',
    { params },
  )

  return unwrapApiResponse(response.data)
}

export async function getRecommendedCommunityPosts(size = 6) {
  const response = await apiClient.get<BackendApiResponse<CommunityPostListResponse>>(
    '/api/v1/community/posts/recommendations',
    { params: { size } },
  )

  return unwrapApiResponse(response.data)
}

export async function getCommunityPostDetail(postId: number) {
  const response = await apiClient.get<BackendApiResponse<CommunityPostDetailResponse>>(
    `/api/v1/community/posts/${postId}`,
  )

  return unwrapApiResponse(response.data)
}

export async function getCommunityComments(postId: number, params?: {
  cursor?: string | null
  size?: number
}) {
  const response = await apiClient.get<BackendApiResponse<CommunityCommentListResponse>>(
    `/api/v1/community/posts/${postId}/comments`,
    { params },
  )

  return unwrapApiResponse(response.data)
}

export async function createCommunityComment(
  postId: number,
  request: CreateCommunityCommentRequest,
) {
  const response = await apiClient.post<BackendApiResponse<CreateCommunityCommentResponse>>(
    `/api/v1/community/posts/${postId}/comments`,
    request,
  )

  return unwrapApiResponse(response.data)
}

export async function reportCommunityPost(
  postId: number,
  request: ReportCommunityPostRequest,
) {
  const response = await apiClient.post<BackendApiResponse<ReportCommunityPostResponse>>(
    `/api/v1/community/posts/${postId}/reports`,
    request,
  )

  return unwrapApiResponse(response.data)
}

export async function blockCommunityUser(userId: number) {
  const response = await apiClient.post<BackendApiResponse<BlockCommunityUserResponse>>(
    `/api/v1/community/users/${userId}/blocks`,
  )

  return unwrapApiResponse(response.data)
}

export async function getCommunityPostShareUrl(postId: number) {
  const response = await apiClient.get<BackendApiResponse<CommunityPostShareUrlResponse>>(
    `/api/v1/community/posts/${postId}/share-url`,
  )

  return unwrapApiResponse(response.data)
}
