import { Heart } from 'lucide-react'
import type { CommunityCommentResponse } from '../../../api/community'

interface CommunityCommentCardProps {
  comment: CommunityCommentResponse
  thumbnail: string
}

function CommunityCommentCard({ comment, thumbnail }: CommunityCommentCardProps) {
  return (
    <article className="rounded-xl bg-[#071ed8] p-3 shadow-[0_8px_18px_rgb(0_0_0/0.14)]">
      <div className="flex items-start gap-3">
        <img src={thumbnail} alt="" className="h-10 w-10 rounded-md object-cover" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-extrabold">{comment.authorNickname}</p>
            <Heart size={15} className="text-brand-lime" />
          </div>
          <p className="mt-1 text-[11px] font-medium text-white/84">{comment.content}</p>
        </div>
      </div>
    </article>
  )
}

export default CommunityCommentCard
