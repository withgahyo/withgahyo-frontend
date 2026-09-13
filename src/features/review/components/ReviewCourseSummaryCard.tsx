import { Link } from 'react-router-dom'
import courseDaejeon from '../../../assets/home/course-daejeon.jpeg'
import { ROUTE_PATHS } from '../../../routes/routePaths'

interface ReviewCourseSummaryCardProps {
  courseId: string
}

function ReviewCourseSummaryCard({ courseId }: ReviewCourseSummaryCardProps) {
  return (
    <section className="rounded-lg border border-ink/15 bg-white p-2.5 shadow-[0_3px_8px_rgb(20_20_43/0.05)]">
      <div className="flex items-center gap-3">
        <img
          src={courseDaejeon}
          alt=""
          className="h-15 w-15 shrink-0 rounded-md object-cover"
        />
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-sm font-extrabold text-ink">대전 가족여행</h2>
          <p className="mt-1 text-[10px] font-semibold text-ink/55">2026. 06. 22 ~ 06. 23</p>
        </div>
        <Link
          to={ROUTE_PATHS.courseDetail(courseId)}
          className="shrink-0 text-[10px] font-extrabold text-brand-blue"
        >
          여행 상세 보기 &gt;
        </Link>
      </div>
    </section>
  )
}

export default ReviewCourseSummaryCard
