import { Link } from 'react-router-dom'
import { resolveApiAssetUrl } from '../../../api/assetUrl'
import type { CommunityPostSummaryResponse } from '../../../api/community'
import { ROUTE_PATHS } from '../../../routes/routePaths'
import { COMMUNITY_THUMBNAILS } from '../mock'
import {
  formatCommunityCount,
  getCommunityPostCategoryLabel,
  getCommunityPostTitle,
} from '../utils'

interface RecommendedPostCardProps {
  post: CommunityPostSummaryResponse
  rank: number
}

function RecommendedPostCard({ post, rank }: RecommendedPostCardProps) {
  const imageUrl =
    resolveApiAssetUrl(post.courseImageUrl ?? null) ??
    COMMUNITY_THUMBNAILS[(rank - 1) % COMMUNITY_THUMBNAILS.length]

  return (
    <Link
      to={ROUTE_PATHS.communityPost(post.postId)}
      className="relative h-36 w-30 shrink-0 snap-start overflow-hidden rounded-xl bg-[#071ed8] shadow-[0_10px_18px_rgb(0_0_0/0.22)]"
    >
      <img src={imageUrl} alt="" className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/15 to-black/72" />
      <span className="absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-br-xl bg-brand-lime text-lg font-black text-brand-blue">
        {rank}
      </span>
      <div className="absolute inset-x-3 bottom-3">
        <span className="rounded-full bg-brand-lime px-2 py-0.5 text-[9px] font-black text-brand-blue">
          {getCommunityPostCategoryLabel(post)}
        </span>
        <h3 className="mt-1 line-clamp-2 text-xs font-black leading-tight text-white">
          {getCommunityPostTitle(post)}
        </h3>
        <p className="mt-1 text-[9px] font-semibold text-white/80">
          ♥ {formatCommunityCount(post.likeCount)}
        </p>
      </div>
    </Link>
  )
}

export default RecommendedPostCard
