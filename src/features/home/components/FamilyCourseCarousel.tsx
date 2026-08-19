import { useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import CreateCourseCard from './CreateCourseCard'
import FamilyCourseCard from './FamilyCourseCard'
import type { FamilyCourse } from '../types'

interface FamilyCourseCarouselProps {
  courses: FamilyCourse[]
}

type CarouselItem = { type: 'course'; course: FamilyCourse } | { type: 'create' }

const SWIPE_THRESHOLD_PX = 48
const DRAG_CAPTURE_THRESHOLD_PX = 8
const NEIGHBOR_TRANSLATE_PERCENT = 92
const NEIGHBOR_ROTATE_DEG = 6
const NEIGHBOR_SCALE = 0.88

// 순환 캐러셀에서 반대편 끝으로 이동할 때도 최단 경로로 offset을 계산해
// "화면을 가로지르는" 어색한 transition 없이 자연스럽게 이어지도록 한다.
function getShortestOffset(index: number, activeIndex: number, total: number) {
  let offset = index - activeIndex
  if (offset > total / 2) offset -= total
  if (offset < -total / 2) offset += total
  return offset
}

function FamilyCourseCarousel({ courses }: FamilyCourseCarouselProps) {
  const items: CarouselItem[] = [
    ...courses.map((course) => ({ type: 'course' as const, course })),
    { type: 'create' as const },
  ]
  const total = items.length

  const [activeIndex, setActiveIndex] = useState(0)
  const pointerStartX = useRef<number | null>(null)
  const pointerDeltaX = useRef(0)
  const isDragCaptured = useRef(false)

  const goTo = (nextIndex: number) => {
    setActiveIndex(((nextIndex % total) + total) % total)
  }

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    pointerStartX.current = event.clientX
    pointerDeltaX.current = 0
    isDragCaptured.current = false
  }

  // 실제로 drag로 판단될 만큼(threshold 이상) 움직였을 때만 pointer capture를 건다.
  // 처음부터 capture를 걸면 단순 탭(클릭)도 활성 카드의 Link가 아닌 이 컨테이너로
  // click이 재타깃되어, 카드가 전혀 클릭되지 않는 문제가 생긴다 (실제 스와이프/클릭
  // 동작 확인 중 발견). threshold를 넘겨야 capture하므로, 짧은 탭은 Link 클릭이
  // 정상적으로 통과하고, 실제 드래그일 때만 컨테이너가 포인터를 가로채 스와이프
  // 이후 원치 않는 click(드래그 후 발생하는 네이티브 click)까지 함께 방지된다.
  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerStartX.current === null) return
    pointerDeltaX.current = event.clientX - pointerStartX.current

    if (!isDragCaptured.current && Math.abs(pointerDeltaX.current) > DRAG_CAPTURE_THRESHOLD_PX) {
      isDragCaptured.current = true
      event.currentTarget.setPointerCapture(event.pointerId)
    }
  }

  const handlePointerUp = () => {
    if (pointerStartX.current === null) return
    const delta = pointerDeltaX.current
    if (delta <= -SWIPE_THRESHOLD_PX) goTo(activeIndex + 1)
    else if (delta >= SWIPE_THRESHOLD_PX) goTo(activeIndex - 1)
    pointerStartX.current = null
    pointerDeltaX.current = 0
    isDragCaptured.current = false
  }

  return (
    <div>
      <div
        role="region"
        aria-label="가족 여행 코스"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="select-none overflow-hidden py-2"
        style={{ touchAction: 'pan-y' }}
      >
        <div className="relative mx-auto h-90 w-62.5">
          {items.map((item, index) => {
            const offset = getShortestOffset(index, activeIndex, total)
            const isActive = offset === 0
            const isVisible = Math.abs(offset) <= 1
            const clampedOffset = Math.sign(offset) * Math.min(Math.abs(offset), 1)

            return (
              <div
                key={item.type === 'course' ? item.course.id : 'create'}
                className="absolute inset-0 transition-[transform,opacity] duration-300 ease-out motion-reduce:duration-0"
                style={{
                  transform: `translateX(${clampedOffset * NEIGHBOR_TRANSLATE_PERCENT}%) rotate(${clampedOffset * NEIGHBOR_ROTATE_DEG}deg) scale(${isActive ? 1 : NEIGHBOR_SCALE})`,
                  opacity: isVisible ? 1 : 0,
                  zIndex: isActive ? 30 : 10,
                }}
              >
                {item.type === 'course' ? (
                  <FamilyCourseCard course={item.course} active={isActive} />
                ) : (
                  <CreateCourseCard active={isActive} />
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div aria-hidden="true" className="flex items-center justify-center gap-1.5 pt-3">
        {items.map((_, index) => (
          <span
            key={index}
            className={`h-1.5 w-1.5 rounded-full transition-colors motion-reduce:transition-none ${
              index === activeIndex ? 'bg-brand-lime' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default FamilyCourseCarousel
