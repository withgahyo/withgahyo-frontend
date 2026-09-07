import type { KeyboardEvent } from 'react'
import { Car, Clock, ExternalLink } from 'lucide-react'
import PlaceCategoryIcon from './PlaceCategoryIcon'
import { buildKakaoMapPlaceUrl } from '../utils/kakaoMapLink'
import type { CoursePlace } from '../types'

interface CoursePlaceItemProps {
  place: CoursePlace
  isFirst: boolean
  isLast: boolean
  isSelected: boolean
  onSelect: (id: number) => void
}

function CoursePlaceItem({ place, isFirst, isLast, isSelected, onSelect }: CoursePlaceItemProps) {
  const travelText =
    !isFirst && place.travelTimeFromPrevious
      ? `약 ${place.travelTimeFromPrevious}분 소요`
      : null

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onSelect(place.id)
    }
  }

  return (
    <li>
      {/* 직전 장소로부터의 이동 정보 (첫 장소 제외) */}
      {travelText && (
        <div className="grid grid-cols-[2.5rem_1fr] gap-x-3">
          <div className="flex justify-center">
            <span className="w-0 border-l-2 border-dashed border-gray-300" />
          </div>
          <p className="flex items-center gap-1.5 py-2.5 text-caption font-medium text-gray-500">
            <Car aria-hidden="true" size={14} className="shrink-0" />
            {travelText}
          </p>
        </div>
      )}

      {/* 장소 카드 */}
      <div className="grid grid-cols-[2.5rem_1fr] gap-x-3">
        <div className="flex flex-col items-center">
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-blue ${
              isSelected ? 'ring-2 ring-brand-lime ring-offset-1' : ''
            }`}
          >
            <PlaceCategoryIcon
              category={place.category}
              aria-hidden="true"
              size={20}
              className="text-brand-lime"
            />
          </span>
          {!isLast && <span className="w-0 flex-1 border-l-2 border-dashed border-gray-300" />}
        </div>

        <div className={isLast ? '' : 'pb-1'}>
          {/* 본문 클릭 → 지도에서 해당 장소 확대 */}
          <div
            role="button"
            tabIndex={0}
            aria-pressed={isSelected}
            onClick={() => onSelect(place.id)}
            onKeyDown={handleKeyDown}
            className={`-mx-2 cursor-pointer rounded-2xl px-2 py-1.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${
              isSelected ? 'bg-brand-blue/5 ring-1 ring-brand-blue/25' : ''
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-bold text-ink">{place.name}</h3>
                {place.address && (
                  <p className="mt-0.5 text-caption text-gray-500">{place.address}</p>
                )}
                {place.openingHours && (
                  <p className="mt-2 flex items-center gap-1 text-caption text-gray-400">
                    <Clock aria-hidden="true" size={12} className="shrink-0" />
                    {place.openingHours}
                  </p>
                )}
                {isSelected && (
                  <p className="mt-1 text-caption font-medium text-brand-blue">지도에서 보는 중</p>
                )}
              </div>

              <div className="h-18 w-18 shrink-0 overflow-hidden rounded-2xl bg-gray-100">
                {place.imageUrl ? (
                  <img
                    src={place.imageUrl}
                    alt={`${place.name} 사진`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center">
                    <PlaceCategoryIcon
                      category={place.category}
                      aria-hidden="true"
                      size={22}
                      className="text-gray-300"
                    />
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* 외부 카카오맵으로 열기 (본문 클릭과 다른 동작) */}
          <a
            href={buildKakaoMapPlaceUrl(place.name, place.latitude, place.longitude)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="mt-2 -ml-2 inline-flex items-center gap-1 rounded-full border border-gray-200 px-2.5 py-1 text-caption font-medium text-brand-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          >
            카카오맵에서 보기
            <ExternalLink aria-hidden="true" size={12} className="shrink-0" />
          </a>
        </div>
      </div>
    </li>
  )
}

export default CoursePlaceItem
