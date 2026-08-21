export const ROUTE_PATHS = {
  splash: '/splash',
  login: '/login',

  onboardingDuration: '/onboarding/duration',
  onboardingTourism: '/onboarding/tourism',
  onboardingFood: '/onboarding/food',
  onboardingCondition: '/onboarding/condition',
  onboardingComplete: '/onboarding/complete',

  home: '/home',
  popular: '/popular',
  albums: '/albums',
  mypage: '/mypage',

  courseCreate: '/courses/create',

  courseGenerating: (generationId: string) =>
    `/courses/generating/${generationId}`,
  courseRecommendations: (generationId: string) =>
    `/courses/recommendations/${generationId}`,
  courseDetail: (courseId: string) => `/courses/${courseId}`,

  albumDetail: (albumId: string) => `/albums/${albumId}`,
  notifications: '/notifications',
  review: (courseId: string) => `/reviews/${courseId}`,
} as const
