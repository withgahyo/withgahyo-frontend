import { Route, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { resolveApiAssetUrl } from '../../../api/assetUrl'
import type { CommunityPostSummaryResponse } from '../../../api/community'
import { ROUTE_PATHS } from '../../../routes/routePaths'
import { COMMUNITY_THUMBNAILS } from '../mock'
import { getCommunityPostCategoryLabel, getCommunityPostTitle } from '../utils'
import CommunityLikeButton from './CommunityLikeButton'

interface CommunityPostListItemProps {
  post: CommunityPostSummaryResponse
  imageIndex: number
}

function CommunityPostListItem({ post, imageIndex }: CommunityPostListItemProps) {
  const imageUrl =
    resolveApiAssetUrl(post.courseImageUrl ?? null) ??
    COMMUNITY_THUMBNAILS[imageIndex % COMMUNITY_THUMBNAILS.length]

  return (
    <article className="rounded-xl bg-[#071ed8] p-3 shadow-[0_8px_18px_rgb(0_0_0/0.18)]">
      <Link to={ROUTE_PATHS.communityPost(post.postId)} className="block">
        <div className="flex gap-3">
          <img src={imageUrl} alt="" className="h-18 w-18 shrink-0 rounded-lg object-cover" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="rounded-full bg-brand-lime px-2 py-0.5 text-[9px] font-black text-brand-blue">
                {getCommunityPostCategoryLabel(post)}
              </span>
              {post.regionName && (
                <span className="truncate text-[10px] font-bold text-white/62">
                  {post.regionName}
                </span>
              )}
            </div>
            <h3 className="mt-1.5 line-clamp-2 text-sm font-black leading-snug text-white">
              {getCommunityPostTitle(post)}
            </h3>
            <p className="mt-1 line-clamp-2 text-[11px] font-semibold leading-4 text-white/68">
              {post.contentPreview || '남긴 한줄 후기가 없어요.'}
            </p>
          </div>
        </div>

        <div className="mt-3 flex items-center">
          <div className="flex items-center gap-1 text-brand-lime">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                aria-hidden="true"
                size={14}
                fill="currentColor"
                strokeWidth={0}
                className={index < Math.round(post.rating ?? 0) ? '' : 'text-white/25'}
              />
            ))}
            <span className="ml-1 text-xs font-black text-white">
              {(post.rating ?? 0).toFixed(1)}
            </span>
          </div>
        </div>

        {post.highlights && post.highlights.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {post.highlights.slice(0, 3).map((highlight) => (
              <span
                key={highlight}
                className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-extrabold text-white/88"
              >
                # {highlight}
              </span>
            ))}
          </div>
        )}
      </Link>

      <div className="mt-3 flex items-center gap-2">
        {post.courseId ? (
          <Link
            to={ROUTE_PATHS.courseDetail(String(post.courseId))}
            className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg bg-white/10 text-xs font-black text-brand-lime"
          >
            <Route aria-hidden="true" size={15} strokeWidth={2.4} />
            여행 경로 보기
          </Link>
        ) : (
          <div className="flex-1" />
        )}
        <CommunityLikeButton
          postId={post.postId}
          likedByMe={post.likedByMe}
          likeCount={post.likeCount}
          compact
        />
      </div>
    </article>
  )
}

export default CommunityPostListItem
