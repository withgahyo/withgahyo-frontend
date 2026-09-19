import courseFallback1 from '../../../assets/course-fallback/course-fallback-1.png'
import courseFallback2 from '../../../assets/course-fallback/course-fallback-2.png'
import courseFallback3 from '../../../assets/course-fallback/course-fallback-3.png'
import regionSeoul from '../../../assets/home/region/region-서울.jpeg'
import regionBusan from '../../../assets/home/region/region-부산.jpeg'
import regionDaegu from '../../../assets/home/region/region-대구.jpeg'
import regionIncheon from '../../../assets/home/region/region-인천.jpeg'
import regionGwangju from '../../../assets/home/region/region-광주.jpeg'
import regionDaejeon from '../../../assets/home/region/region-대전.jpeg'
import regionUlsan from '../../../assets/home/region/region-울산.jpeg'
import regionSejong from '../../../assets/home/region/region-세종.jpeg'
import regionGyeonggi from '../../../assets/home/region/region-경기.jpeg'
import regionGangwon from '../../../assets/home/region/region-강원.jpeg'
import regionJeonbuk from '../../../assets/home/region/region-전북.jpeg'
import regionChungbuk from '../../../assets/home/region/region-충북.jpeg'
import regionChungnam from '../../../assets/home/region/region-충남.jpeg'
import regionJeonnam from '../../../assets/home/region/region-전남.jpeg'
import regionGyeongbuk from '../../../assets/home/region/region-경북.jpeg'
import regionGyeongnam from '../../../assets/home/region/region-경남.jpeg'
import regionJeju from '../../../assets/home/region/region-제주.jpeg'

// 실제 장소 이미지가 없거나 로딩에 실패했을 때 쓰는 공통 fallback.
// 코스마다 다른 이미지가 보이도록 seed(courseId 등) 기준으로 순환 배정한다.
const COMMON_FALLBACK_IMAGES = [courseFallback1, courseFallback2, courseFallback3]

// 지역별 대표 이미지. key는 아래 REGION_ALIASES가 정규화하는 대표 시도명(17개)과 1:1로 맞춘다.
const REGION_FALLBACK_IMAGES: Record<string, string | undefined> = {
  서울: regionSeoul,
  부산: regionBusan,
  대구: regionDaegu,
  인천: regionIncheon,
  광주: regionGwangju,
  대전: regionDaejeon,
  울산: regionUlsan,
  세종: regionSejong,
  경기: regionGyeonggi,
  강원: regionGangwon,
  충북: regionChungbuk,
  충남: regionChungnam,
  전북: regionJeonbuk,
  전남: regionJeonnam,
  경북: regionGyeongbuk,
  경남: regionGyeongnam,
  제주: regionJeju,
}

// Backend regionName이 "대전"처럼 짧게 오거나 "대전광역시"처럼 정식 행정구역명으로
// 올 수 있어, 대표적인 표기만 안전하게 대표 key로 정규화한다. 과도한 주소 파싱은 하지 않는다.
const REGION_ALIASES: Record<string, string> = {
  서울: '서울',
  서울특별시: '서울',
  부산: '부산',
  부산광역시: '부산',
  대구: '대구',
  대구광역시: '대구',
  인천: '인천',
  인천광역시: '인천',
  광주: '광주',
  광주광역시: '광주',
  대전: '대전',
  대전광역시: '대전',
  울산: '울산',
  울산광역시: '울산',
  세종: '세종',
  세종특별자치시: '세종',
  경기: '경기',
  경기도: '경기',
  강원: '강원',
  강원도: '강원',
  강원특별자치도: '강원',
  충북: '충북',
  충청북도: '충북',
  충남: '충남',
  충청남도: '충남',
  전북: '전북',
  전라북도: '전북',
  전북특별자치도: '전북',
  전남: '전남',
  전라남도: '전남',
  경북: '경북',
  경상북도: '경북',
  경남: '경남',
  경상남도: '경남',
  제주: '제주',
  제주도: '제주',
  제주특별자치도: '제주',
}

function normalizeRegionName(regionName: string): string | null {
  const key = REGION_ALIASES[regionName.trim()]
  return key ?? null
}

/**
 * regionName에 해당하는 지역 대표 이미지. 매칭되는 alias가 없거나 asset이 아직
 * 준비되지 않은 지역이면 undefined를 반환해, 호출부가 공통 fallback으로 내려가게 한다.
 */
export function getRegionFallbackImage(regionName: string): string | undefined {
  const regionKey = normalizeRegionName(regionName)
  return regionKey ? REGION_FALLBACK_IMAGES[regionKey] : undefined
}

/**
 * 지역 대표 이미지조차 없거나(매칭 실패/asset 미준비) 로딩에 실패했을 때 쓰는 최종 fallback.
 * seed(courseId 등 코스별 고정값)로 항상 같은 코스가 같은 fallback 이미지를 갖도록 한다.
 */
export function getCommonFallbackImage(seed: number): string {
  const index =
    ((seed % COMMON_FALLBACK_IMAGES.length) + COMMON_FALLBACK_IMAGES.length) %
    COMMON_FALLBACK_IMAGES.length
  return COMMON_FALLBACK_IMAGES[index]
}
