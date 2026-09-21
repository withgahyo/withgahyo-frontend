import type { TripSummary } from '../types'

interface TripSummaryHeaderProps {
  trip: TripSummary | null
}

function TripSummaryHeader({ trip }: TripSummaryHeaderProps) {
  return (
    <div className="px-6 pb-8 pt-4 text-white">
      <h1 className="text-heading font-bold">다가오는 여행 날씨</h1>

      {trip && (
        <div className="mt-5">
          <p className="text-xs font-semibold text-white/65">{trip.courseTitle}</p>
          <div className="mt-2.5 flex items-end justify-between gap-3">
            <div>
              <p className="text-lg font-bold">{trip.regionName}</p>
              <p className="mt-1 text-sm text-white/80">{trip.dateRangeLabel}</p>
            </div>
            <span className="shrink-0 rounded-full bg-white/15 px-3 py-1 text-sm font-semibold text-brand-lime">
              {trip.dDay}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default TripSummaryHeader
