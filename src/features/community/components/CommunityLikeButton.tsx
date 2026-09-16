import { Heart } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useToggleCommunityPostLike } from '../hooks/useCommunityQueries'
import { getCommunityLikePresentation } from '../likeAction'

interface CommunityLikeButtonProps {
  postId: number
  likedByMe?: boolean
  likeCount: number
  compact?: boolean
}

function CommunityLikeButton({
  postId,
  likedByMe = false,
  likeCount,
  compact = false,
}: CommunityLikeButtonProps) {
  const [currentLikedByMe, setCurrentLikedByMe] = useState(likedByMe)
  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount)
  const toggleLike = useToggleCommunityPostLike(postId)
  const presentation = getCommunityLikePresentation({
    likedByMe: currentLikedByMe,
    likeCount: currentLikeCount,
  })

  useEffect(() => {
    setCurrentLikedByMe(likedByMe)
    setCurrentLikeCount(likeCount)
  }, [likedByMe, likeCount])

  async function handleClick() {
    if (toggleLike.isPending) return

    try {
      const response = await toggleLike.mutateAsync(currentLikedByMe)
      setCurrentLikedByMe(response.liked)
      setCurrentLikeCount(response.likeCount)
    } catch {
      // Keep the previous visible state when the request fails.
    }
  }

  return (
    <button
      type="button"
      aria-label={presentation.ariaLabel}
      aria-pressed={presentation.isLiked}
      disabled={toggleLike.isPending}
      onClick={handleClick}
      className={[
        'inline-flex items-center justify-center gap-1 rounded-full font-extrabold transition disabled:opacity-60',
        presentation.isLiked ? 'text-brand-lime' : 'text-white/75',
        compact ? 'h-8 px-2 text-xs' : 'h-10 px-3 text-sm',
      ].join(' ')}
    >
      <Heart
        aria-hidden="true"
        size={compact ? 14 : 17}
        fill={presentation.isLiked ? 'currentColor' : 'none'}
        strokeWidth={2.4}
      />
      {presentation.count}
    </button>
  )
}

export default CommunityLikeButton
