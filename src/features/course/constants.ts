// 지도 위 코스 경로선. Kakao Maps의 Polyline은 Tailwind 클래스를 적용할 수 없어 색상 문자열이 필요하다.
export const COURSE_MAP_POLYLINE_COLOR = '#a1d10e'
export const COURSE_MAP_POLYLINE_WEIGHT = 5

// 장소 하나를 선택했을 때 지도 확대 레벨 (Kakao는 값이 작을수록 확대). 과도하게 확대하지 않는다.
export const COURSE_MAP_SELECTED_LEVEL = 3

// 전체 코스(bounds) 표시 시 지도 가장자리 여백(px).
export const COURSE_MAP_BOUNDS_PADDING = 48

// AI 추천 생성 상태 polling 간격(ms). 프로젝트에 별도 컨벤션이 없어 상수로 관리한다.
export const COURSE_GENERATION_POLL_INTERVAL_MS = 2500

// polling이 이 시간을 넘기면 polling을 멈추고 별도 timeout 안내 UI로 전환한다.
// backend FAILED 와는 구분되는 "예상보다 오래 걸림" 상태다.
export const COURSE_GENERATION_POLL_TIMEOUT_MS = 90_000

// generation status 중 terminal 로 취급하는 값. 그 외 모든 값은 "진행 중"이다.
// (진행중 status 문자열은 백엔드 미확정)
export const COURSE_GENERATION_STATUS = {
  completed: 'COMPLETED',
  failed: 'FAILED',
} as const

// 바텀시트가 collapsed일 때 지도 하단이 시트 peek에 가려지는 높이(px).
// setBounds 하단 패딩으로 사용해 collapsed 상태에서도 전체 코스가 시트 위에 들어오게 한다.
export const COURSE_MAP_COLLAPSED_BOTTOM_PADDING = 140

// 선택된 장소 강조 링(CustomOverlay)의 색상. theme.css 토큰과 동일.
export const COURSE_MAP_SELECTED_RING = {
  borderColor: '#3044ff', // --color-brand-blue
  fillColor: 'rgba(215, 255, 100, 0.35)', // --color-brand-lime @ 35%
} as const

// 바텀시트 handle swipe로 상태를 전환하는 최소 이동 거리(px).
export const SHEET_SWIPE_THRESHOLD = 48
