import { BlockMetricGranularity } from "constants/BlockMetricGranularity"

export interface BlocksParameters {
  after?: number
  before?: number
  limit?: number
  main?: boolean
  search?: string
  sequence_gte?: number
  sequence_lt?: number
  transaction_id?: number
  with_transactions?: boolean
}

export interface FindBlockParameters {
  hash?: string
  sequence?: number
  with_transactions?: boolean
}

export interface BlocksStatisticParameters {
  start: Date
  end: Date
  granularity: BlockMetricGranularity
}
