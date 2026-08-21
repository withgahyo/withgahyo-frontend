import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ROUTE_PATHS } from '../../../routes/routePaths'

interface CreateCourseCardProps {
  active: boolean
}

function CreateCourseCard({ active }: CreateCourseCardProps) {
  return (
    <Link
      to={ROUTE_PATHS.courseCreate}
      aria-label="새 가족 여행 코스 만들기"
      aria-hidden={!active}
      tabIndex={active ? undefined : -1}
      draggable={false}
      className={`flex h-full w-full items-center justify-center rounded-card border-2 border-brand-lime/10 bg-brand-lime/15 transition-transform active:scale-[0.98] ${
        active ? '' : 'pointer-events-none'
      }`}
    >
      <Plus aria-hidden="true" size={40} strokeWidth={2.5} className="text-brand-lime" />
    </Link>
  )
}

export default CreateCourseCard
