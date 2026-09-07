import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ChevronLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import CourseDetailSheet from '../../features/course/components/CourseDetailSheet'
import CourseMap from '../../features/course/components/CourseMap'
import { getCourseDetailView } from '../../features/course/api/getCourseDetailView'
import type { SheetState } from '../../features/course/types'

// 바텀시트가 expanded일 때 지도의 아래쪽 약 62%를 덮으므로, 그만큼을 지도 setBounds
// 하단 패딩으로 넘겨 모든 마커가 시트 위 영역에 보이도록 한다.
const SHEET_RATIO = 0.62

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function CourseDetailPage() {
  const navigate = useNavigate()
  const { courseId } = useParams<{ courseId: string }>()

  const {
    data: course,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['courses', courseId],
    queryFn: () => getCourseDetailView(courseId as string),
    enabled: Boolean(courseId),
  })

  const [sheetState, setSheetState] = useState<SheetState>('expanded')
  const [selectedPlaceId, setSelectedPlaceId] = useState<number | null>(null)
  // 값이 바뀔 때 CourseMap이 카메라 동작을 실행한다. 시트 transition 종료 시점에 올린다.
  const [cameraTick, setCameraTick] = useState(0)

  const bumpCamera = () => setCameraTick((tick) => tick + 1)

  const handleBack = () => navigate(-1)

  // TODO: 코스 찜하기 API 연동
  const handleWishlist = () => {}
  // TODO: 코스 확정 API 연동
  const handleConfirm = () => {}

  const changeSheetState = (next: SheetState) => {
    if (sheetState === next) return
    setSheetState(next)
    // 애니메이션이 없으면 transitionend가 오지 않으므로 즉시 카메라를 갱신한다.
    if (prefersReducedMotion()) bumpCamera()
  }

  const handleToggleSheet = () => {
    changeSheetState(sheetState === 'expanded' ? 'collapsed' : 'expanded')
  }

  const handlePlaceSelect = (id: number) => {
    setSelectedPlaceId(id)
    if (sheetState === 'expanded') {
      changeSheetState('collapsed') // transition 종료 후 카메라가 해당 장소로 이동
    } else {
      bumpCamera() // 이미 collapsed → 바로 이동
    }
  }

  const handleShowFullCourse = () => {
    setSelectedPlaceId(null)
    bumpCamera() // 시트는 collapsed 유지, 전체 bounds로 복귀
  }

  const mapBottomPadding =
    typeof window !== 'undefined' ? Math.round(window.innerHeight * SHEET_RATIO) : 0

  return (
    <div className="relative -mt-[env(safe-area-inset-top)] -mb-[env(safe-area-inset-bottom)] flex h-app flex-col overflow-hidden bg-surface-muted">
      <button
        type="button"
        onClick={handleBack}
        aria-label="뒤로 가기"
        className="absolute left-3 top-[calc(env(safe-area-inset-top)+0.75rem)] z-20 flex h-10 w-10 items-center justify-center text-gray-500"
      >
        <ChevronLeft aria-hidden="true" size={30} />
      </button>

      {!courseId || isError ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
          <p className="text-base font-semibold text-ink">코스를 불러올 수 없어요</p>
          <p className="text-caption text-gray-400">잠시 후 다시 시도해주세요.</p>
          <button
            type="button"
            onClick={handleBack}
            className="mt-2 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white"
          >
            돌아가기
          </button>
        </div>
      ) : isLoading || !course ? (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-caption text-gray-400">코스를 불러오는 중...</p>
        </div>
      ) : (
        <>
          <div className="absolute inset-0">
            <CourseMap
              places={course.places}
              selectedPlaceId={selectedPlaceId}
              sheetState={sheetState}
              bottomPadding={mapBottomPadding}
              cameraTick={cameraTick}
              onShowFullCourse={handleShowFullCourse}
            />
          </div>
          <CourseDetailSheet
            places={course.places}
            courseTitle={course.title}
            sheetState={sheetState}
            selectedPlaceId={selectedPlaceId}
            onToggleSheet={handleToggleSheet}
            onSheetStateChange={changeSheetState}
            onPlaceSelect={handlePlaceSelect}
            onSheetTransitionEnd={bumpCamera}
            onWishlist={handleWishlist}
            onConfirm={handleConfirm}
          />
        </>
      )}
    </div>
  )
}

export default CourseDetailPage
