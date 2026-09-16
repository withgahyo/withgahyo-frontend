import type { CreateCommunityPostRequest } from '../../api/community'

interface CreatedReview {
  reviewId: number
}

export function toCreateCommunityPostRequest(review: CreatedReview): CreateCommunityPostRequest {
  return { reviewId: review.reviewId }
}
