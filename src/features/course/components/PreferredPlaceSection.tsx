import { Search } from 'lucide-react'
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
  const hasSearchQuery = Boolean(searchQuery.trim())

  const handleAdd = (place: PlaceOption) => {
    onAdd(place)
    onSearchQueryChange('')
    setIsOpen(false)
  }

  const handleSearchChange = (query: string) => {
    onSearchQueryChange(query)
    setIsOpen(Boolean(regionId))
  }

  return (
    <div className="flex flex-col gap-3">
      <FormSectionLabel htmlFor={FIELD_ID}>꼭 가고 싶은 장소</FormSectionLabel>

      <div className="relative">
        <div
          className="relative"
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setIsOpen(false)
            }
          }}
        >
          <Search
            aria-hidden="true"
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            id={FIELD_ID}
            type="search"
            value={searchQuery}
            onFocus={() => setIsOpen(Boolean(regionId))}
            onChange={(event) => handleSearchChange(event.target.value)}
            disabled={!regionId}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-controls={`${FIELD_ID}-results`}
            placeholder={regionId ? '장소명을 검색해주세요' : '여행 장소를 먼저 선택해주세요'}
            className="w-full rounded-2xl border border-gray-200 py-4 pl-11 pr-4 text-sm text-ink outline-none placeholder:text-gray-400 focus:border-brand-blue disabled:cursor-not-allowed disabled:bg-white"
          />

          {isOpen && hasSearchQuery && (
            <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
              <ul
                id={`${FIELD_ID}-results`}
                role="listbox"
                aria-multiselectable="true"
                aria-label="장소 목록"
              >
                {isLoading && (
                  <li className="px-4 py-3 text-sm text-gray-400">검색 중...</li>
                )}
                {!isLoading && errorMessage && (
                  <li className="px-4 py-3 text-sm text-red-500">{errorMessage}</li>
                )}
                {!isLoading && !errorMessage && places.length === 0 && (
                  <li className="px-4 py-3 text-sm text-gray-400">검색된 장소가 없습니다.</li>
                )}
                {!isLoading &&
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
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={() => handleAdd(place)}
                          className={`w-full px-4 py-3 text-left text-sm ${
                            isSelected
                              ? 'cursor-not-allowed text-gray-300'
                              : 'text-ink hover:bg-gray-100'
                          }`}
                        >
                          <span className="block">{place.label}</span>
                          <span className="block truncate text-xs text-gray-400">
                            {place.address}
                          </span>
                        </button>
                      </li>
                    )
                  })}
              </ul>
            </div>
          )}
        </div>
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
