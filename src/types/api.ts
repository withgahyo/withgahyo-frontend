export interface ApiResponse<T> {
  isSuccess: boolean
  code: string
  message: string
  result: T
}

export interface ApiError {
  code: string
  message: string
  status?: number
  cause?: unknown
}
