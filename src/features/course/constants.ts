// 지도 위 코스 경로선. Kakao Maps의 Polyline은 Tailwind 클래스를 적용할 수 없어 색상 문자열이 필요하다.
export const COURSE_MAP_POLYLINE_COLOR = '#a1d10e'
export const COURSE_MAP_POLYLINE_WEIGHT = 5

// 장소 하나를 선택했을 때 지도 확대 레벨 (Kakao는 값이 작을수록 확대). 과도하게 확대하지 않는다.
export const COURSE_MAP_SELECTED_LEVEL = 3

// 전체 코스(bounds) 표시 시 지도 가장자리 여백(px).
export const COURSE_MAP_BOUNDS_PADDING = 48

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
