import { ChevronRight } from 'lucide-react'
import FavoriteCourseCard from './FavoriteCourseCard'
import { MOCK_FAVORITE_COURSES } from '../mock'

function FavoriteCourseSection() {
  return (
    <section className="px-6 pb-10 pt-8">
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-lg font-bold text-white">찜한 코스</h2>

        {/* TODO: 찜한 코스 목록 라우트가 정의되면 Link로 교체 */}
        <span className="flex items-center gap-0.5 text-sm font-semibold text-brand-lime">
          더보기
          <ChevronRight aria-hidden="true" size={16} />
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {MOCK_FAVORITE_COURSES.map((course) => (
          <FavoriteCourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  )
}

export default FavoriteCourseSection
