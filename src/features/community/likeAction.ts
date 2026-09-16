export interface CommunityLikeState {
  likedByMe?: boolean
  likeCount: number
}

export type CommunityLikeAction = 'like' | 'unlike'

export function getCommunityLikeAction(post: Pick<CommunityLikeState, 'likedByMe'>): CommunityLikeAction {
  return post.likedByMe ? 'unlike' : 'like'
}

export function getCommunityLikePresentation(post: CommunityLikeState) {
  const isLiked = post.likedByMe === true

  return {
    ariaLabel: isLiked ? '좋아요 취소' : '좋아요',
    count: post.likeCount,
    isLiked,
  }
}
