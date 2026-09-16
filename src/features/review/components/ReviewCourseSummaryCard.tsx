import { Link } from 'react-router-dom'
import { resolveApiAssetUrl } from '../../../api/assetUrl'
import type { PendingReviewItemResponse } from '../../../api/review'
import courseDaejeon from '../../../assets/home/course-daejeon.jpeg'
import { ROUTE_PATHS } from '../../../routes/routePaths'

interface ReviewCourseSummaryCardProps {
  course: PendingReviewItemResponse
}

function ReviewCourseSummaryCard({ course }: ReviewCourseSummaryCardProps) {
  const imageUrl = resolveApiAssetUrl(course.imageUrl) ?? courseDaejeon

  return (
    <section className="rounded-lg border border-ink/15 bg-white p-2.5 shadow-[0_3px_8px_rgb(20_20_43/0.05)]">
      <div className="flex items-center gap-3">
        <img src={imageUrl} alt="" className="h-15 w-15 shrink-0 rounded-md object-cover" />
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-sm font-extrabold text-ink">{course.title}</h2>
          <p className="mt-1 text-[10px] font-semibold text-ink/55">{course.period}</p>
        </div>
        <Link
          to={ROUTE_PATHS.courseDetail(String(course.courseId))}
          className="shrink-0 text-[10px] font-extrabold text-brand-blue"
        >
          여행 상세 보기 &gt;
        </Link>
      </div>
    </section>
  )
}

export default ReviewCourseSummaryCard
