import TransactionType from "./TransactionType"

export interface BlockType {
  id: number,
  hash: string,
  main: boolean,
  object: string, // ??
  graffiti: string, // ??
  difficulty: number | string,
  previous_block_hash: string,
  sequence: number,
  size: number,
  time_since_last_block_ms: number,
  timestamp: string,
  transactions_count: number
  transactions?: TransactionType[]
}

export default BlockType