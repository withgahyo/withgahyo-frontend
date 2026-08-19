import HomeHeader from '../../features/home/components/HomeHeader'
import HomeBanner from '../../features/home/components/HomeBanner'
import FamilyCourseSection from '../../features/home/components/FamilyCourseSection'
import FavoriteCourseSection from '../../features/home/components/FavoriteCourseSection'

function HomePage() {
  return (
    // AppContainer의 Safe Area(top) padding 안까지 Blue 배경이 이어지도록
    // 노치/Dynamic Island 영역까지 배경을 확장한다 (Splash/OnboardingComplete와 동일한 패턴).
    <div className="relative -mt-[env(safe-area-inset-top)] bg-brand-blue pt-[env(safe-area-inset-top)]">
      <HomeHeader />

      <div className="px-6 pt-4">
        <HomeBanner />
      </div>

      <FamilyCourseSection />
      <FavoriteCourseSection />
    </div>
  )
}

export default HomePage
