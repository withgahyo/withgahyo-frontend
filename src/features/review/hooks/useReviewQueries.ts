import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createReview,
  getMyReview,
  getPendingReviews,
  getReviewForm,
  updateMyReview,
  type CreateReviewRequest,
  type UpdateReviewRequest,
} from '../../../api/review'
import { queryKeys } from '../../../constants/queryKeys'

export function usePendingReviews() {
  return useQuery({
    queryKey: queryKeys.pendingReviews,
    queryFn: getPendingReviews,
    retry: false,
  })
}

export function useReviewForm(courseId: number | null) {
  return useQuery({
    queryKey: queryKeys.reviewForm(courseId ?? 0),
    queryFn: () => getReviewForm(courseId as number),
    enabled: courseId != null,
    retry: false,
  })
}

export function useMyReview(courseId: number | null) {
  return useQuery({
    queryKey: queryKeys.myReview(courseId ?? 0),
    queryFn: () => getMyReview(courseId as number),
    enabled: courseId != null,
    retry: false,
  })
}

export function useCreateReview(courseId: number | null) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (request: CreateReviewRequest) => createReview(courseId as number, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pendingReviews })
      if (courseId != null) {
        queryClient.invalidateQueries({ queryKey: queryKeys.myReview(courseId) })
      }
    },
  })
}

export function useUpdateMyReview(courseId: number | null) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (request: UpdateReviewRequest) => updateMyReview(courseId as number, request),
    onSuccess: () => {
      if (courseId != null) {
        queryClient.invalidateQueries({ queryKey: queryKeys.myReview(courseId) })
      }
    },
  })
}
