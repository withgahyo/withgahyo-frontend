import { Star } from 'lucide-react'
import type { CommunityPostDetailResponse } from '../../../api/community'
import { formatCommunityDate } from '../utils'

interface CommunityPostArticleProps {
  post: CommunityPostDetailResponse
  thumbnail: string
}

function CommunityPostArticle({ post, thumbnail }: CommunityPostArticleProps) {
  return (
    <article className="rounded-xl bg-[#071ed8] p-4 shadow-[0_10px_24px_rgb(0_0_0/0.18)]">
      <div className="flex items-start gap-3">
        <img src={thumbnail} alt="" className="h-12 w-12 rounded-md object-cover" />
        <div>
          <p className="text-sm font-extrabold">{post.authorNickname}</p>
          <p className="mt-0.5 text-[10px] font-semibold text-white/62">
            {formatCommunityDate(post.createdAt)}
          </p>
        </div>
      </div>

      {post.category === 'REVIEW' && (
        <div className="mt-4 flex gap-1 text-brand-lime" aria-label="별점 5점">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} size={19} fill="currentColor" strokeWidth={0} />
          ))}
        </div>
      )}

      <h2 className="mt-3 text-xl font-black leading-tight">{post.title}</h2>
      <p className="mt-3 whitespace-pre-line text-[13px] font-medium leading-relaxed text-white/92">
        {post.content}
      </p>
      <div className="mt-6 border-t border-white/10 pt-2 text-[10px] text-white/40">
        ♥ {post.likeCount}
      </div>
    </article>
  )
}

export default CommunityPostArticle
