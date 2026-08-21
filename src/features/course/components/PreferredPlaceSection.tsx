import { ChevronDown, Search } from 'lucide-react'
import { useState } from 'react'
import FormSectionLabel from './FormSectionLabel'
import SelectedItemChip from '../../../components/common/SelectedItemChip'
import { PLACE_MOCK_OPTIONS_BY_REGION } from '../constants'
import type { PlaceOption } from '../types'

interface PreferredPlaceSectionProps {
  regionId: string | null
  selectedPlaces: PlaceOption[]
  onAdd: (place: PlaceOption) => void
  onRemove: (id: string) => void
}

const FIELD_ID = 'preferred-places'

function PreferredPlaceSection({
  regionId,
  selectedPlaces,
  onAdd,
  onRemove,
}: PreferredPlaceSectionProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectedIds = selectedPlaces.map((place) => place.id)
  const placeOptions = regionId ? (PLACE_MOCK_OPTIONS_BY_REGION[regionId] ?? []) : []

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
          <ul
            role="listbox"
            aria-multiselectable="true"
            aria-label="장소 목록"
            className="absolute z-10 mt-2 w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg"
          >
            {placeOptions.map((place) => {
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
                    {place.label}
                  </button>
                </li>
              )
            })}
          </ul>
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
