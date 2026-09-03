import type { CourseDetailPlaceResponse, CourseDetailResponse } from '../../../api/course'

// UI 확인용 mock. 백엔드/AI 서버 연결 전까지 코스 상세 화면을 볼 수 있게 한다.
// 실제 API 응답(CourseDetailResponse)과 동일한 형태로 두고 toCourseDetail 매퍼를 그대로 태운다.
// category는 프론트 PlaceCategory 코드를 사용한다(실제 응답 형식 확인 시 매퍼에서 처리).
// TODO: 백엔드/AI 서버 연동되면 이 파일과 VITE_USE_COURSE_MOCK 플래그 제거.

function mockPlace(
  placeId: number,
  name: string,
  category: string,
  address: string,
  latitude: number,
  longitude: number,
): CourseDetailPlaceResponse {
  return {
    placeId,
    source: 'MOCK',
    externalPlaceId: `mock-${placeId}`,
    name,
    category,
    address,
    areaCode: '3',
    sigunguCode: '0',
    imageUrl: null,
    latitude,
    longitude,
  }
}

function mockCourse(
  courseId: number,
  title: string,
  places: CourseDetailPlaceResponse[],
): CourseDetailResponse {
  return {
    courseId,
    title,
    status: 'DRAFT',
    startDate: '2026-09-10',
    endDate: '2026-09-10',
    daysUntilTrip: 7,
    region: {
      areaCode: '3',
      sigunguCode: '0',
      name: '대전',
      parentName: '',
      displayName: '대전광역시',
    },
    imageUrl: null,
    tags: [],
    liked: false,
    likeCount: 0,
    albumId: null,
    participants: [],
    days: [{ day: 1, date: '2026-09-10', places }],
  }
}

// 추천 코스 화면의 카드 id(rec-1~3)로 조회한다.
export const MOCK_COURSE_DETAIL_RESPONSES: Record<string, CourseDetailResponse> = {
  'rec-1': mockCourse(1, '부모님 편안함 우선 코스', [
    mockPlace(101, '성심당 본점', 'BAKERY', '대전 중구 대종로480번길 15', 36.3276, 127.4275),
    mockPlace(102, '오씨 칼국수', 'RESTAURANT', '대전 중구 계룡로', 36.3236, 127.421),
    mockPlace(103, '한밭 수목원', 'NATURE', '대전 서구 둔산대로 169', 36.369, 127.3884),
    mockPlace(104, '숍비피', 'CAFE', '대전 유성구', 36.361, 127.356),
  ]),
  'rec-2': mockCourse(2, '우리 가족 취향 집합 코스', [
    mockPlace(201, '대전 오월드', 'ATTRACTION', '대전 중구 사정공원로 70', 36.2942, 127.3915),
    mockPlace(202, '뿌리공원', 'NATURE', '대전 중구 뿌리공원로 47', 36.2872, 127.373),
    mockPlace(203, '태평소국밥', 'RESTAURANT', '대전 중구', 36.3184, 127.3921),
    mockPlace(204, '성심당 케익부띠끄', 'BAKERY', '대전 중구 은행동', 36.3271, 127.4269),
  ]),
  'rec-3': mockCourse(3, '자연이 아름다운 힐링 코스', [
    mockPlace(301, '장태산 자연휴양림', 'NATURE', '대전 서구 장안로 461', 36.2317, 127.3253),
    mockPlace(302, '산속으로', 'RESTAURANT', '대전 서구', 36.2489, 127.3401),
    mockPlace(303, '대청호 오백리길', 'NATURE', '대전 동구 대청로', 36.4772, 127.483),
    mockPlace(304, '카페 슈가브', 'CAFE', '대전 동구', 36.4581, 127.4699),
  ]),
}
