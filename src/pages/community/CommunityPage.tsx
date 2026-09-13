import {
  Bell,
  ChevronRight,
  Edit3,
  MoreVertical,
  Search,
  SlidersHorizontal,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { ROUTE_PATHS } from '../../routes/routePaths'
import {
  COMMUNITY_CATEGORY_LABELS,
  COMMUNITY_THUMBNAILS,
  MOCK_COMMUNITY_POST_LIST,
  MOCK_RECOMMENDED_POST_LIST,
} from '../../features/community/mock'
import {
  useCommunityPosts,
  useRecommendedCommunityPosts,
} from '../../features/community/hooks/useCommunityQueries'
import type { CommunityPostSummaryResponse } from '../../api/community'

const CATEGORIES = [
  { value: undefined, label: '전체' },
  { value: 'FREE', label: '자유' },
  { value: 'QUESTION', label: '질문' },
  { value: 'REVIEW', label: '후기' },
  { value: 'INFO', label: '정보' },
] as const

function CommunityPage() {
  const postsQuery = useCommunityPosts({ sort: 'latest', size: 10 })
  const recommendationsQuery = useRecommendedCommunityPosts(5)
  const posts = postsQuery.data?.posts.length
    ? postsQuery.data.posts
    : MOCK_COMMUNITY_POST_LIST.posts
  const recommendedPosts = recommendationsQuery.data?.posts.length
    ? recommendationsQuery.data.posts
    : MOCK_RECOMMENDED_POST_LIST.posts

  return (
    <div className="relative -mt-[env(safe-area-inset-top)] min-h-app overflow-hidden bg-brand-blue pt-[env(safe-area-inset-top)] pb-[calc(6rem+env(safe-area-inset-bottom))] text-white">
      <CommunityBackgroundLoop />
      <div className="relative z-1 px-5 pt-6">
        <header className="flex items-center justify-end gap-3 text-brand-lime">
          <button type="button" aria-label="알림" className="rounded-full p-1">
            <Bell size={20} strokeWidth={2.2} />
          </button>
          <button type="button" aria-label="더보기" className="rounded-full p-1">
            <MoreVertical size={21} strokeWidth={2.6} />
          </button>
        </header>

        <label className="mt-8 flex h-10 items-center rounded-full bg-white px-4 text-xs text-[#a5a8b7] shadow-[0_8px_18px_rgb(0_0_0/0.12)]">
          <Search aria-hidden="true" size={22} className="mr-2 text-[#d7d8df]" />
          <span className="sr-only">커뮤니티 검색</span>
          <input
            className="min-w-0 flex-1 bg-transparent text-[11px] outline-none placeholder:text-[#b6b8c5]"
            placeholder="커뮤니티에서 이야기나 정보를 검색해보세요!"
          />
          <SlidersHorizontal aria-hidden="true" size={17} className="text-[#b6b8c5]" />
        </label>

        <div className="mt-3 flex gap-2 overflow-x-auto">
          {CATEGORIES.map((category, index) => (
            <button
              key={category.label}
              type="button"
              className={`h-5 min-w-12 rounded-full border px-3 text-[10px] font-semibold ${
                index === 1
                  ? 'border-brand-lime bg-brand-lime text-brand-blue'
                  : 'border-white/35 bg-white/5 text-white'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <main className="relative z-1 pt-6">
        <section>
          <SectionTitle title="부모님이 가장 만족한 여행후기" />
          <div className="mt-2 flex snap-x gap-3 overflow-x-auto px-5 pb-1">
            {recommendedPosts.map((post, index) => (
              <RecommendedCard key={post.postId} post={post} rank={index + 1} />
            ))}
          </div>
        </section>

        <section className="mt-7 px-5">
          <SectionTitle title="가족 여행 전 꼭 봐야할 글" />
          <div className="mt-3 space-y-3">
            {posts.slice(1).map((post, index) => (
              <PostListItem key={post.postId} post={post} imageIndex={index} />
            ))}
          </div>
        </section>
      </main>

      <Link
        to={ROUTE_PATHS.community}
        aria-label="커뮤니티 글쓰기"
        className="fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom))] right-[calc(50%-196px)] z-10 flex h-14 w-14 items-center justify-center rounded-full bg-brand-lime text-brand-blue shadow-fab active:scale-95"
      >
        <Edit3 size={27} strokeWidth={2.2} />
      </Link>
    </div>
  )
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between px-5">
      <h2 className="text-lg font-extrabold tracking-[-0.01em]">{title}</h2>
      <button
        type="button"
        className="flex items-center gap-0.5 text-[10px] font-bold text-brand-lime"
      >
        더보기
        <ChevronRight aria-hidden="true" size={14} strokeWidth={3} />
      </button>
    </div>
  )
}

function RecommendedCard({ post, rank }: { post: CommunityPostSummaryResponse; rank: number }) {
  const imageUrl = COMMUNITY_THUMBNAILS[(rank - 1) % COMMUNITY_THUMBNAILS.length]

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
          {categoryLabel(post.category)}
        </span>
        <h3 className="mt-1 line-clamp-2 text-xs font-black leading-tight text-white">
          {post.title}
        </h3>
        <p className="mt-1 text-[9px] font-semibold text-white/80">♥ {formatCount(post.likeCount)}</p>
      </div>
    </Link>
  )
}

function PostListItem({ post, imageIndex }: { post: CommunityPostSummaryResponse; imageIndex: number }) {
  const imageUrl = COMMUNITY_THUMBNAILS[imageIndex % COMMUNITY_THUMBNAILS.length]

  return (
    <Link
      to={ROUTE_PATHS.communityPost(post.postId)}
      className="flex min-h-18 items-center rounded-xl bg-[#071ed8] p-2.5 shadow-[0_8px_18px_rgb(0_0_0/0.18)]"
    >
      <img
        src={imageUrl}
        alt=""
        className="h-14 w-14 shrink-0 rounded-md object-cover"
      />
      <div className="min-w-0 flex-1 px-3">
        <span className="rounded-full bg-brand-lime px-2 py-0.5 text-[9px] font-black text-brand-blue">
          {categoryLabel(post.category)}
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

function CommunityBackgroundLoop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-20 -right-16 h-48 w-72 rounded-[55%] border-[18px] border-[#1f31e9] opacity-70"
    />
  )
}

function categoryLabel(category: string) {
  return COMMUNITY_CATEGORY_LABELS[category] ?? category
}

function formatCount(count: number) {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`
  }
  return count.toString()
}

export default CommunityPage
