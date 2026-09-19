import HomeHeader from '../../features/home/components/HomeHeader'
import HomeBanner from '../../features/home/components/HomeBanner'
import FamilyCourseSection from '../../features/home/components/FamilyCourseSection'
import { useHomeFamilyCourses } from '../../features/home/hooks/useHomeQueries'

function HomePage() {
  const {
    data: familyCourses,
    isLoading: isFamilyCoursesLoading,
    isError: isFamilyCoursesError,
  } = useHomeFamilyCourses()

  return (
    // AppContainer의 Safe Area(top) padding 안까지 Blue 배경이 이어지도록
    // 노치/Dynamic Island 영역까지 배경을 확장한다 (Splash/OnboardingComplete와 동일한 패턴).
    // 하단도 마찬가지로, BottomNavigation(fixed) 높이만큼을 이 페이지 자신의 padding으로
    // 갖고 있어야 스크롤을 끝까지 내려도 Blue 배경이 탭바 뒤까지 끊기지 않고 이어진다.
    // (4.5rem = BottomNavigation의 실제 바 높이, components/layout/BottomNavigation.tsx와 값을 맞출 것)
    <div className="relative -mt-[env(safe-area-inset-top)] bg-brand-blue pt-[env(safe-area-inset-top)] pb-[calc(4.5rem+env(safe-area-inset-bottom))]">
      <HomeHeader />

      <div className="px-6 pt-4">
        <HomeBanner />
      </div>

      <FamilyCourseSection
        courses={familyCourses}
        isLoading={isFamilyCoursesLoading}
        isError={isFamilyCoursesError}
      />
    </div>
  )
}

export default HomePage
