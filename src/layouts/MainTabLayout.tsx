import { Outlet } from 'react-router-dom'
import BottomNavigation from '../components/layout/BottomNavigation'

function MainTabLayout() {
  return (
    <div className="flex min-h-full flex-col">
      <div className="flex-1 pb-16">
        <Outlet />
      </div>
      <BottomNavigation />
    </div>
  )
}

export default MainTabLayout
