import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../../../constants/queryKeys'
import {
  blockCommunityUser,
  createCommunityComment,
  getCommunityComments,
  getCommunityPostDetail,
  getCommunityPosts,
  getCommunityPostShareUrl,
  getRecommendedCommunityPosts,
  reportCommunityPost,
  type CreateCommunityCommentRequest,
  type ReportCommunityPostRequest,
} from '../../../api/community'

export function useCommunityPosts(params?: {
  keyword?: string
  category?: string
  sort?: string
  cursor?: string | null
  size?: number
}) {
  return useQuery({
    queryKey: queryKeys.communityPosts(params ?? {}),
    queryFn: () => getCommunityPosts(params),
    retry: false,
  })
}

export function useRecommendedCommunityPosts(size = 6) {
  return useQuery({
    queryKey: queryKeys.communityRecommendations(size),
    queryFn: () => getRecommendedCommunityPosts(size),
    retry: false,
  })
}

export function useCommunityPostDetail(postId: number | null) {
  return useQuery({
    queryKey: queryKeys.communityPost(postId ?? 0),
    queryFn: () => getCommunityPostDetail(postId as number),
    enabled: postId != null,
    retry: false,
  })
}

export function useCommunityComments(postId: number | null) {
  return useQuery({
    queryKey: queryKeys.communityComments(postId ?? 0),
    queryFn: () => getCommunityComments(postId as number, { size: 20 }),
    enabled: postId != null,
    retry: false,
  })
}

export function useCreateCommunityComment(postId: number | null) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (request: CreateCommunityCommentRequest) =>
      createCommunityComment(postId as number, request),
    onSuccess: () => {
      if (postId != null) {
        queryClient.invalidateQueries({ queryKey: queryKeys.communityComments(postId) })
        queryClient.invalidateQueries({ queryKey: queryKeys.communityPost(postId) })
      }
    },
  })
}

export function useReportCommunityPost(postId: number | null) {
  return useMutation({
    mutationFn: (request: ReportCommunityPostRequest) =>
      reportCommunityPost(postId as number, request),
  })
}

export function useBlockCommunityUser() {
  return useMutation({ mutationFn: blockCommunityUser })
}

export function useCommunityPostShareUrl(postId: number | null) {
  return useMutation({
    mutationFn: () => getCommunityPostShareUrl(postId as number),
  })
}
