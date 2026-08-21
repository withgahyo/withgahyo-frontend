import { useState } from 'react'
import PrimaryButton from '../../components/common/PrimaryButton'
import CourseCreateHeader from '../../features/course/components/CourseCreateHeader'
import CourseNameField from '../../features/course/components/CourseNameField'
import RegionSelectField from '../../features/course/components/RegionSelectField'
import KeywordSelectSection from '../../features/course/components/KeywordSelectSection'
import PreferredPlaceSection from '../../features/course/components/PreferredPlaceSection'
import TravelDateCalendar from '../../features/course/components/TravelDateCalendar'
import FamilyMemberSelector from '../../features/course/components/FamilyMemberSelector'
import { isSameDay } from '../../features/course/utils/calendarUtils'
import { isCourseNameValid } from '../../features/course/utils/validateCourseName'
import type { CourseCreateFormState, PlaceOption, RegionOption } from '../../features/course/types'

const INITIAL_FORM_STATE: CourseCreateFormState = {
  courseName: '',
  region: null,
  keywordIds: [],
  preferredPlaces: [],
  startDate: null,
  endDate: null,
  // '나'는 당연히 함께 가는 구성원이라 기본으로 선택해 둔다.
  familyMemberIds: ['me'],
}

function toggleId(ids: string[], id: string) {
  return ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id]
}

function CourseCreatePage() {
  const [form, setForm] = useState<CourseCreateFormState>(INITIAL_FORM_STATE)

  const handleSelectDate = (date: Date) => {
    setForm((prev) => {
      const { startDate, endDate } = prev

      if (!startDate) return { ...prev, startDate: date, endDate: null }

      if (!endDate) {
        if (isSameDay(date, startDate)) return { ...prev, endDate: date }
        if (date.getTime() < startDate.getTime()) {
          return { ...prev, startDate: date, endDate: startDate }
        }
        return { ...prev, endDate: date }
      }

      return { ...prev, startDate: date, endDate: null }
    })
  }

  const handleSelectRegion = (region: RegionOption) => {
    setForm((prev) =>
      prev.region?.id === region.id ? prev : { ...prev, region, preferredPlaces: [] },
    )
  }

  const handleAddPlace = (place: PlaceOption) => {
    setForm((prev) =>
      prev.preferredPlaces.some((item) => item.id === place.id)
        ? prev
        : { ...prev, preferredPlaces: [...prev.preferredPlaces, place] },
    )
  }

  const handleRemovePlace = (id: string) => {
    setForm((prev) => ({
      ...prev,
      preferredPlaces: prev.preferredPlaces.filter((place) => place.id !== id),
    }))
  }

  const isFormValid =
    isCourseNameValid(form.courseName) &&
    form.region !== null &&
    form.startDate !== null &&
    form.familyMemberIds.length > 0

  const handleGenerate = () => {
    // TODO: 코스 생성 API 연동 후 request DTO 변환 및 생성 요청
    // TODO: 생성 요청 성공 후 generating/recommendation 화면으로 이동
  }

  return (
    <div className="relative -mt-[env(safe-area-inset-top)] -mb-[env(safe-area-inset-bottom)] flex h-app flex-col overflow-hidden">
      <CourseCreateHeader />

      <div className="relative -mt-6 min-h-0 flex-1 overflow-y-auto rounded-t-card bg-white">
        <div className="flex flex-col gap-7 px-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-8">
          <CourseNameField
            value={form.courseName}
            onChange={(courseName) => setForm((prev) => ({ ...prev, courseName }))}
          />

          <RegionSelectField value={form.region} onSelect={handleSelectRegion} />

          <PreferredPlaceSection
            regionId={form.region?.id ?? null}
            selectedPlaces={form.preferredPlaces}
            onAdd={handleAddPlace}
            onRemove={handleRemovePlace}
          />

          <KeywordSelectSection
            selectedIds={form.keywordIds}
            onToggle={(id) =>
              setForm((prev) => ({ ...prev, keywordIds: toggleId(prev.keywordIds, id) }))
            }
          />

          <TravelDateCalendar
            startDate={form.startDate}
            endDate={form.endDate}
            onSelectDate={handleSelectDate}
          />

          <FamilyMemberSelector
            selectedIds={form.familyMemberIds}
            onToggle={(id) =>
              setForm((prev) => ({
                ...prev,
                familyMemberIds: toggleId(prev.familyMemberIds, id),
              }))
            }
          />

          <PrimaryButton variant="lime" disabled={!isFormValid} onClick={handleGenerate}>
            AI 코스 생성하기
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}

export default CourseCreatePage
