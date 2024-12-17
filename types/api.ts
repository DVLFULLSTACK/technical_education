export type ApiResponse<T> = {
  data: T
  message: string
  status: boolean
}

export interface ErrorResponse extends Error {
  status: boolean
  statusCode: number
  message: string
}
