const CATEGORIES = [
  { value: undefined, label: '전체' },
  { value: 'FREE', label: '자유' },
  { value: 'QUESTION', label: '질문' },
  { value: 'REVIEW', label: '후기' },
  { value: 'INFO', label: '정보' },
] as const

interface CommunityCategoryTabsProps {
  selectedCategory?: string
  onSelect: (category?: string) => void
}

function CommunityCategoryTabs({ selectedCategory, onSelect }: CommunityCategoryTabsProps) {
  return (
    <div className="mt-3 flex gap-2 overflow-x-auto">
      {CATEGORIES.map((category) => {
        const isSelected = selectedCategory === category.value

        return (
          <button
            key={category.label}
            type="button"
            onClick={() => onSelect(category.value)}
            className={`h-5 min-w-12 rounded-full border px-3 text-[10px] font-semibold ${
              isSelected
                ? 'border-brand-lime bg-brand-lime text-brand-blue'
                : 'border-white/35 bg-white/5 text-white'
            }`}
          >
            {category.label}
          </button>
        )
      })}
    </div>
  )
}

export default CommunityCategoryTabs
