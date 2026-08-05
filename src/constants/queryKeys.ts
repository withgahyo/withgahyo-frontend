export const queryKeys = {
  home: ['home'] as const,

  popular: ['popular'] as const,

  notifications: ['notifications'] as const,

  course: (courseId: number) => ['courses', courseId] as const,

  album: (albumId: number) => ['albums', albumId] as const,
}
