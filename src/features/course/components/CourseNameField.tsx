import type { ChangeEvent } from 'react'
import FormSectionLabel from './FormSectionLabel'
import { COURSE_NAME_MAX_LENGTH, isCourseNameCharAllowed } from '../utils/validateCourseName'

interface CourseNameFieldProps {
  value: string
  onChange: (value: string) => void
}

const FIELD_ID = 'course-name'

function CourseNameField({ value, onChange }: CourseNameFieldProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value
    if (nextValue.length > COURSE_NAME_MAX_LENGTH) return
    if (!isCourseNameCharAllowed(nextValue)) return
    onChange(nextValue)
  }

  return (
    <div className="flex flex-col gap-3">
      <FormSectionLabel htmlFor={FIELD_ID}>코스 이름</FormSectionLabel>
      <input
        id={FIELD_ID}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="코스 이름은 2~10자 이내 (문자, 숫자만 가능)"
        className="w-full rounded-2xl border border-gray-200 px-4 py-4 text-sm text-ink placeholder:text-gray-400 focus:border-brand-blue focus:outline-none"
      />
    </div>
  )
}

export default CourseNameField
