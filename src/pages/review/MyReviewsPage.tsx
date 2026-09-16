import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import CommunityBackgroundLoop from '../../features/community/components/CommunityBackgroundLoop'
import CommunityStateNotice from '../../features/community/components/CommunityStateNotice'
import MyReviewListItem from '../../features/community/components/MyReviewListItem'
import { useMyReviews } from '../../features/review/hooks/useReviewQueries'
import { ROUTE_PATHS } from '../../routes/routePaths'

function MyReviewsPage() {
  const navigate = useNavigate()
  const myReviewsQuery = useMyReviews()
  const myReviews = myReviewsQuery.data?.reviews ?? []

  return (
    <main className="relative -mt-[env(safe-area-inset-top)] min-h-app overflow-hidden bg-brand-blue pt-[env(safe-area-inset-top)] pb-8 text-white">
      <CommunityBackgroundLoop />

      <header className="relative z-1 flex h-18 items-center px-5">
        <button
          type="button"
          onClick={() => navigate(ROUTE_PATHS.communityWithTab('mine'))}
          className="flex items-center gap-1 text-brand-lime"
          aria-label="뒤로가기"
        >
          <ChevronLeft size={27} strokeWidth={2.6} />
          <span className="text-lg font-extrabold">내가 작성한 후기</span>
        </button>
      </header>

      <section className="relative z-1 px-5">
        <div className="space-y-3">
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
          {myReviews.map((review) => (
            <MyReviewListItem key={review.reviewId} review={review} />
          ))}
        </div>
      </section>
    </main>
  )
}

export default MyReviewsPage
