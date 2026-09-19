import type { PointerEvent, TransitionEvent } from 'react'
import { Fragment, useRef } from 'react'
import { Heart } from 'lucide-react'
import CoursePlaceItem from './CoursePlaceItem'
import { SHEET_SWIPE_THRESHOLD } from '../constants'
import type { CoursePlace, SheetState } from '../types'

interface CourseDetailSheetProps {
  places: CoursePlace[]
  courseTitle: string
  sheetState: SheetState
  selectedPlaceId: number | null
  onToggleSheet: () => void
  onSheetStateChange: (next: SheetState) => void
  onPlaceSelect: (id: number) => void
  onSheetTransitionEnd: () => void
  onWishlist?: () => void
  onConfirm?: () => void
  /** 확정 버튼 라벨. 기본값 '코스 확정하기' (후보 상세에서는 '이 코스로 확정' 등으로 덮어쓴다) */
  confirmLabel?: string
  /** 확정 요청 중이면 버튼을 잠근다 */
  isConfirmPending?: boolean
  /** 찜하기 버튼 숨김 (후보 상세 등 찜 개념이 없는 화면) */
  hideWishlist?: boolean
  /** 찜하기/확정 CTA 영역 전체를 숨김 (이미 확정된 최종 코스 상세) */
  hideActions?: boolean
}

function CourseDetailSheet({
  places,
  courseTitle,
  sheetState,
  selectedPlaceId,
  onToggleSheet,
  onSheetStateChange,
  onPlaceSelect,
  onSheetTransitionEnd,
  onWishlist,
  onConfirm,
  confirmLabel = '코스 확정하기',
  isConfirmPending = false,
  hideWishlist = false,
  hideActions = false,
}: CourseDetailSheetProps) {
  const sortedPlaces = [...places].sort((a, b) => a.order - b.order)
  const selectedPlace = sortedPlaces.find((place) => place.id === selectedPlaceId) ?? null

  // handle swipe/tap 제스처 — Sheet 전체가 아니라 handle 버튼에만 부착해 리스트 스크롤과 분리한다.
  const pointerStartYRef = useRef<number | null>(null)
  const swipeHandledRef = useRef(false)

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    // 포인터가 handle 밖으로 나가도 move/up 이벤트를 계속 받도록 캡처한다.
    event.currentTarget.setPointerCapture(event.pointerId)
    pointerStartYRef.current = event.clientY
    swipeHandledRef.current = false
  }

  const handlePointerUp = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    const startY = pointerStartYRef.current
    pointerStartYRef.current = null
    if (startY === null) return

    const deltaY = event.clientY - startY
    if (deltaY > SHEET_SWIPE_THRESHOLD) {
      swipeHandledRef.current = true
      onSheetStateChange('collapsed')
    } else if (deltaY < -SHEET_SWIPE_THRESHOLD) {
      swipeHandledRef.current = true
      onSheetStateChange('expanded')
    }
  }

  const handleHandleClick = () => {
    // swipe로 이미 상태를 바꿨으면 뒤이어 발생하는 click은 무시한다.
    if (swipeHandledRef.current) {
      swipeHandledRef.current = false
      return
    }
    onToggleSheet()
  }

  const handleTransitionEnd = (event: TransitionEvent<HTMLElement>) => {
    // 자식 요소(색상 transition 등)의 버블링은 무시하고 시트 자신의 이동만 처리한다.
    if (event.target !== event.currentTarget) return
    // Tailwind v4의 translate-y-* 는 `transform`이 아닌 개별 `translate` 속성을 애니메이션한다.
    if (event.propertyName !== 'translate' && event.propertyName !== 'transform') return
    onSheetTransitionEnd()
  }

  return (
    <section
      aria-label="코스 장소 목록"
      data-state={sheetState}
      onTransitionEnd={handleTransitionEnd}
      className="group/sheet absolute inset-x-0 bottom-0 z-10 flex h-[62%] flex-col rounded-t-card bg-white shadow-[0_-4px_24px_-10px_rgba(20,20,43,0.18)] transition-transform duration-300 ease-out will-change-transform data-[state=collapsed]:translate-y-[calc(100%-7.5rem-env(safe-area-inset-bottom))] motion-reduce:transition-none"
    >
      <button
        type="button"
        aria-label={sheetState === 'expanded' ? '지도 크게 보기' : '장소 목록 펼치기'}
        aria-expanded={sheetState === 'expanded'}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          pointerStartYRef.current = null
        }}
        onClick={handleHandleClick}
        className="flex w-full shrink-0 touch-none flex-col items-center gap-1 px-5 pt-2.5 pb-2 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-blue"
      >
        <span aria-hidden="true" className="h-1 w-10 rounded-full bg-gray-300" />
      </button>

      {/* collapsed 상태 요약 — expanded에서는 숨긴다 */}
      <div className="shrink-0 px-5 pb-[calc(0.5rem+env(safe-area-inset-bottom))] group-data-[state=expanded]/sheet:hidden">
        <p className="truncate text-base font-bold text-ink">
          {selectedPlace ? selectedPlace.name : courseTitle}
        </p>
        <p className="text-caption text-gray-400">
          {selectedPlace ? '지도에서 확인 중' : `${sortedPlaces.length}개의 장소`}
        </p>
      </div>

      {/* 장소 목록 — 이 영역만 세로 스크롤된다. collapsed에서는 숨긴다 */}
      <ol className="min-h-0 flex-1 overflow-y-auto px-5 pt-3 pb-4 group-data-[state=collapsed]/sheet:hidden">
        {sortedPlaces.map((place, index) => {
          const previousDay = index > 0 ? sortedPlaces[index - 1].day : undefined
          const nextDay =
            index < sortedPlaces.length - 1 ? sortedPlaces[index + 1].day : undefined
          // day 값은 최종 상세/후보 상세 응답에만 있다. 없으면 헤더 없이 평면 리스트로 렌더한다.
          const showDayHeader = place.day != null && place.day !== previousDay
          const isDayStart = index === 0 || showDayHeader
          const isDayEnd = index === sortedPlaces.length - 1 || (place.day != null && place.day !== nextDay)

          return (
            <Fragment key={place.id}>
              {showDayHeader && (
                <li className="pt-3 pb-1 first:pt-0">
                  <span className="text-caption font-bold text-brand-blue">Day {place.day}</span>
                </li>
              )}
              <CoursePlaceItem
                place={place}
                isFirst={isDayStart}
                isLast={isDayEnd}
                isSelected={place.id === selectedPlaceId}
                onSelect={onPlaceSelect}
              />
            </Fragment>
          )
        })}
      </ol>

      {/* CTA — expanded에서만 노출, 목록을 스크롤해도 하단 고정. 이미 확정된 코스는 hideActions로 전체 숨김 */}
      {!hideActions && (
        <div className="flex shrink-0 gap-2 border-t border-gray-100 px-5 pt-3 pb-[calc(1rem+env(safe-area-inset-bottom))] group-data-[state=collapsed]/sheet:hidden">
          {!hideWishlist && (
            <button
              type="button"
              onClick={onWishlist}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-brand-lime py-3.5 text-sm font-semibold text-brand-blue transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            >
              <Heart aria-hidden="true" size={16} strokeWidth={2.5} />
              코스 찜하기
            </button>
          )}
          <button
            type="button"
            onClick={onConfirm}
            disabled={isConfirmPending}
            aria-disabled={isConfirmPending}
            className={`flex-1 rounded-full py-3.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${
              isConfirmPending
                ? 'cursor-not-allowed bg-gray-200 text-gray-400'
                : 'bg-brand-blue text-brand-lime'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      )}
    </section>
  )
}

export default CourseDetailSheet
