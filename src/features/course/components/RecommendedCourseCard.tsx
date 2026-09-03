import { Heart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ROUTE_PATHS } from '../../../routes/routePaths'
import type { RecommendedCourse } from '../types'

interface RecommendedCourseCardProps {
  course: RecommendedCourse
}

function RecommendedCourseCard({ course }: RecommendedCourseCardProps) {
  const navigate = useNavigate()

  return (
    <article className="rounded-card border border-gray-100 bg-white p-4 shadow-[0_2px_16px_-8px_rgba(20,20,43,0.15)]">
      <div className="flex gap-3">
        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-gray-200">
          {course.imageUrl ? (
            <img
              src={course.imageUrl}
              alt={`${course.title} 대표 이미지`}
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <h3 className="text-base font-bold text-ink">{course.title}</h3>

          <ul className="flex flex-wrap gap-1.5">
            {course.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-brand-lime px-2 py-0.5 text-[11px] font-semibold text-ink"
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className="pt-1 text-caption text-gray-400">
            <p>
              총 이동 거리 <span className="font-bold">{course.totalDistanceKm}</span>km
            </p>
            <p>
              총 걷는 시간 <span className="font-bold">{course.totalDurationMinutes}</span>분
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => navigate(ROUTE_PATHS.courseDetail(course.id))}
          className="flex-1 whitespace-nowrap rounded-full border border-gray-300 px-1 py-2 text-xs font-semibold text-ink transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
        >
          자세히 보기
        </button>

        <button
          type="button"
          className="flex flex-1 items-center justify-center gap-1 whitespace-nowrap rounded-full bg-brand-lime px-1 py-2 text-xs font-semibold text-brand-blue transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
        >
          <Heart aria-hidden="true" size={14} strokeWidth={2.5} />
          찜하기
        </button>

        <button
          type="button"
          className="flex-1 whitespace-nowrap rounded-full bg-brand-blue px-1 py-2 text-xs font-semibold text-brand-lime transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
        >
          코스 확정하기
        </button>
      </div>
    </article>
  )
}

export default RecommendedCourseCard
