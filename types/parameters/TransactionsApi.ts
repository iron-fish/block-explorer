export interface TransactionsParameters {
  after?: number
  before?: number
  limit?: number
  search?: string
  with_blocks?: boolean
}

export interface FindTransactionParameters {
  hash?: string
  with_blocks?: boolean
}
