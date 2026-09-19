import FamilyCourseCarousel from './FamilyCourseCarousel'
import type { FamilyCourse } from '../types'

interface FamilyCourseSectionProps {
  courses?: FamilyCourse[]
  isLoading: boolean
  isError: boolean
}

function FamilyCourseSection({ courses, isLoading, isError }: FamilyCourseSectionProps) {
  return (
    <section className="pt-6">
      <h2 className="whitespace-pre-line px-6 text-xl font-bold leading-snug text-white">
        {'가족과 함께할\n여행을 준비해볼까요?'}
      </h2>

      <div className="pt-4">
        {isLoading ? (
          // 캐러셀과 동일한 크기의 placeholder로 로딩 완료 시 레이아웃이 튀지 않게 한다.
          <div className="mx-auto flex h-90 w-62.5 items-center justify-center">
            <p className="text-caption text-white/60">코스를 불러오는 중...</p>
          </div>
        ) : (
          <>
            {isError && (
              <p className="px-6 pb-2 text-xs text-white/70">여행 정보를 불러오지 못했어요.</p>
            )}
            {/* API 오류가 나도 courses를 빈 배열로 전달하면 캐러셀이 항상 붙이는
                "코스 만들기" 카드는 그대로 남아 새 코스 생성 진입은 막히지 않는다. */}
            <FamilyCourseCarousel courses={isError ? [] : (courses ?? [])} />
          </>
        )}
      </div>
    </section>
  )
}

export default FamilyCourseSection
