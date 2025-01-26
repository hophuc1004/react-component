export interface ListResponse<T> {
  contents: Array<T>
  currentPage: number
  lastPage: number
  next: number | null
  perPage: number
  prev: number | null
  total: number
}

export interface ListResponseLeaveTaken<T> {
  paidData?: any
  unpaidData?: any
}

export interface BaseResponse<T = unknown> {
  data: T
  message: string
  status: number
  statusCode: number
}
