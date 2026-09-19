export interface AlternativeCourse {
  id: string
  title: string
  summary: string
  imageUrl: string | null
}

export interface FamilyCourse {
  id: string
  title: string
  region: string
  imageUrl: string | null
  dDay?: string
  date?: string
  tags: string[]
  alternativeCandidates: AlternativeCourse[]
}
