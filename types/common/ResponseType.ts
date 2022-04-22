export interface ResponseType<T> {
  data: T,
  metadata?: {
    has_next: boolean
    has_previous: boolean
  }
  object: string
}

export default ResponseType
