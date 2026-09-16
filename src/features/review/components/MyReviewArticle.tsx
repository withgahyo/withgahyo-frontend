import { Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { resolveApiAssetUrl } from '../../../api/assetUrl'
import type { PendingReviewItemResponse, ReviewResponse } from '../../../api/review'
import courseDaejeon from '../../../assets/home/course-daejeon.jpeg'
import { ROUTE_PATHS } from '../../../routes/routePaths'

interface MyReviewArticleProps {
  review: ReviewResponse
  course: PendingReviewItemResponse
  recommendationMax: number
  courseBackTo?: string
}

function MyReviewArticle({
  review,
  course,
  recommendationMax,
  courseBackTo,
}: MyReviewArticleProps) {
  const imageUrl = resolveApiAssetUrl(course.imageUrl) ?? courseDaejeon
  const recommendationRate =
    recommendationMax > 0 ? Math.min(100, (review.recommendationScore / recommendationMax) * 100) : 0

  return (
    <article className="rounded-2xl bg-[#071ed8] p-4 shadow-[0_10px_24px_rgb(0_0_0/0.18)]">
      <div className="flex items-center gap-3 rounded-xl bg-white/10 p-3">
        <img src={imageUrl} alt="" className="h-16 w-16 shrink-0 rounded-lg object-cover" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-black">{course.title}</p>
          <p className="mt-1 text-xs font-bold text-white/70">{course.period}</p>
        </div>
        <Link
          to={ROUTE_PATHS.courseDetail(String(course.courseId))}
          state={courseBackTo ? { backTo: courseBackTo } : undefined}
          className="shrink-0 rounded-full bg-brand-lime px-3 py-1.5 text-[10px] font-black text-brand-blue"
        >
          코스 보기
        </Link>
      </div>

      <div className="mt-5 rounded-xl bg-white/[0.08] p-3">
        <p className="text-xs font-extrabold text-white/72">만족도</p>
        <div
          className="mt-2 flex items-center gap-2 text-brand-lime"
          aria-label={`별점 ${review.rating}점`}
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              size={24}
              fill="currentColor"
              strokeWidth={0}
              className={index < Math.round(review.rating) ? '' : 'text-white/25'}
            />
          ))}
          <span className="ml-auto text-sm font-black text-white">
            {review.rating.toFixed(1)} / 5.0
          </span>
        </div>
      </div>

      {review.highlights.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {review.highlights.map((highlight) => (
            <span
              key={highlight}
              className="rounded-full bg-white/16 px-3 py-1.5 text-xs font-extrabold text-white"
            >
              # {highlight}
            </span>
          ))}
        </div>
      )}

      <section className="mt-5 rounded-xl border border-white/10 bg-white/[0.08] px-4 py-4">
        <h2 className="text-xs font-extrabold text-white/62">작성한 후기</h2>
        <p className="mt-2.5 whitespace-pre-line text-[15px] font-bold leading-6 text-white/92">
          {review.comment || '남긴 한줄 후기가 없어요.'}
        </p>
      </section>

      <div className="mt-4 rounded-xl bg-white/10 px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-white/70">추천 의향</span>
          <span className="text-sm font-black text-brand-lime">
            {review.recommendationScore} / {recommendationMax}
          </span>
        </div>
        <div className="mt-3 h-2 rounded-full bg-white/[0.18]">
          <div
            className="h-full rounded-full bg-brand-lime"
            style={{ width: `${recommendationRate}%` }}
          />
        </div>
      </div>
    </article>
  )
}

export default MyReviewArticle
