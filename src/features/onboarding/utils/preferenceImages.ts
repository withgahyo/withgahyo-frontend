import traditionalMarket from '../../../assets/onboarding/tourism/traditional-market.jpeg'
import cafe from '../../../assets/onboarding/tourism/cafe.jpeg'
import walkingTrail from '../../../assets/onboarding/tourism/walking-trail.jpeg'
import spa from '../../../assets/onboarding/tourism/spa.webp'
import workshop from '../../../assets/onboarding/tourism/workshop.jpeg'
import museum from '../../../assets/onboarding/tourism/museum.webp'
import beach from '../../../assets/onboarding/tourism/beach.webp'
import autumnFoliage from '../../../assets/onboarding/tourism/autumn-foliage.jpeg'
import temple from '../../../assets/onboarding/tourism/temple.jpeg'

import heartyMeal from '../../../assets/onboarding/food/hearty-meal.png'
import quietDining from '../../../assets/onboarding/food/quiet-dining.png'
import nightViewRestaurant from '../../../assets/onboarding/food/night-view-restaurant.png'
import uniqueDining from '../../../assets/onboarding/food/unique-dining.png'
import healthyMeal from '../../../assets/onboarding/food/healthy-meal.png'
import westernFood from '../../../assets/onboarding/food/western-food.png'
import outdoorNatureDining from '../../../assets/onboarding/food/outdoor-nature-dining.png'
import oldSchoolRestaurant from '../../../assets/onboarding/food/old-school-restaurant.png'
import chineseFood from '../../../assets/onboarding/food/chinese-food.png'

// 관광 취향 code(온보딩 API `/api/v1/onboarding/tourism-preferences` 응답 기준) → 이미지.
// Backend가 code를 추가/변경해도 여기 없는 code는 getTourismPreferenceImage가 undefined를
// 반환해 ImageCard가 이미지 없는 기본 상태로 안전하게 표시된다.
const tourismPreferenceImages: Record<string, string | undefined> = {
  NATURE: beach,
  HISTORY: temple,
  CULTURE_ART: museum,
  ACTIVITY: workshop,
  FOOD_TOUR: cafe,
  SHOPPING: traditionalMarket,
  HEALING: spa,
  FESTIVAL: autumnFoliage,
  THEME_PARK: walkingTrail,
}

// 음식 취향 code(온보딩 API `/api/v1/onboarding/food-preferences` 응답 기준) → 이미지.
const foodPreferenceImages: Record<string, string | undefined> = {
  KOREAN: oldSchoolRestaurant,
  WESTERN: westernFood,
  CHINESE: chineseFood,
  JAPANESE: nightViewRestaurant,
  CAFE_DESSERT: quietDining,
  SPICY: uniqueDining,
  VEGETARIAN: outdoorNatureDining,
  LOW_SODIUM: healthyMeal,
  LOCAL_SPECIALTY: heartyMeal,
}

export function getTourismPreferenceImage(code: string): string | undefined {
  return tourismPreferenceImages[code]
}

export function getFoodPreferenceImage(code: string): string | undefined {
  return foodPreferenceImages[code]
}
