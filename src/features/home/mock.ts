import courseDaejeon from '../../assets/home/course-daejeon.jpeg'
import courseGangneung from '../../assets/home/course-gangneung.jpeg'
import courseJeonju from '../../assets/home/course-jeonju.jpeg'
import type { FamilyCourse, FavoriteCourse } from './types'

// UI 확인용 mock 데이터 (fan slider 시각 검증 목적, 서버 DTO 아님)
// TODO: 가족 코스 API 연동 시 React Query로 교체
export const MOCK_FAMILY_COURSES: FamilyCourse[] = [
  {
    id: '1',
    title: '우리 가족 여행 코스',
    region: '대전 가족여행',
    imageUrl: courseDaejeon,
    dDay: 'D-5',
    date: '7월 23일 (수) 10:30',
    tags: ['무장애', '휴식', '자연', '전통 시장', '체험 활동', '명소', '산책'],
  },
  {
    id: '2',
    title: '우리 가족 여행 코스',
    region: '강릉 바다여행',
    imageUrl: courseGangneung,
    dDay: 'D-12',
    date: '8월 2일 (일) 09:00',
    tags: ['자연', '해변', '산책'],
  },
  {
    id: '3',
    title: '우리 가족 여행 코스',
    region: '전주 한옥마을 여행',
    imageUrl: courseJeonju,
    dDay: 'D-20',
    date: '8월 10일 (월) 11:00',
    tags: ['전통 시장', '체험 활동', '명소'],
  },
]

// TODO: 찜한 코스 API 연동 시 React Query로 교체
export const MOCK_FAVORITE_COURSES: FavoriteCourse[] = [
  {
    id: '1',
    title: '강릉 바다와 맛집 코스',
    region: '강릉',
    imageUrl: null,
  },
]
