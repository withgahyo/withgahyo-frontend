import { useMemo, useState } from 'react'
import CommunityBackgroundLoop from '../../features/community/components/CommunityBackgroundLoop'
import CommunityCategoryTabs from '../../features/community/components/CommunityCategoryTabs'
import CommunityPostListItem from '../../features/community/components/CommunityPostListItem'
import CommunitySearchBar from '../../features/community/components/CommunitySearchBar'
import CommunitySectionTitle from '../../features/community/components/CommunitySectionTitle'
import CommunityStateNotice from '../../features/community/components/CommunityStateNotice'
import CommunityTopActions from '../../features/community/components/CommunityTopActions'
import CommunityWriteButton from '../../features/community/components/CommunityWriteButton'
import PendingReviewCarousel from '../../features/community/components/PendingReviewCarousel'
import type { PendingReviewItem } from '../../features/community/components/PendingReviewCarousel'
import RecommendedPostCard from '../../features/community/components/RecommendedPostCard'
import type { CommunityPostSummaryResponse } from '../../api/community'
import {
  useCommunityPosts,
  useRecommendedCommunityPosts,
} from '../../features/community/hooks/useCommunityQueries'
import type { CommunityFeedTab } from '../../features/community/tabs'

function CommunityPage() {
  const [keyword, setKeyword] = useState('')
  const [selectedTab, setSelectedTab] = useState<CommunityFeedTab>('recommended')
  const postParams = useMemo(
    () => ({
      keyword: keyword.trim() || undefined,
      category: 'REVIEW',
      sort: 'latest',
      size: 10,
    }),
    [keyword],
  )
  const postsQuery = useCommunityPosts(postParams)
  const recommendationsQuery = useRecommendedCommunityPosts(5)
  const posts = postsQuery.data?.posts ?? []
  const recommendedPosts = recommendationsQuery.data?.posts ?? []

  return (
    <div className="relative -mt-[env(safe-area-inset-top)] min-h-app overflow-hidden bg-brand-blue pt-[env(safe-area-inset-top)] pb-[calc(6rem+env(safe-area-inset-bottom))] text-white">
      <CommunityBackgroundLoop />

      <div className="relative z-1 px-5 pt-6">
        <CommunityTopActions />
        <CommunitySearchBar value={keyword} onChange={setKeyword} />
        <CommunityCategoryTabs selectedTab={selectedTab} onSelect={setSelectedTab} />
      </div>

      <main className="relative z-1 pt-5">
        {selectedTab === 'recommended' && (
          <RecommendedReviewSection
            isLoading={recommendationsQuery.isLoading}
            isError={recommendationsQuery.isError}
            posts={recommendedPosts}
          />
        )}
        {selectedTab === 'all' && (
          <AllReviewSection
            isLoading={postsQuery.isLoading}
            isError={postsQuery.isError}
            posts={posts}
          />
        )}
        {selectedTab === 'mine' && <MyReviewSection />}
      </main>

      <CommunityWriteButton />
    </div>
  )
}

interface ReviewSectionProps {
  isLoading: boolean
  isError: boolean
  posts: CommunityPostSummaryResponse[]
}

function RecommendedReviewSection({ isLoading, isError, posts }: ReviewSectionProps) {
  return (
    <section>
      <CommunitySectionTitle title="좋아요 많은 여행 후기" />
      {isLoading && (
        <div className="mt-2 px-5">
          <CommunityStateNotice title="인기 후기를 불러오고 있어요." />
        </div>
      )}
      {isError && (
        <div className="mt-2 px-5">
          <CommunityStateNotice
            title="인기 후기를 불러오지 못했어요."
            description="잠시 후 다시 시도해주세요."
          />
        </div>
      )}
      {!isLoading && !isError && posts.length === 0 && (
        <div className="mt-2 px-5">
          <CommunityStateNotice title="아직 인기 후기가 없어요." />
        </div>
      )}
      {posts.length > 0 && (
        <div className="mt-2 flex snap-x gap-3 overflow-x-auto px-5 pb-1">
          {posts.map((post, index) => (
            <RecommendedPostCard key={post.postId} post={post} rank={index + 1} />
          ))}
        </div>
      )}
    </section>
  )
}

function AllReviewSection({ isLoading, isError, posts }: ReviewSectionProps) {
  return (
    <section>
      <CommunitySectionTitle title="전체 여행 후기" />
      <div className="mt-3 space-y-3 px-5">
        {isLoading && <CommunityStateNotice title="여행 후기를 불러오고 있어요." />}
        {isError && (
          <CommunityStateNotice
            title="여행 후기를 불러오지 못했어요."
            description="검색어를 확인하거나 잠시 후 다시 시도해주세요."
          />
        )}
        {!isLoading && !isError && posts.length === 0 && (
          <CommunityStateNotice title="조건에 맞는 여행 후기가 없어요." />
        )}
        {posts.map((post, index) => (
          <CommunityPostListItem key={post.postId} post={post} imageIndex={index} />
        ))}
      </div>
    </section>
  )
}

function MyReviewSection() {
  const pendingReviews: PendingReviewItem[] = []

  return (
    <div className="space-y-7">
      <section>
        <CommunitySectionTitle title="미작성한 후기" showAction={false} />
        <PendingReviewCarousel items={pendingReviews} />
      </section>

      <section>
        <CommunitySectionTitle title="내가 작성한 후기" />
        <div className="mt-3 px-5">
          <CommunityStateNotice
            title="아직 작성한 후기가 없어요."
            description="부모님과 다녀온 여행 이야기를 남겨보세요."
          />
        </div>
      </section>
    </div>
  )
}

export default CommunityPage
