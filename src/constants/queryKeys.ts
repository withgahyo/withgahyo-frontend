export const queryKeys = {
  home: ['home'] as const,

  popular: ['popular'] as const,
  communityPosts: (params: object) => ['community', 'posts', params] as const,
  communityRecommendations: (size: number) => ['community', 'recommendations', size] as const,
  communityPost: (postId: number) => ['community', 'posts', postId] as const,
  communityComments: (postId: number) => ['community', 'posts', postId, 'comments'] as const,
  pendingReviews: ['reviews', 'pending'] as const,
  myReviews: ['reviews', 'me'] as const,
  reviewForm: (courseId: number) => ['reviews', 'form', courseId] as const,
  myReview: (courseId: number) => ['reviews', 'me', courseId] as const,

  notifications: ['notifications'] as const,

  onboarding: ['onboarding'] as const,
  onboardingTourismOptions: ['onboarding', 'tourism-options'] as const,
  onboardingFoodOptions: ['onboarding', 'food-options'] as const,

  course: (courseId: number) => ['courses', courseId] as const,
  courseGeneration: (generationId: number) => ['course-generations', generationId] as const,
  courseCandidates: (generationId: number) =>
    ['course-generations', generationId, 'candidates'] as const,
  courseCandidate: (generationId: number, candidateId: number) =>
    ['course-generations', generationId, 'candidates', candidateId] as const,
  courseRegions: ['course', 'regions'] as const,
  coursePlaces: (areaCode: string, sigunguCode: string, query: string) =>
    ['course', 'places', areaCode, sigunguCode, query] as const,
  courseKeywords: ['course', 'keywords'] as const,
  courseFamilyMembers: ['course', 'family-members'] as const,

  album: (albumId: number) => ['albums', albumId] as const,
}
