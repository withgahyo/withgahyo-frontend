import { ChevronDown, Search } from 'lucide-react'
import { useState } from 'react'
import FormSectionLabel from './FormSectionLabel'
import SelectedItemChip from '../../../components/common/SelectedItemChip'
import type { PlaceOption } from '../types'

interface PreferredPlaceSectionProps {
  regionId: string | null
  searchQuery: string
  places: PlaceOption[]
  isLoading?: boolean
  errorMessage?: string
  selectedPlaces: PlaceOption[]
  onSearchQueryChange: (query: string) => void
  onAdd: (place: PlaceOption) => void
  onRemove: (id: number) => void
}

const FIELD_ID = 'preferred-places'

function PreferredPlaceSection({
  regionId,
  searchQuery,
  places,
  isLoading = false,
  errorMessage,
  selectedPlaces,
  onSearchQueryChange,
  onAdd,
  onRemove,
}: PreferredPlaceSectionProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectedIds = selectedPlaces.map((place) => place.id)

  const handleAdd = (place: PlaceOption) => {
    onAdd(place)
    setIsOpen(false)
  }

  const handleTriggerClick = () => {
    if (!regionId) return
    setIsOpen((prev) => !prev)
  }

  return (
    <div className="flex flex-col gap-3">
      <FormSectionLabel htmlFor={FIELD_ID}>꼭 가고 싶은 장소</FormSectionLabel>

      <div className="relative">
        <button
          id={FIELD_ID}
          type="button"
          onClick={handleTriggerClick}
          disabled={!regionId}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-disabled={!regionId}
          className="flex w-full items-center gap-2 rounded-2xl border border-gray-200 px-4 py-4 text-left text-sm text-gray-400 focus:border-brand-blue focus:outline-none disabled:cursor-not-allowed"
        >
          <Search aria-hidden="true" size={18} className="shrink-0 text-gray-400" />
          <span className="flex-1">
            {regionId ? '꼭 가고 싶은 장소 검색해서 추가하기' : '여행 장소를 먼저 선택해주세요'}
          </span>
          <ChevronDown aria-hidden="true" size={18} className="shrink-0 text-gray-400" />
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
            <div className="border-b border-gray-100 p-3">
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => onSearchQueryChange(event.target.value)}
                placeholder="장소명을 입력해주세요"
                className="w-full rounded-xl bg-gray-100 px-3 py-2 text-sm text-ink outline-none focus:bg-white focus:ring-2 focus:ring-brand-blue/30"
              />
            </div>

            <ul role="listbox" aria-multiselectable="true" aria-label="장소 목록">
              {!searchQuery.trim() && (
                <li className="px-4 py-3 text-sm text-gray-400">검색어를 입력해주세요.</li>
              )}
              {searchQuery.trim() && isLoading && (
                <li className="px-4 py-3 text-sm text-gray-400">검색 중...</li>
              )}
              {searchQuery.trim() && !isLoading && errorMessage && (
                <li className="px-4 py-3 text-sm text-red-500">{errorMessage}</li>
              )}
              {searchQuery.trim() && !isLoading && !errorMessage && places.length === 0 && (
                <li className="px-4 py-3 text-sm text-gray-400">검색된 장소가 없습니다.</li>
              )}
              {searchQuery.trim() &&
                !isLoading &&
                !errorMessage &&
                places.map((place) => {
                  const isSelected = selectedIds.includes(place.id)
                  return (
                    <li key={place.id}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        disabled={isSelected}
                        onClick={() => handleAdd(place)}
                        className={`w-full px-4 py-3 text-left text-sm ${
                          isSelected
                            ? 'cursor-not-allowed text-gray-300'
                            : 'text-ink hover:bg-gray-100'
                        }`}
                      >
                        <span className="block">{place.label}</span>
                        <span className="block truncate text-xs text-gray-400">{place.address}</span>
                      </button>
                    </li>
                  )
                })}
            </ul>
          </div>
        )}
      </div>

      {selectedPlaces.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedPlaces.map((place) => (
            <SelectedItemChip
              key={place.id}
              label={place.label}
              onRemove={() => onRemove(place.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default PreferredPlaceSection
