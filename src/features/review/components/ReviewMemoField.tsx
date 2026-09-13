interface ReviewMemoFieldProps {
  value: string
  onChange: (value: string) => void
}

function ReviewMemoField({ value, onChange }: ReviewMemoFieldProps) {
  return (
    <section className="rounded-lg border border-ink/15 bg-white px-4 py-4 shadow-[0_3px_8px_rgb(20_20_43/0.05)]">
      <h2 className="text-center text-sm font-extrabold text-ink/75">
        이번 여행의 후기를 적어주세요!
        <span className="ml-1 text-[10px] font-bold text-ink/45">(선택)</span>
      </h2>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-3 h-15 w-full resize-none rounded-md bg-gray-100 px-3 py-2 text-xs font-medium text-ink outline-none placeholder:text-ink/25"
        placeholder="여행에 대한 간단한 후기를 남겨주세요"
        maxLength={300}
      />
    </section>
  )
}

export default ReviewMemoField
