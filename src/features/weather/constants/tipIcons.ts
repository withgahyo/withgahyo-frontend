import { CloudSnow, Lightbulb, Sun, Thermometer, Umbrella, type LucideIcon } from 'lucide-react'

// getWeatherTips()가 반환하는 고정 TIP 문구별 아이콘. TIP 생성 규칙/threshold는 건드리지 않고
// 이미 확정된 문구 문자열에 표시용 아이콘만 매핑한다(문구가 바뀌면 fallback으로 자연스럽게 빠진다).
export const TIP_ICONS: Record<string, LucideIcon> = {
  '비가 올 수 있어요. 작은 우산을 챙겨주세요.': Umbrella,
  '눈 예보가 있어요. 미끄럽지 않은 신발을 준비해주세요.': CloudSnow,
  '비 올 확률이 높아요. 우산을 챙기면 좋아요.': Umbrella,
  '낮에는 더울 수 있어요. 가벼운 옷과 물을 준비해주세요.': Sun,
  '아침저녁으로 쌀쌀할 수 있어요. 겉옷을 챙겨주세요.': Thermometer,
}

export const TIP_FALLBACK_ICON: LucideIcon = Lightbulb

export function getTipIcon(tip: string): LucideIcon {
  return TIP_ICONS[tip] ?? TIP_FALLBACK_ICON
}
