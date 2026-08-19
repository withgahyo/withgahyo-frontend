import { Forward } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ROUTE_PATHS } from '../../../routes/routePaths'
import type { FamilyCourse } from '../types'

interface FamilyCourseCardProps {
  course: FamilyCourse
  active: boolean
}

function FamilyCourseCard({ course, active }: FamilyCourseCardProps) {
  return (
    <Link
      to={ROUTE_PATHS.courseDetail(course.id)}
      aria-hidden={!active}
      tabIndex={active ? undefined : -1}
      draggable={false}
      className={`relative flex h-full w-full flex-col overflow-hidden rounded-card bg-ink/10 ${
        active ? '' : 'pointer-events-none'
      }`}
    >
      {course.imageUrl ? (
        <img src={course.imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <div className="absolute inset-0 bg-linear-to-br from-brand-blue/40 to-ink/60" />
      )}

      {/* 실제 사진 위에서도 텍스트 대비가 유지되도록 상/하단에 은은한 vignette를 깐다 */}
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/50" />

      <div className="relative flex flex-1 flex-col p-5 text-white">
        <div className="flex items-start justify-between gap-2">
          <p className="text-xs font-medium text-white/85">{course.title}</p>
          {/* TODO: 공유 기능 정의되면 실제 버튼으로 교체 */}
          <Forward aria-hidden="true" size={20} className="shrink-0 text-white" />
        </div>

        <p className="pt-0.5 text-2xl font-bold">{course.region}</p>

        {(course.dDay || course.date) && (
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {course.dDay && (
              <span className="rounded-full bg-brand-lime/80 px-2.5 py-1 text-xs font-bold text-ink">
                {course.dDay}
              </span>
            )}
            {course.date && <span className="text-xs font-medium">{course.date}</span>}
          </div>
        )}

        <div className="flex-1" />

        {course.tags.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {course.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-brand-lime/70 px-2.5 py-1 text-xs font-semibold text-ink"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Link>
  )
}

export default FamilyCourseCard
