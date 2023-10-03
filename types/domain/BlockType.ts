import TransactionType from './TransactionType'

export interface BlockType {
  id: number | string
  hash: string
  main: boolean
  object: string // ??
  graffiti: string // ??
  difficulty: number | string
  previous_block_hash: string
  sequence: number
  size: number
  time_since_last_block_ms: number
  timestamp: string
  transactions_count: number
  transactions?: TransactionType[]
}

export interface BlockHead extends BlockType {
  circulating_supply: number;
  total_supply: number;
}

export function isBlock(x: unknown): x is BlockType {
  return typeof x === 'object' && !!x && 'transactions' in x && !('block' in x)
}

export default BlockType
