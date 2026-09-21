// 여행 준비 TIP을 판단하는 기준값. 컴포넌트에 magic number를 흩뿌리지 않기 위해 이곳에서만 관리한다.
export const TIP_THRESHOLDS = {
  /** 이 값(%) 이상이면 우산이 필요하다고 안내한다. */
  highPrecipitationProbability: 60,
  /** 이 값(°C) 이상이면 낮 더위 안내를 노출한다. */
  hotMaxTemperature: 28,
  /** 이 값(°C) 이하이면 아침저녁 쌀쌀함 안내를 노출한다. */
  coldMinTemperature: 10,
} as const

/** 한 여행에서 보여줄 TIP 최대 개수. */
export const MAX_TIP_COUNT = 2
