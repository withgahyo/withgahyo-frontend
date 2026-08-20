import type { FamilyMemberOption, KeywordOption, PlaceOption, RegionOption } from './types'

// TODO: 지역 검색 API 연동 시 이 mock 배열을 API 응답으로 교체
export const REGION_MOCK_OPTIONS: RegionOption[] = [
  { id: 'seoul', label: '서울특별시' },
  { id: 'busan', label: '부산광역시' },
  { id: 'daejeon', label: '대전광역시' },
  { id: 'jeju', label: '제주시' },
  { id: 'gangneung', label: '강릉시' },
]

// TODO: 백엔드 keyword enum 확정 시 교체
export const KEYWORD_OPTIONS: KeywordOption[] = [
  { id: 'barrier-free', label: '무장애' },
  { id: 'nature', label: '자연' },
  { id: 'experience', label: '체험 활동' },
  { id: 'rest', label: '휴식' },
  { id: 'traditional-market', label: '전통 시장' },
  { id: 'landmark', label: '명소' },
]

// TODO: 관광/장소 검색 API 연동 시 이 mock 배열을 API 응답으로 교체
export const PLACE_MOCK_OPTIONS: PlaceOption[] = [
  { id: 'seongsimdang', label: '성심당' },
  { id: 'gyeongbokgung', label: '경복궁' },
  { id: 'haeundae', label: '해운대' },
  { id: 'jeonju-hanok-village', label: '전주 한옥마을' },
]

// TODO: 실제 가족 구성원 API 연동 시 교체
export const FAMILY_MEMBER_MOCK_OPTIONS: FamilyMemberOption[] = [
  { id: 'father', name: '아빠' },
  { id: 'mother', name: '엄마' },
  { id: 'me', name: '나' },
  { id: 'sibling', name: '동생' },
]
