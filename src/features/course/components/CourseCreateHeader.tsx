import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import vectorDecoration from '../../../assets/splash/Vector.svg'

function CourseCreateHeader() {
  const navigate = useNavigate()

  return (
    <div className="relative shrink-0 overflow-hidden bg-brand-blue pt-6">
      <img
        src={vectorDecoration}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-10 w-[120%] max-w-none"
      />

      <div className="relative z-10 flex items-center px-3 pb-10 pt-[calc(env(safe-area-inset-top)+1.5rem)]">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="뒤로 가기"
          className="flex h-8 w-8 items-center justify-center rounded-full text-brand-lime focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-lime"
        >
          <ChevronLeft aria-hidden="true" size={26} />
        </button>
        <h1 className="text-heading font-bold text-brand-lime">코스 생성하기</h1>
      </div>
    </div>
  )
}

export default CourseCreateHeader
