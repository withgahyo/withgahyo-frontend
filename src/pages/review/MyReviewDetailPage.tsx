import { ChevronLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import CommunityBackgroundLoop from '../../features/community/components/CommunityBackgroundLoop'
import CommunityStateNotice from '../../features/community/components/CommunityStateNotice'
import MyReviewArticle from '../../features/review/components/MyReviewArticle'
import { useMyReview, useReviewForm } from '../../features/review/hooks/useReviewQueries'
import { ROUTE_PATHS } from '../../routes/routePaths'

function MyReviewDetailPage() {
  const navigate = useNavigate()
  const { courseId = '0' } = useParams()
  const numericCourseId = Number(courseId)
  const validCourseId =
    Number.isFinite(numericCourseId) && numericCourseId > 0 ? numericCourseId : null
  const reviewQuery = useMyReview(validCourseId)
  const reviewFormQuery = useReviewForm(validCourseId)
  const review = reviewQuery.data
  const reviewForm = reviewFormQuery.data

  return (
    <div className="relative -mt-[env(safe-area-inset-top)] flex min-h-app flex-col overflow-hidden bg-brand-blue pt-[env(safe-area-inset-top)] text-white">
      <CommunityBackgroundLoop variant="detail" />

      <header className="relative z-1 flex h-16 items-center px-5">
        <button
          type="button"
          onClick={() => navigate(ROUTE_PATHS.myReviews)}
          className="flex items-center gap-1 text-brand-lime"
          aria-label="뒤로가기"
        >
          <ChevronLeft size={27} strokeWidth={2.6} />
          <span className="text-lg font-extrabold">내가 작성한 후기</span>
        </button>
      </header>

      <main className="relative z-1 flex-1 overflow-y-auto px-5 pb-10">
        {(reviewQuery.isLoading || reviewFormQuery.isLoading) && (
          <CommunityStateNotice title="후기를 불러오고 있어요." />
        )}
        {(reviewQuery.isError || reviewFormQuery.isError || validCourseId == null) && (
          <CommunityStateNotice
            title="후기를 불러오지 못했어요."
            description="잠시 후 다시 시도해주세요."
          />
        )}

        {review && reviewForm && (
          <MyReviewArticle
            review={review}
            course={reviewForm.course}
            recommendationMax={reviewForm.recommendationMax}
          />
        )}
      </main>
    </div>
  )
}

export default MyReviewDetailPage
