import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../../../constants/queryKeys'
import {
  blockCommunityUser,
  createCommunityComment,
  createCommunityPost,
  getCommunityComments,
  getCommunityPostDetail,
  getCommunityPosts,
  getCommunityPostShareUrl,
  getRecommendedCommunityPosts,
  likeCommunityPost,
  reportCommunityPost,
  unlikeCommunityPost,
  type CreateCommunityCommentRequest,
  type CreateCommunityPostRequest,
  type ReportCommunityPostRequest,
} from '../../../api/community'

export function useCommunityPosts(params?: {
  keyword?: string
  regionName?: string
  highlightType?: string
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

export function useCreateCommunityPost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (request: CreateCommunityPostRequest) => createCommunityPost(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.communityPostLists })
      queryClient.invalidateQueries({ queryKey: queryKeys.communityRecommendations(5) })
    },
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

export function useToggleCommunityPostLike(postId: number | null) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (likedByMe: boolean) =>
      likedByMe ? unlikeCommunityPost(postId as number) : likeCommunityPost(postId as number),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.communityPostLists })
      if (postId != null) {
        queryClient.invalidateQueries({ queryKey: queryKeys.communityPost(postId) })
      }
    },
  })
}
