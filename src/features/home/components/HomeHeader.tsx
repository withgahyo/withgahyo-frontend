import { Bell } from 'lucide-react'
import logoLime from '../../../assets/splash/splash-logo-lime.svg'

function HomeHeader() {
  return (
    <header className="flex items-center justify-between px-6 pt-5">
      <img src={logoLime} alt="같이가효" className="h-9 w-auto" />

      {/* 알림 페이지가 아직 준비되지 않아 임시로 클릭을 막아둔다. 페이지가 준비되면 Link로 되돌린다. */}
      <button
        type="button"
        disabled
        aria-label="알림"
        className="relative flex h-9 w-9 cursor-not-allowed items-center justify-center"
      >
        <Bell aria-hidden="true" className="text-white" size={22} />
        <span
          aria-hidden="true"
          className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500"
        />
      </button>
    </header>
  )
}

export default HomeHeader
