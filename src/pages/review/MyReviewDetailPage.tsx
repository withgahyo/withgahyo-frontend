import { ChevronLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import CommunityBackgroundLoop from '../../features/community/components/CommunityBackgroundLoop'
import CommunityStateNotice from '../../features/community/components/CommunityStateNotice'
import ReviewCourseSummaryCard from '../../features/review/components/ReviewCourseSummaryCard'
import ReviewHighlightField from '../../features/review/components/ReviewHighlightField'
import ReviewMemoField from '../../features/review/components/ReviewMemoField'
import ReviewRatingField from '../../features/review/components/ReviewRatingField'
import ReviewRecommendationSlider from '../../features/review/components/ReviewRecommendationSlider'
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
    <main className="relative -mt-[env(safe-area-inset-top)] min-h-app overflow-hidden bg-brand-blue pt-[env(safe-area-inset-top)] pb-8 text-white">
      <CommunityBackgroundLoop />

      <header className="relative z-1 flex h-18 items-center px-5">
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

      <section className="relative z-1 mx-2 rounded-t-card bg-white px-5 pb-7 pt-6">
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
          <div className="space-y-2.5">
            <ReviewCourseSummaryCard course={reviewForm.course} />
            <ReviewRatingField value={review.rating} onChange={() => undefined} readOnly />
            <ReviewHighlightField
              values={review.highlights}
              onToggle={() => undefined}
              options={reviewForm.highlightOptions}
              readOnly
            />
            <ReviewMemoField
              value={review.comment || '남긴 한줄 후기가 없어요.'}
              onChange={() => undefined}
              readOnly
            />
            <ReviewRecommendationSlider
              value={review.recommendationScore}
              onChange={() => undefined}
              min={reviewForm.recommendationMin}
              max={reviewForm.recommendationMax}
              readOnly
            />
          </div>
        )}
      </section>
    </main>
  )
}

export default MyReviewDetailPage
