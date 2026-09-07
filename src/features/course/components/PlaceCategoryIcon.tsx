import { Camera, Coffee, Croissant, MapPin, Trees, Utensils } from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import type { PlaceCategory } from '../types'

interface PlaceCategoryIconProps extends LucideProps {
  category: PlaceCategory
}

// 카테고리별 아이콘은 lucide-react(이미 설치됨)를 재사용한다.
function PlaceCategoryIcon({ category, ...props }: PlaceCategoryIconProps) {
  switch (category) {
    case 'BAKERY':
      return <Croissant {...props} />
    case 'RESTAURANT':
      return <Utensils {...props} />
    case 'NATURE':
      return <Trees {...props} />
    case 'CAFE':
      return <Coffee {...props} />
    case 'ATTRACTION':
      return <Camera {...props} />
    default:
      return <MapPin {...props} />
  }
}

export default PlaceCategoryIcon
