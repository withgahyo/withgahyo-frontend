import { Camera, Coffee, Croissant, Footprints, Landmark, MapPin, Trees, Utensils } from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import type { PlaceCategory } from '../types'

interface PlaceCategoryIconProps extends LucideProps {
  category: PlaceCategory
}

// 카테고리별 아이콘은 lucide-react(이미 설치됨)를 재사용한다.
// 백엔드 category enum이 완전히 확정되지 않아, 알 수 없는 값은 기본 아이콘(MapPin)으로 둔다.
// 확인된 값: FOOD / RESTAURANT / CAFE / BAKERY / TOUR / CULTURE / WALK / NATURE / ATTRACTION.
function PlaceCategoryIcon({ category, ...props }: PlaceCategoryIconProps) {
  switch (category) {
    case 'FOOD':
    case 'RESTAURANT':
      return <Utensils {...props} />
    case 'CAFE':
      return <Coffee {...props} />
    case 'BAKERY':
      return <Croissant {...props} />
    case 'TOUR':
    case 'ATTRACTION':
      return <Camera {...props} />
    case 'CULTURE':
      return <Landmark {...props} />
    case 'WALK':
      return <Footprints {...props} />
    case 'NATURE':
      return <Trees {...props} />
    default:
      return <MapPin {...props} />
  }
}

export default PlaceCategoryIcon
