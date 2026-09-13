import CommunityBackgroundLoop from '../../features/community/components/CommunityBackgroundLoop'
import CommunityCategoryTabs from '../../features/community/components/CommunityCategoryTabs'
import CommunityPostListItem from '../../features/community/components/CommunityPostListItem'
import CommunitySearchBar from '../../features/community/components/CommunitySearchBar'
import CommunitySectionTitle from '../../features/community/components/CommunitySectionTitle'
import CommunityTopActions from '../../features/community/components/CommunityTopActions'
import CommunityWriteButton from '../../features/community/components/CommunityWriteButton'
import RecommendedPostCard from '../../features/community/components/RecommendedPostCard'
import {
  useCommunityPosts,
  useRecommendedCommunityPosts,
} from '../../features/community/hooks/useCommunityQueries'
import {
  MOCK_COMMUNITY_POST_LIST,
  MOCK_RECOMMENDED_POST_LIST,
} from '../../features/community/mock'

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
        <CommunityTopActions />
        <CommunitySearchBar />
        <CommunityCategoryTabs />
      </div>

      <main className="relative z-1 pt-6">
        <section>
          <CommunitySectionTitle title="부모님이 가장 만족한 여행후기" />
          <div className="mt-2 flex snap-x gap-3 overflow-x-auto px-5 pb-1">
            {recommendedPosts.map((post, index) => (
              <RecommendedPostCard key={post.postId} post={post} rank={index + 1} />
            ))}
          </div>
        </section>

        <section className="mt-7 px-5">
          <CommunitySectionTitle title="가족 여행 전 꼭 봐야할 글" />
          <div className="mt-3 space-y-3">
            {posts.slice(1).map((post, index) => (
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
