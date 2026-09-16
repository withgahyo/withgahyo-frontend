import type { CommunityPostDetailResponse } from '../../../api/community'
import {
  formatCommunityDate,
  getCommunityPostCategoryLabel,
  getCommunityPostTitle,
} from '../utils'
import CommunityLikeButton from './CommunityLikeButton'

interface CommunityPostArticleProps {
  post: CommunityPostDetailResponse
  thumbnail: string
}

function CommunityPostArticle({ post, thumbnail }: CommunityPostArticleProps) {
  return (
    <article className="rounded-xl bg-[#071ed8] p-4 shadow-[0_10px_24px_rgb(0_0_0/0.18)]">
      <div className="flex items-start gap-3">
        <img src={thumbnail} alt="" className="h-12 w-12 shrink-0 rounded-md object-cover" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-extrabold">{post.authorNickname}</p>
          <p className="mt-0.5 text-[10px] font-semibold text-white/62">
            {formatCommunityDate(post.createdAt)}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold text-white/85">
          # {getCommunityPostCategoryLabel(post)}
        </span>
      </div>

      <h2 className="mt-3 text-xl font-black leading-tight">{getCommunityPostTitle(post)}</h2>
      <p className="mt-3 whitespace-pre-line text-[13px] font-medium leading-relaxed text-white/92">
        {post.content ?? '남긴 한줄 후기가 없어요.'}
      </p>
      <div className="mt-6 flex justify-end border-t border-white/10 pt-2">
        <CommunityLikeButton
          postId={post.postId}
          likedByMe={post.likedByMe}
          likeCount={post.likeCount}
        />
      </div>
    </article>
  )
}

export default CommunityPostArticle
