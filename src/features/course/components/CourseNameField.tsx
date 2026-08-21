import { useState, type ChangeEvent, type CompositionEvent } from 'react'
import FormSectionLabel from './FormSectionLabel'
import { sanitizeCourseName } from '../utils/validateCourseName'

interface CourseNameFieldProps {
  value: string
  onChange: (value: string) => void
}

const FIELD_ID = 'course-name'

function CourseNameField({ value, onChange }: CourseNameFieldProps) {
  const [isComposing, setIsComposing] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value
    // 한글 등 IME 조합 중에는 필터링하지 않고 그대로 반영한다.
    // 조합 중간 상태(예: 낱자모)에 정규식 필터를 적용하면 조합이 깨져 한글 입력이 안 된다.
    onChange(isComposing ? rawValue : sanitizeCourseName(rawValue))
  }

  const handleCompositionEnd = (event: CompositionEvent<HTMLInputElement>) => {
    setIsComposing(false)
    onChange(sanitizeCourseName(event.currentTarget.value))
  }

  return (
    <div className="flex flex-col gap-3">
      <FormSectionLabel htmlFor={FIELD_ID}>코스 이름</FormSectionLabel>
      <input
        id={FIELD_ID}
        type="text"
        value={value}
        onChange={handleChange}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={handleCompositionEnd}
        placeholder="코스 이름은 2~10자 이내 (문자, 숫자만 가능)"
        className="w-full rounded-2xl border border-gray-200 px-4 py-4 text-sm text-ink placeholder:text-gray-400 focus:border-brand-blue focus:outline-none"
      />
    </div>
  )
}

export default CourseNameField
