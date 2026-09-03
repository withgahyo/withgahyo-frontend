import { useCallback, useEffect, useRef } from 'react'
import { Maximize2 } from 'lucide-react'
import {
  COURSE_MAP_BOUNDS_PADDING,
  COURSE_MAP_COLLAPSED_BOTTOM_PADDING,
  COURSE_MAP_POLYLINE_COLOR,
  COURSE_MAP_POLYLINE_WEIGHT,
  COURSE_MAP_SELECTED_LEVEL,
  COURSE_MAP_SELECTED_RING,
} from '../constants'
import { useKakaoMapsSdk } from '../hooks/useKakaoMapsSdk'
import type { CoursePlace, SheetState } from '../types'

interface CourseMapProps {
  places: CoursePlace[]
  selectedPlaceId: number | null
  sheetState: SheetState
  /** 바텀시트가 expanded일 때 지도 하단이 가려지는 높이(px). setBounds 하단 패딩. */
  bottomPadding?: number
  /** 이 값이 바뀌면(시트 transition 종료 등) 카메라 동작을 실행한다. */
  cameraTick: number
  onShowFullCourse: () => void
}

function CourseMap({
  places,
  selectedPlaceId,
  sheetState,
  bottomPadding = 0,
  cameraTick,
  onShowFullCourse,
}: CourseMapProps) {
  const { status, error } = useKakaoMapsSdk()

  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<kakao.maps.Map | null>(null)
  const markersRef = useRef<Map<number, kakao.maps.Marker>>(new Map())
  const polylineRef = useRef<kakao.maps.Polyline | null>(null)
  const boundsRef = useRef<kakao.maps.LatLngBounds | null>(null)
  const selectedOverlayRef = useRef<kakao.maps.CustomOverlay | null>(null)
  const raisedMarkerIdRef = useRef<number | null>(null)

  // 렌더 중 ref를 쓰지 않도록, effect에서 참조하는 prop 값을 커밋 이후 ref에 동기화한다.
  // (selectedPlaceId는 카메라 effect의 dependency로 직접 쓰므로 ref가 필요 없다.)
  const sheetStateRef = useRef(sheetState)
  const bottomPaddingRef = useRef(bottomPadding)
  const placesRef = useRef(places)
  useEffect(() => {
    sheetStateRef.current = sheetState
    bottomPaddingRef.current = bottomPadding
    placesRef.current = places
  })

  const fitFullBounds = useCallback(() => {
    const map = mapRef.current
    const bounds = boundsRef.current
    if (!map || !bounds) return
    const bottom =
      sheetStateRef.current === 'expanded'
        ? bottomPaddingRef.current
        : COURSE_MAP_COLLAPSED_BOTTOM_PADDING
    map.setBounds(
      bounds,
      COURSE_MAP_BOUNDS_PADDING,
      COURSE_MAP_BOUNDS_PADDING,
      Math.max(bottom, COURSE_MAP_BOUNDS_PADDING),
      COURSE_MAP_BOUNDS_PADDING,
    )
  }, [])

  const showSelectedRing = useCallback((position: kakao.maps.LatLng) => {
    const map = mapRef.current
    if (!map) return
    if (!selectedOverlayRef.current) {
      const el = document.createElement('div')
      // 장식용 overlay — 클릭을 가로채지 않는다. 애니메이션 없음.
      el.style.cssText = [
        'width:34px',
        'height:34px',
        'box-sizing:border-box',
        'border-radius:9999px',
        `border:3px solid ${COURSE_MAP_SELECTED_RING.borderColor}`,
        `background:${COURSE_MAP_SELECTED_RING.fillColor}`,
        'pointer-events:none',
      ].join(';')
      selectedOverlayRef.current = new kakao.maps.CustomOverlay({
        content: el,
        position,
        xAnchor: 0.5,
        yAnchor: 0.5,
        zIndex: 1,
      })
    }
    selectedOverlayRef.current.setPosition(position)
    selectedOverlayRef.current.setMap(map)
  }, [])

  const hideSelectedRing = useCallback(() => {
    selectedOverlayRef.current?.setMap(null)
  }, [])

  const raiseMarker = useCallback((id: number | null) => {
    const prev = raisedMarkerIdRef.current
    if (prev !== null && prev !== id) {
      markersRef.current.get(prev)?.setZIndex(0)
    }
    if (id !== null) {
      markersRef.current.get(id)?.setZIndex(10)
    }
    raisedMarkerIdRef.current = id
  }, [])

  const clearOverlays = useCallback(() => {
    markersRef.current.forEach((marker) => marker.setMap(null))
    markersRef.current.clear()
    polylineRef.current?.setMap(null)
    polylineRef.current = null
    selectedOverlayRef.current?.setMap(null)
    raisedMarkerIdRef.current = null
  }, [])

  // --- 마커 / 폴리라인 / bounds 빌드 ---
  useEffect(() => {
    const container = containerRef.current
    if (status !== 'ready' || !container) return

    const sorted = [...places]
      .filter((place) => Number.isFinite(place.latitude) && Number.isFinite(place.longitude))
      .sort((a, b) => a.order - b.order)
    if (sorted.length === 0) return

    const positions = sorted.map(
      (place) => new kakao.maps.LatLng(place.latitude, place.longitude),
    )

    if (!mapRef.current) {
      mapRef.current = new kakao.maps.Map(container, { center: positions[0], level: 6 })
    }
    const map = mapRef.current

    // 이전 오버레이 정리 후 재생성 — 데이터 변경/StrictMode 재실행 시 중복 누적 방지.
    clearOverlays()

    sorted.forEach((place, index) => {
      const marker = new kakao.maps.Marker({ position: positions[index], map })
      markersRef.current.set(place.id, marker)
    })

    if (positions.length >= 2) {
      polylineRef.current = new kakao.maps.Polyline({
        map,
        path: positions,
        strokeWeight: COURSE_MAP_POLYLINE_WEIGHT,
        strokeColor: COURSE_MAP_POLYLINE_COLOR,
        strokeOpacity: 1,
        strokeStyle: 'solid',
      })
    }

    const bounds = new kakao.maps.LatLngBounds()
    positions.forEach((position) => bounds.extend(position))
    boundsRef.current = bounds

    // 최초 레이아웃이 잡힌 뒤 relayout + fit (회색 타일/여백 방지).
    const applyInitialFit = () => {
      map.relayout()
      fitFullBounds()
    }
    const rafId = window.requestAnimationFrame(applyInitialFit)
    window.addEventListener('resize', fitFullBounds)

    return () => {
      window.cancelAnimationFrame(rafId)
      window.removeEventListener('resize', fitFullBounds)
    }
  }, [status, places, clearOverlays, fitFullBounds])

  // --- 카메라: 장소 선택(selectedPlaceId) 또는 시트 transition 종료(cameraTick) 시 실행 ---
  // transitionend에만 의존하지 않는다 — 이미 collapsed인 상태에서 selectedPlaceId만
  // 바뀌면 transition이 없어도 focus가 실행되어야 한다.
  useEffect(() => {
    if (status !== 'ready' || !mapRef.current) return
    // 최초 idle 렌더의 fit은 마커 빌드 effect(rAF)가 담당하므로 건너뛴다.
    if (cameraTick === 0 && selectedPlaceId === null) return

    const map = mapRef.current
    map.relayout()

    if (selectedPlaceId === null) {
      // 전체 코스 보기 / 시트 토글
      fitFullBounds()
      hideSelectedRing()
      raiseMarker(null)
      return
    }

    // 선택 장소 focus
    const place = placesRef.current.find((item) => item.id === selectedPlaceId)
    if (!place) return
    const position = new kakao.maps.LatLng(place.latitude, place.longitude)
    map.setLevel(COURSE_MAP_SELECTED_LEVEL, { animate: true })
    map.panTo(position)
    showSelectedRing(position)
    raiseMarker(selectedPlaceId)
  }, [
    status,
    cameraTick,
    selectedPlaceId,
    fitFullBounds,
    hideSelectedRing,
    raiseMarker,
    showSelectedRing,
  ])

  // --- 언마운트 정리 ---
  useEffect(() => {
    return () => {
      clearOverlays()
      selectedOverlayRef.current = null
      boundsRef.current = null
      mapRef.current = null
    }
  }, [clearOverlays])

  return (
    <div className="relative h-full w-full bg-surface-muted">
      <div ref={containerRef} className="h-full w-full" />

      {status === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-surface-muted px-8 text-center">
          <p className="text-sm font-semibold text-ink">지도를 불러올 수 없어요</p>
          <p className="text-caption text-gray-400">
            {error?.message ?? '잠시 후 다시 시도해주세요.'}
          </p>
        </div>
      )}

      {status === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-caption text-gray-400">지도를 불러오는 중...</p>
        </div>
      )}

      {selectedPlaceId !== null && sheetState === 'collapsed' && (
        <button
          type="button"
          onClick={onShowFullCourse}
          className="absolute bottom-[calc(7.5rem+env(safe-area-inset-bottom)+0.75rem)] left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-white px-4 py-2 text-caption font-semibold text-brand-blue shadow-[0_4px_16px_-4px_rgba(20,20,43,0.25)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
        >
          <Maximize2 aria-hidden="true" size={13} className="shrink-0" />
          전체 코스 보기
        </button>
      )}
    </div>
  )
}

export default CourseMap
