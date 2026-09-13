import { useMemo, useState } from 'react'
import CommunityBackgroundLoop from '../../features/community/components/CommunityBackgroundLoop'
import CommunityCategoryTabs from '../../features/community/components/CommunityCategoryTabs'
import CommunityPostListItem from '../../features/community/components/CommunityPostListItem'
import CommunitySearchBar from '../../features/community/components/CommunitySearchBar'
import CommunitySectionTitle from '../../features/community/components/CommunitySectionTitle'
import CommunityStateNotice from '../../features/community/components/CommunityStateNotice'
import CommunityTopActions from '../../features/community/components/CommunityTopActions'
import CommunityWriteButton from '../../features/community/components/CommunityWriteButton'
import RecommendedPostCard from '../../features/community/components/RecommendedPostCard'
import {
  useCommunityPosts,
  useRecommendedCommunityPosts,
} from '../../features/community/hooks/useCommunityQueries'

function CommunityPage() {
  const [keyword, setKeyword] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>()
  const postParams = useMemo(
    () => ({
      keyword: keyword.trim() || undefined,
      category: selectedCategory,
      sort: 'latest',
      size: 10,
    }),
    [keyword, selectedCategory],
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
        <CommunityCategoryTabs selectedCategory={selectedCategory} onSelect={setSelectedCategory} />
      </div>

      <main className="relative z-1 pt-6">
        <section>
          <CommunitySectionTitle title="부모님이 가장 만족한 여행후기" />
          {recommendationsQuery.isLoading && (
            <div className="mt-2 px-5">
              <CommunityStateNotice title="인기 게시글을 불러오고 있어요." />
            </div>
          )}
          {recommendationsQuery.isError && (
            <div className="mt-2 px-5">
              <CommunityStateNotice
                title="인기 게시글을 불러오지 못했어요."
                description="잠시 후 다시 시도해주세요."
              />
            </div>
          )}
          {!recommendationsQuery.isLoading &&
            !recommendationsQuery.isError &&
            recommendedPosts.length === 0 && (
              <div className="mt-2 px-5">
                <CommunityStateNotice title="아직 추천 게시글이 없어요." />
              </div>
            )}
          {recommendedPosts.length > 0 && (
            <div className="mt-2 flex snap-x gap-3 overflow-x-auto px-5 pb-1">
              {recommendedPosts.map((post, index) => (
                <RecommendedPostCard key={post.postId} post={post} rank={index + 1} />
              ))}
            </div>
          )}
        </section>

        <section className="mt-7 px-5">
          <CommunitySectionTitle title="가족 여행 전 꼭 봐야할 글" />
          <div className="mt-3 space-y-3">
            {postsQuery.isLoading && <CommunityStateNotice title="게시글을 불러오고 있어요." />}
            {postsQuery.isError && (
              <CommunityStateNotice
                title="게시글을 불러오지 못했어요."
                description="검색 조건을 확인하거나 잠시 후 다시 시도해주세요."
              />
            )}
            {!postsQuery.isLoading && !postsQuery.isError && posts.length === 0 && (
              <CommunityStateNotice title="조건에 맞는 게시글이 없어요." />
            )}
            {posts.map((post, index) => (
              <CommunityPostListItem key={post.postId} post={post} imageIndex={index} />
            ))}
          </div>
        </section>
      </main>

      <CommunityWriteButton />
    </div>
  )
}

export default CommunityPage
