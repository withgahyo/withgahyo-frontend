import { ChevronLeft, Star } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { resolveApiAssetUrl } from '../../api/assetUrl'
import courseDaejeon from '../../assets/home/course-daejeon.jpeg'
import CommunityBackgroundLoop from '../../features/community/components/CommunityBackgroundLoop'
import CommunityStateNotice from '../../features/community/components/CommunityStateNotice'
import { useMyReview, useReviewForm } from '../../features/review/hooks/useReviewQueries'

function MyReviewDetailPage() {
  const navigate = useNavigate()
  const { courseId = '0' } = useParams()
  const numericCourseId = Number(courseId)
  const validCourseId =
    Number.isFinite(numericCourseId) && numericCourseId > 0 ? numericCourseId : null
  const reviewQuery = useMyReview(validCourseId)
  const reviewFormQuery = useReviewForm(validCourseId)
  const review = reviewQuery.data
  const course = reviewFormQuery.data?.course
  const imageUrl = resolveApiAssetUrl(course?.imageUrl ?? null) ?? courseDaejeon

  return (
    <main className="relative -mt-[env(safe-area-inset-top)] min-h-app overflow-hidden bg-brand-blue pt-[env(safe-area-inset-top)] pb-8 text-white">
      <CommunityBackgroundLoop />

      <header className="relative z-1 flex h-18 items-center px-5">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-brand-lime"
          aria-label="뒤로가기"
        >
          <ChevronLeft size={27} strokeWidth={2.6} />
          <span className="text-lg font-extrabold">내가 작성한 후기</span>
        </button>
      </header>

      <section className="relative z-1 px-5">
        {reviewQuery.isLoading && <CommunityStateNotice title="후기를 불러오고 있어요." />}
        {(reviewQuery.isError || validCourseId == null) && (
          <CommunityStateNotice
            title="후기를 불러오지 못했어요."
            description="잠시 후 다시 시도해주세요."
          />
        )}

        {review && (
          <article className="rounded-xl bg-[#071ed8] p-4 shadow-[0_8px_18px_rgb(0_0_0/0.18)]">
            <div className="flex items-center gap-3">
              <img src={imageUrl} alt="" className="h-16 w-16 shrink-0 rounded-md object-cover" />
              <div className="min-w-0 flex-1">
                <h1 className="truncate text-base font-extrabold">
                  {course?.title ?? '여행 후기'}
                </h1>
                {course && (
                  <p className="mt-1 text-[10px] font-semibold text-white/60">{course.period}</p>
                )}
              </div>
            </div>

            <div className="mt-5 flex items-center gap-1 text-brand-lime">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Star
                  key={rating}
                  aria-hidden="true"
                  size={22}
                  fill={rating <= review.rating ? 'currentColor' : 'none'}
                  strokeWidth={1.8}
                />
              ))}
              <span className="ml-2 text-sm font-black">{review.rating.toFixed(1)} / 5.0</span>
            </div>

            {review.highlights.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {review.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="rounded-full bg-brand-lime px-2.5 py-1 text-[10px] font-black text-brand-blue"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            )}

            <p className="mt-5 whitespace-pre-line text-sm font-semibold leading-6 text-white/90">
              {review.comment || '남긴 한줄 후기가 없어요.'}
            </p>

            <div className="mt-5 rounded-lg bg-white/10 px-3 py-2 text-xs font-extrabold text-white/80">
              추천 의향 {review.recommendationScore} / 10
            </div>
          </article>
        )}
      </section>
    </main>
  )
}

export default MyReviewDetailPage
