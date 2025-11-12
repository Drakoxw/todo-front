export interface ResponseBase<T> {
  success: boolean
  message: string
  errors?: string[]
  data: T
}

export interface error {
  title: string
  detail: string
}

export interface ErrorsResponse {
  errors: error[]
}
