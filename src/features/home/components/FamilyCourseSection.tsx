import FamilyCourseCarousel from './FamilyCourseCarousel'
import { MOCK_FAMILY_COURSES } from '../mock'

function FamilyCourseSection() {
  return (
    <section className="pt-6">
      <h2 className="whitespace-pre-line px-6 text-xl font-bold leading-snug text-white">
        {'가족과 함께할\n여행을 준비해볼까요?'}
      </h2>

      <div className="pt-4">
        <FamilyCourseCarousel courses={MOCK_FAMILY_COURSES} />
      </div>
    </section>
  )
}

export default FamilyCourseSection
