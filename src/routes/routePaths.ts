export const ROUTE_PATHS = {
  splash: '/splash',
  login: '/login',
  kakaoOAuthCallback: '/oauth/kakao/callback',
  googleOAuthCallback: '/oauth/google/callback',

  onboardingTourism: '/onboarding/tourism',
  onboardingFood: '/onboarding/food',
  onboardingCondition: '/onboarding/condition',
  onboardingComplete: '/onboarding/complete',

  home: '/home',
  popular: '/popular',
  albums: '/albums',
  mypage: '/mypage',
  mypageProfile: '/mypage/profile',
  mypagePreferences: '/mypage/preferences',
  support: '/support',
  terms: '/terms',

  courseCreate: '/courses/create',

  // courseId + generationId 를 모두 path 에 담아 새로고침 시 화면을 복구한다.
  courseGenerating: (courseId: string, generationId: string) =>
    `/courses/${courseId}/generating/${generationId}`,
  courseRecommendations: (courseId: string, generationId: string) =>
    `/courses/${courseId}/recommendations/${generationId}`,
  courseCandidateDetail: (courseId: string, generationId: string, candidateId: string) =>
    `/courses/${courseId}/recommendations/${generationId}/candidates/${candidateId}`,
  courseDetail: (courseId: string) => `/courses/${courseId}`,

  albumDetail: (albumId: string) => `/albums/${albumId}`,
  notifications: '/notifications',
  review: (courseId: string) => `/reviews/${courseId}`,
} as const
