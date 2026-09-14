import { useEffect, useRef, useState } from 'react'
import {
  Accessibility,
  CalendarDays,
  Heart,
  MapPinCheck,
  Route,
  Utensils,
  type LucideIcon,
} from 'lucide-react'

interface GenerationTip {
  icon: LucideIcon
  description: string
}

// 같이가효 실제 추천 방식을 소개하는 팁. 순서대로 순환 노출한다.
const GENERATION_TIPS: GenerationTip[] = [
  {
    icon: Accessibility,
    description: '가족 중 이동이 가장 힘든 분을 기준으로\n도보량과 휴식 시간을 고려해요.',
  },
  {
    icon: Heart,
    description: '가족이 함께 좋아하는 취향을 찾아\n코스에 우선적으로 반영해요.',
  },
  {
    icon: Utensils,
    description: '맛집과 카페가 연이어 나오지 않도록\n관광지와 균형 있게 배치해요.',
  },
  {
    icon: CalendarDays,
    description: '여러 날의 여행이라면 특정 장소가 몰리지 않도록\n날짜별로 골고루 나눠요.',
  },
  {
    icon: MapPinCheck,
    description: '꼭 가고 싶은 장소가 있다면\n빠짐없이 여행 코스에 포함해요.',
  },
  {
    icon: Route,
    description:
      '실제 관광 데이터를 바탕으로 이동거리를 고려해\n더 자연스러운 여행 동선을 만들어요.',
  },
]

const TIP_INTERVAL_MS = 3500
const TIP_FADE_MS = 300

// 생성 중 화면 보조 정보. 3.5초마다 다음 팁으로 opacity fade 전환하며 마지막 다음엔 처음으로 돌아간다.
// 핵심 상태(progress/currentStage)와는 무관한 정보라 스크린리더 알림은 방해하지 않도록 aria-hidden 처리한다.
function CourseGenerationTips() {
  const [tipIndex, setTipIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const fadeTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setVisible(false)
      fadeTimeoutRef.current = window.setTimeout(() => {
        setTipIndex((prev) => (prev + 1) % GENERATION_TIPS.length)
        setVisible(true)
      }, TIP_FADE_MS)
    }, TIP_INTERVAL_MS)

    return () => {
      window.clearInterval(intervalId)
      if (fadeTimeoutRef.current != null) window.clearTimeout(fadeTimeoutRef.current)
    }
  }, [])

  const tip = GENERATION_TIPS[tipIndex]
  const TipIcon = tip.icon

  return (
    <div aria-hidden="true" className="w-full max-w-[280px] border-t border-white/15 pt-4">
      <div
        className={`flex flex-col items-center gap-1.5 text-center transition-opacity duration-300 ease-in-out motion-reduce:transition-none ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <TipIcon aria-hidden="true" size={20} className="text-brand-lime/80" />
        <p className="text-[11px] font-semibold text-brand-lime/80">알고 계셨나요?</p>
        <p className="whitespace-pre-line text-xs leading-relaxed text-white/80">
          {tip.description}
        </p>
      </div>
    </div>
  )
}

export default CourseGenerationTips
