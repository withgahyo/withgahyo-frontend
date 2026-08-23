import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import FormSectionLabel from './FormSectionLabel'
import SelectedItemChip from '../../../components/common/SelectedItemChip'
import type { KeywordOption } from '../types'

interface KeywordSelectSectionProps {
  keywords: KeywordOption[]
  isLoading?: boolean
  errorMessage?: string
  selectedIds: number[]
  onToggle: (id: number) => void
}

const FIELD_ID = 'keywords'

function KeywordSelectSection({
  keywords,
  isLoading = false,
  errorMessage,
  selectedIds,
  onToggle,
}: KeywordSelectSectionProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectedKeywords = keywords.filter((keyword) => selectedIds.includes(keyword.id))

  return (
    <div className="flex flex-col gap-3">
      <FormSectionLabel htmlFor={FIELD_ID}>관심 키워드 선택</FormSectionLabel>

      <div className="relative">
        <button
          id={FIELD_ID}
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className="flex w-full items-center gap-2 rounded-2xl border border-gray-200 px-4 py-4 text-left text-sm text-gray-400 focus:border-brand-blue focus:outline-none"
        >
          <span className="flex-1">키워드를 적어주세요</span>
          <ChevronDown aria-hidden="true" size={18} className="shrink-0 text-gray-400" />
        </button>

        {isOpen && (
          <ul
            role="listbox"
            aria-multiselectable="true"
            aria-label="관심 키워드 목록"
            className="absolute z-10 mt-2 w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg"
          >
            {isLoading && <li className="px-4 py-3 text-sm text-gray-400">불러오는 중...</li>}
            {!isLoading && errorMessage && (
              <li className="px-4 py-3 text-sm text-red-500">{errorMessage}</li>
            )}
            {!isLoading && !errorMessage && keywords.length === 0 && (
              <li className="px-4 py-3 text-sm text-gray-400">선택 가능한 키워드가 없습니다.</li>
            )}
            {!isLoading &&
              !errorMessage &&
              keywords.map((keyword) => {
                const isSelected = selectedIds.includes(keyword.id)
                return (
                  <li key={keyword.id}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => onToggle(keyword.id)}
                      className={`w-full px-4 py-3 text-left text-sm ${
                        isSelected
                          ? 'bg-brand-blue/10 text-brand-blue'
                          : 'text-ink hover:bg-gray-100'
                      }`}
                    >
                      {keyword.label}
                    </button>
                  </li>
                )
              })}
          </ul>
        )}
      </div>

      {selectedKeywords.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedKeywords.map((keyword) => (
            <SelectedItemChip
              key={keyword.id}
              label={keyword.label}
              onRemove={() => onToggle(keyword.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default KeywordSelectSection
