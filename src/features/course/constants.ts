import type {
  FamilyMemberOption,
  KeywordOption,
  PlaceOptionsByRegion,
  RegionOption,
} from './types'

// 여행 장소는 도 단위로 선택하고, 도 안의 세부 여행 권역 선정과 장소 추천은 AI가 담당한다.
// TODO: 지역 검색 API 연동 시 이 mock 배열을 API 응답으로 교체
export const REGION_MOCK_OPTIONS: RegionOption[] = [
  { id: 'gyeonggi', label: '경기도' },
  { id: 'gangwon', label: '강원특별자치도' },
  { id: 'chungbuk', label: '충청북도' },
  { id: 'chungnam', label: '충청남도' },
  { id: 'jeonbuk', label: '전북특별자치도' },
  { id: 'jeonnam', label: '전라남도' },
  { id: 'gyeongbuk', label: '경상북도' },
  { id: 'gyeongnam', label: '경상남도' },
  { id: 'jeju', label: '제주특별자치도' },
]

// TODO: 백엔드 keyword enum 확정 시 교체
export const KEYWORD_OPTIONS: KeywordOption[] = [
  { id: 'nature', label: '자연' },
  { id: 'history-culture', label: '역사/문화' },
  { id: 'experience', label: '체험' },
  { id: 'leisure-activity', label: '레저/액티비티' },
  { id: 'healing', label: '휴양/힐링' },
  { id: 'traditional-market', label: '전통시장' },
  { id: 'festival-event', label: '축제/행사' },
  { id: 'landmark', label: '명소' },
]

// 꼭 가고 싶은 장소는 선택한 여행 장소(도)에 속한 곳만 보여준다.
// TODO: 관광/장소 검색 API 연동 시 이 mock 데이터를 도별 API 응답으로 교체
export const PLACE_MOCK_OPTIONS_BY_REGION: PlaceOptionsByRegion = {
  gyeonggi: [
    { id: 'everland', label: '에버랜드' },
    { id: 'korean-folk-village', label: '한국민속촌' },
  ],
  gangwon: [
    { id: 'gyeongpo-beach', label: '경포해변' },
    { id: 'seoraksan', label: '설악산' },
  ],
  chungbuk: [
    { id: 'songnisan-beopjusa', label: '속리산 법주사' },
    { id: 'danyang-palgyeong', label: '단양팔경' },
  ],
  chungnam: [
    { id: 'baekje-cultural-land', label: '백제문화단지' },
    { id: 'daecheon-beach', label: '대천해수욕장' },
  ],
  jeonbuk: [
    { id: 'jeonju-hanok-village', label: '전주 한옥마을' },
    { id: 'naejangsan', label: '내장산' },
  ],
  jeonnam: [
    { id: 'suncheonman-wetland', label: '순천만습지' },
    { id: 'yeosu-cable-car', label: '여수해상케이블카' },
  ],
  gyeongbuk: [
    { id: 'bulguksa', label: '경주 불국사' },
    { id: 'andong-hahoe-village', label: '안동하회마을' },
  ],
  gyeongnam: [
    { id: 'tongyeong-cable-car', label: '통영 케이블카' },
    { id: 'geoje-wind-hill', label: '거제 바람의 언덕' },
  ],
  jeju: [
    { id: 'seongsan-ilchulbong', label: '성산일출봉' },
    { id: 'hallasan', label: '한라산' },
  ],
}

// TODO: 실제 가족 구성원 API 연동 시 교체
export const FAMILY_MEMBER_MOCK_OPTIONS: FamilyMemberOption[] = [
  { id: 'father', name: '아빠' },
  { id: 'mother', name: '엄마' },
  { id: 'me', name: '나' },
  { id: 'sibling', name: '동생' },
]
