// 카카오맵 웹 링크. Kakao Maps 공식 가이드(https://apis.map.kakao.com/web/guide/)의
// "카카오맵 링크" 규격을 따른다.
//
//   이름+좌표로 지도 표시: https://map.kakao.com/link/map/{name},{latitude},{longitude}
//
// place id 기반 링크도 있으나 현재 mock 데이터에 Kakao place id가 없으므로
// (임의 생성 금지) 좌표 기반 링크를 사용한다. 좌표 기반이라 동명 장소 혼동이 없고,
// 데스크톱은 map.kakao.com 웹, 모바일은 해당 페이지가 카카오맵 앱 연결을 자체 처리한다.
export function buildKakaoMapPlaceUrl(name: string, latitude: number, longitude: number) {
  return `https://map.kakao.com/link/map/${encodeURIComponent(name)},${latitude},${longitude}`
}
