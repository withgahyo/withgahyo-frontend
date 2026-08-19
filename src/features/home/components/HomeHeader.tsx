import { Bell } from 'lucide-react'
import { Link } from 'react-router-dom'
import logoLime from '../../../assets/splash/splash-logo-lime.svg'
import { ROUTE_PATHS } from '../../../routes/routePaths'

function HomeHeader() {
  return (
    <header className="flex items-center justify-between px-6 pt-4">
      <img src={logoLime} alt="같이가효" className="h-8 w-auto" />

      <Link
        to={ROUTE_PATHS.notifications}
        aria-label="알림"
        className="relative flex h-9 w-9 items-center justify-center"
      >
        <Bell aria-hidden="true" className="text-white" size={22} />
        <span
          aria-hidden="true"
          className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500"
        />
      </Link>
    </header>
  )
}

export default HomeHeader
