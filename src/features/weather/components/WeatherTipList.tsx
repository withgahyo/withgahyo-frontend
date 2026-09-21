import { TIP_FALLBACK_ICON, TIP_ICONS } from '../constants/tipIcons'

interface WeatherTipListProps {
  tips: string[]
}

function WeatherTipList({ tips }: WeatherTipListProps) {
  if (tips.length === 0) return null

  return (
    <section className="mt-8">
      <h2 className="text-sm font-bold text-ink">여행 준비 TIP</h2>

      {/* TIP이 2개여도 카드를 나누지 않고 한 카드 안에서 구분선으로만 나눈다. */}
      <div className="mt-3 divide-y divide-ink/5 rounded-card bg-white px-4 shadow-[0_2px_10px_-4px_rgb(20_20_43/0.12)]">
        {tips.map((tip) => {
          const Icon = TIP_ICONS[tip] ?? TIP_FALLBACK_ICON

          return (
            <div key={tip} className="flex items-start gap-3 py-4">
              <Icon aria-hidden="true" size={22} strokeWidth={1.75} className="mt-0.5 shrink-0 text-brand-blue" />
              <p className="text-sm leading-6 text-ink/80">{tip}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default WeatherTipList
