const CATEGORIES = ['전체', '자유', '질문', '후기', '정보'] as const

function CommunityCategoryTabs() {
  return (
    <div className="mt-3 flex gap-2 overflow-x-auto">
      {CATEGORIES.map((label, index) => (
        <button
          key={label}
          type="button"
          className={`h-5 min-w-12 rounded-full border px-3 text-[10px] font-semibold ${
            index === 1
              ? 'border-brand-lime bg-brand-lime text-brand-blue'
              : 'border-white/35 bg-white/5 text-white'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export default CommunityCategoryTabs
