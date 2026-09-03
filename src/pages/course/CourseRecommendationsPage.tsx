import { ChevronLeft, Pencil, RefreshCw } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import vectorDecoration from '../../assets/splash/Vector.svg'
import RecommendedCourseCard from '../../features/course/components/RecommendedCourseCard'
import {
  MOCK_COURSE_NAME_FALLBACK,
  MOCK_RECOMMENDED_COURSES,
} from '../../features/course/mocks/recommendedCourses'

interface RecommendationLocationState {
  courseName?: string
}

function CourseRecommendationsPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as RecommendationLocationState | null
  const courseName = state?.courseName?.trim() || MOCK_COURSE_NAME_FALLBACK

  return (
    // CourseCreatePage와 동일하게 Hero는 고정, 흰 Sheet 내부에서만 스크롤한다.
    // AppContainer의 Safe Area padding을 -mt/-mb로 상쇄하고 Hero/Sheet가 각각 직접 소유한다.
    <div className="relative -mt-[env(safe-area-inset-top)] -mb-[env(safe-area-inset-bottom)] flex h-app flex-col overflow-hidden">
      <div className="relative shrink-0 overflow-hidden bg-brand-blue">
        <img
          src={vectorDecoration}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 -top-10 w-[120%] max-w-none"
        />

        <div className="relative z-10 flex flex-col gap-3 px-6 py-12">
          <h1 className="whitespace-pre-line text-2xl font-bold leading-snug text-white">
            <button
              type="button"
              onClick={() => navigate(-1)}
              aria-label="뒤로 가기"
              className="mr-0.5 -ml-1 pb-1 inline-flex items-center justify-center rounded-full align-middle text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-lime"
            >
              <ChevronLeft aria-hidden="true" size={24} />
            </button>
            {'우리 가족을 위한\n맞춤 여행 코스를 완성했어요!'}
          </h1>
          <p className="text-xs text-brand-lime">
            가족 구성원의 취향을 분석해 오늘 가장 잘 맞는 코스를 추천했어요.
          </p>
        </div>
      </div>

      <div className="relative -mt-6 min-h-0 flex-1 overflow-y-auto rounded-t-card bg-white">
        <div className="flex flex-col gap-5 px-5 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-5">
          <div className="flex items-center justify-between px-2">
            <div className="flex min-w-0 items-center gap-1.5">
              <h2 className="truncate text-lg font-bold text-ink">{courseName}</h2>
              <Pencil aria-hidden="true" size={16} className="shrink-0 text-gray-400" />
            </div>

            {/* 재생성 API 미구현 — UI만 노출하고 비활성 처리한다 */}
            <button
              type="button"
              disabled
              aria-label="코스 다시 생성하기"
              className="flex h-9 shrink-0 cursor-not-allowed items-center justify-center rounded-full text-gray-300"
            >
              <RefreshCw aria-hidden="true" size={20} />
            </button>
          </div>

          {MOCK_RECOMMENDED_COURSES.map((course) => (
            <RecommendedCourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CourseRecommendationsPage
