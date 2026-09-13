import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { CommunityPostSummaryResponse } from '../../../api/community'
import { ROUTE_PATHS } from '../../../routes/routePaths'
import { COMMUNITY_THUMBNAILS } from '../mock'
import { getCommunityCategoryLabel } from '../utils'

interface CommunityPostListItemProps {
  post: CommunityPostSummaryResponse
  imageIndex: number
}

function CommunityPostListItem({ post, imageIndex }: CommunityPostListItemProps) {
  const imageUrl = COMMUNITY_THUMBNAILS[imageIndex % COMMUNITY_THUMBNAILS.length]

  return (
    <Link
      to={ROUTE_PATHS.communityPost(post.postId)}
      className="flex min-h-18 items-center rounded-xl bg-[#071ed8] p-2.5 shadow-[0_8px_18px_rgb(0_0_0/0.18)]"
    >
      <img src={imageUrl} alt="" className="h-14 w-14 shrink-0 rounded-md object-cover" />
      <div className="min-w-0 flex-1 px-3">
        <span className="rounded-full bg-brand-lime px-2 py-0.5 text-[9px] font-black text-brand-blue">
          {getCommunityCategoryLabel(post.category)}
        </span>
        <h3 className="mt-1 truncate text-[13px] font-extrabold text-white">{post.title}</h3>
        <p className="mt-1 text-[9px] font-semibold text-white/60">
          {post.commentCount}시간 전 등록
        </p>
      </div>
      <ChevronRight aria-hidden="true" size={28} strokeWidth={2.6} className="text-brand-lime" />
    </Link>
  )
}

export default CommunityPostListItem
