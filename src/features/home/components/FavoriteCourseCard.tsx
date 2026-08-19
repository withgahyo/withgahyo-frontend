import { Link } from 'react-router-dom'
import { ROUTE_PATHS } from '../../../routes/routePaths'
import type { FavoriteCourse } from '../types'

interface FavoriteCourseCardProps {
  course: FavoriteCourse
}

function FavoriteCourseCard({ course }: FavoriteCourseCardProps) {
  return (
    <Link
      to={ROUTE_PATHS.courseDetail(course.id)}
      className="flex items-center gap-4 rounded-card bg-white/80 p-3"
    >
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-gray-200">
        {course.imageUrl && (
          <img src={course.imageUrl} alt="" className="h-full w-full object-cover" />
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="w-fit rounded-full bg-brand-blue/10 px-2 py-0.5 text-[11px] font-semibold text-brand-blue">
          {course.region}
        </span>
        <p className="text-sm font-bold text-ink">{course.title}</p>
      </div>
    </Link>
  )
}

export default FavoriteCourseCard
