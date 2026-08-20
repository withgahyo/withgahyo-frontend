import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import FormSectionLabel from './FormSectionLabel'
import { getMonthMatrix, isDateInRange, isSameDay, isWeekend } from '../utils/calendarUtils'

interface TravelDateCalendarProps {
  startDate: Date | null
  endDate: Date | null
  onSelectDate: (date: Date) => void
}

const WEEKDAY_LABELS = ['일', '월', '화', '수', '목', '금', '토']

function TravelDateCalendar({ startDate, endDate, onSelectDate }: TravelDateCalendarProps) {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  const weeks = getMonthMatrix(viewYear, viewMonth)

  const goToPrevMonth = () => {
    if (viewMonth === 0) {
      setViewYear((year) => year - 1)
      setViewMonth(11)
    } else {
      setViewMonth((month) => month - 1)
    }
  }

  const goToNextMonth = () => {
    if (viewMonth === 11) {
      setViewYear((year) => year + 1)
      setViewMonth(0)
    } else {
      setViewMonth((month) => month + 1)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <FormSectionLabel>여행 일시</FormSectionLabel>

      <div>
        <div className="flex items-center justify-center gap-6 py-2">
          <button
            type="button"
            onClick={goToPrevMonth}
            aria-label="이전 달"
            className="flex h-8 w-8 items-center justify-center rounded-full text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          >
            <ChevronLeft aria-hidden="true" size={20} />
          </button>
          <span className="rounded-full border border-gray-200 px-5 py-2 text-sm font-semibold text-ink">
            {viewYear}년 {viewMonth + 1}월
          </span>
          <button
            type="button"
            onClick={goToNextMonth}
            aria-label="다음 달"
            className="flex h-8 w-8 items-center justify-center rounded-full text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          >
            <ChevronRight aria-hidden="true" size={20} />
          </button>
        </div>

        <div className="grid grid-cols-7 pb-1 text-center text-sm font-semibold">
          {WEEKDAY_LABELS.map((label, index) => (
            <span
              key={label}
              className={index === 0 || index === 6 ? 'text-red-500' : 'text-ink'}
            >
              {label}
            </span>
          ))}
        </div>

        <div className="flex flex-col">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7">
              {week.map((cell, cellIndex) => {
                if (!cell) return <div key={cellIndex} />

                const { date } = cell
                const isStart = isSameDay(date, startDate)
                const isEnd = isSameDay(date, endDate)
                const isSelected = isStart || isEnd
                const isInRange = isDateInRange(date, startDate, endDate)

                return (
                  <div key={cellIndex} className="flex items-center justify-center py-1">
                    <button
                      type="button"
                      onClick={() => onSelectDate(date)}
                      aria-pressed={isSelected}
                      aria-label={`${viewMonth + 1}월 ${date.getDate()}일`}
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                        isSelected
                          ? 'bg-brand-lime text-ink'
                          : isInRange
                            ? 'bg-brand-lime/25 text-ink'
                            : isWeekend(date)
                              ? 'text-red-500'
                              : 'text-ink'
                      }`}
                    >
                      {date.getDate()}
                    </button>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TravelDateCalendar
