import TransactionType from './TransactionType'

export interface BlockType {
  id: number | string
  hash: string
  main: boolean
  object: string // ??
  graffiti: string // ??
  difficulty: number | string
  previous_block_hash: string
  sequence: number | string
  size: number
  time_since_last_block_ms: number
  timestamp: string
  transactions_count: number
  transactions?: TransactionType[]
}

export default BlockType
