import { Link } from 'react-router-dom'
import type { BackNavigationState } from '../../course/backNavigation'
import { ROUTE_PATHS } from '../../../routes/routePaths'

interface ReviewWriteButtonProps {
  courseId: string
}

// 지난 여행(activeCourse.isPastTrip)에서만 노출되는 진입점. FamilyCourseCard의 Link(코스
// 상세 이동)와는 별도 DOM 영역이라 클릭 시 서로의 navigation이 섞이지 않는다.
// backTo를 Home으로 실어 보내, ReviewPage의 뒤로가기가 Community가 아니라 Home으로
// 돌아가도록 한다(기존 CourseDetail 등에서 쓰는 backTo state 패턴 재사용).
function ReviewWriteButton({ courseId }: ReviewWriteButtonProps) {
  return (
    <div className="flex justify-center px-6 pt-3">
      <Link
        to={ROUTE_PATHS.review(courseId)}
        state={{ backTo: ROUTE_PATHS.home } satisfies BackNavigationState}
        className="rounded-full bg-brand-lime px-4 py-2 text-xs font-bold text-ink"
      >
        후기 쓰기
      </Link>
    </div>
  )
}

export default ReviewWriteButton
