export interface FamilyCourse {
  id: string
  title: string
  region: string
  imageUrl: string | null
  dDay?: string
  date?: string
  tags: string[]
}

export interface FavoriteCourse {
  id: string
  title: string
  region: string
  imageUrl: string | null
}
