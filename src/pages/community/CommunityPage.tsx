import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import CommunityBackgroundLoop from '../../features/community/components/CommunityBackgroundLoop'
import CommunityCategoryTabs from '../../features/community/components/CommunityCategoryTabs'
import CommunityPostListItem from '../../features/community/components/CommunityPostListItem'
import CommunityRegionFilterSheet from '../../features/community/components/CommunityRegionFilterSheet'
import CommunitySearchBar from '../../features/community/components/CommunitySearchBar'
import CommunitySectionTitle from '../../features/community/components/CommunitySectionTitle'
import CommunityStateNotice from '../../features/community/components/CommunityStateNotice'
import CommunityTopActions from '../../features/community/components/CommunityTopActions'
import MyReviewListItem from '../../features/community/components/MyReviewListItem'
import PendingReviewCarousel from '../../features/community/components/PendingReviewCarousel'
import type { CommunityPostSummaryResponse } from '../../api/community'
import { ROUTE_PATHS } from '../../routes/routePaths'
import { useCommunityPosts } from '../../features/community/hooks/useCommunityQueries'
import { useMyReviews, usePendingReviews } from '../../features/review/hooks/useReviewQueries'
import {
  getCommunityFeedTabFromParam,
  type CommunityFeedTab,
} from '../../features/community/tabs'
import {
  MY_REVIEW_FEED_BACK_TO,
} from '../../features/course/backNavigation'
import {
  ALL_COMMUNITY_REGIONS,
  buildCommunityPostParams,
  getCommunityRegionFilterLabel,
} from '../../features/community/regionFilter'

function CommunityPage() {
  const [keyword, setKeyword] = useState('')
  const [selectedRegion, setSelectedRegion] = useState(ALL_COMMUNITY_REGIONS)
  const [isRegionFilterOpen, setIsRegionFilterOpen] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedTab = getCommunityFeedTabFromParam(searchParams.get('tab'))
  const postParams = useMemo(
    () => buildCommunityPostParams({ keyword, regionName: selectedRegion }),
    [keyword, selectedRegion],
  )
  const postsQuery = useCommunityPosts(postParams)
  const posts = postsQuery.data?.posts ?? []
  const selectedRegionLabel = getCommunityRegionFilterLabel(selectedRegion)
  const isRegionFilterActive = selectedRegion !== ALL_COMMUNITY_REGIONS
  const handleSelectTab = (tab: CommunityFeedTab) => {
    setSearchParams(tab === 'all' ? {} : { tab }, { replace: true })
  }

  const handleSelectRegion = (region: string) => {
    setSelectedRegion(region)
    setIsRegionFilterOpen(false)
  }

  return (
    <div className="relative -mt-[env(safe-area-inset-top)] min-h-app overflow-hidden bg-brand-blue pt-[env(safe-area-inset-top)] pb-[calc(6rem+env(safe-area-inset-bottom))] text-white">
      <CommunityBackgroundLoop />

      <div className="relative z-1 px-5 pt-6">
        <CommunityTopActions />
        <CommunitySearchBar
          value={keyword}
          onChange={setKeyword}
          onOpenFilter={() => setIsRegionFilterOpen(true)}
          selectedRegionLabel={selectedRegionLabel}
          isFilterActive={isRegionFilterActive}
        />
        <CommunityCategoryTabs selectedTab={selectedTab} onSelect={handleSelectTab} />
      </div>

      <main className="relative z-1 pt-5">
        {selectedTab === 'all' && (
          <AllReviewSection
            isLoading={postsQuery.isLoading}
            isError={postsQuery.isError}
            posts={posts}
          />
        )}
        {selectedTab === 'mine' && <MyReviewSection />}
      </main>

      {isRegionFilterOpen && (
        <CommunityRegionFilterSheet
          selectedRegion={selectedRegion}
          onSelect={handleSelectRegion}
          onClose={() => setIsRegionFilterOpen(false)}
        />
      )}
    </div>
  )
}

interface ReviewSectionProps {
  isLoading: boolean
  isError: boolean
  posts: CommunityPostSummaryResponse[]
}

function AllReviewSection({ isLoading, isError, posts }: ReviewSectionProps) {
  return (
    <section>
      <CommunitySectionTitle title="전체 여행 후기" showAction={false} />
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
  const pendingReviewsQuery = usePendingReviews()
  const myReviewsQuery = useMyReviews()
  const pendingReviews = pendingReviewsQuery.data?.reviews ?? []
  const myReviews = myReviewsQuery.data?.reviews ?? []
  const previewMyReviews = myReviews.slice(0, 4)

  return (
    <div className="space-y-7">
      <section>
        <CommunitySectionTitle title="미작성한 후기" showAction={false} />
        {pendingReviewsQuery.isLoading && (
          <div className="mt-4 px-5">
            <CommunityStateNotice title="작성할 후기를 불러오고 있어요." />
          </div>
        )}
        {pendingReviewsQuery.isError && (
          <div className="mt-4 px-5">
            <CommunityStateNotice
              title="작성할 후기를 불러오지 못했어요."
              description="잠시 후 다시 시도해주세요."
            />
          </div>
        )}
        {!pendingReviewsQuery.isLoading && !pendingReviewsQuery.isError && (
          <PendingReviewCarousel items={pendingReviews} />
        )}
      </section>

      <section>
        <CommunitySectionTitle
          title="내가 작성한 후기"
          showAction={myReviews.length > 0}
          actionTo={ROUTE_PATHS.myReviews}
        />
        <div className="mt-3 space-y-3 px-5">
          {myReviewsQuery.isLoading && (
            <CommunityStateNotice title="작성한 후기를 불러오고 있어요." />
          )}
          {myReviewsQuery.isError && (
            <CommunityStateNotice
              title="작성한 후기를 불러오지 못했어요."
              description="잠시 후 다시 시도해주세요."
            />
          )}
          {!myReviewsQuery.isLoading && !myReviewsQuery.isError && myReviews.length === 0 && (
            <CommunityStateNotice
              title="아직 작성한 후기가 없어요."
              description="부모님과 다녀온 여행 이야기를 남겨보세요."
            />
          )}
          {previewMyReviews.map((review) => (
            <MyReviewListItem
              key={review.reviewId}
              review={review}
              detailBackTo={MY_REVIEW_FEED_BACK_TO}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default CommunityPage
