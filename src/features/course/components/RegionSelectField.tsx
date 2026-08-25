import { ChevronDown, Search } from 'lucide-react'
import { useState } from 'react'
import FormSectionLabel from './FormSectionLabel'
import type { RegionOption } from '../types'

interface RegionSelectFieldProps {
  value: RegionOption | null
  regions: RegionOption[]
  isLoading?: boolean
  errorMessage?: string
  onSelect: (region: RegionOption) => void
}

const FIELD_ID = 'region'

function RegionSelectField({
  value,
  regions,
  isLoading = false,
  errorMessage,
  onSelect,
}: RegionSelectFieldProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (region: RegionOption) => {
    onSelect(region)
    setIsOpen(false)
  }

  return (
    <div className="flex flex-col gap-3">
      <FormSectionLabel htmlFor={FIELD_ID}>여행 장소</FormSectionLabel>

      <div className="relative">
        <button
          id={FIELD_ID}
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className="flex w-full items-center gap-2 rounded-2xl border border-gray-200 px-4 py-4 text-left text-sm focus:border-brand-blue focus:outline-none"
        >
          <Search aria-hidden="true" size={18} className="shrink-0 text-gray-400" />
          <span className={`flex-1 truncate ${value ? 'text-ink' : 'text-gray-400'}`}>
            {value ? value.label : '여행 장소를 선택해주세요'}
          </span>
          <ChevronDown aria-hidden="true" size={18} className="shrink-0 text-gray-400" />
        </button>

        {isOpen && (
          <ul
            role="listbox"
            aria-label="여행 장소 목록"
            className="absolute z-10 mt-2 w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg"
          >
            {isLoading && <li className="px-4 py-3 text-sm text-gray-400">불러오는 중...</li>}
            {!isLoading && errorMessage && (
              <li className="px-4 py-3 text-sm text-red-500">{errorMessage}</li>
            )}
            {!isLoading && !errorMessage && regions.length === 0 && (
              <li className="px-4 py-3 text-sm text-gray-400">선택 가능한 지역이 없습니다.</li>
            )}
            {!isLoading &&
              !errorMessage &&
              regions.map((region) => (
                <li key={region.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={value?.id === region.id}
                    onClick={() => handleSelect(region)}
                    className={`w-full px-4 py-3 text-left text-sm ${
                      value?.id === region.id
                        ? 'bg-brand-blue/10 text-brand-blue'
                        : 'text-ink hover:bg-gray-100'
                    }`}
                  >
                    {region.label}
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default RegionSelectField
