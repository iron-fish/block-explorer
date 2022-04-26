import BlockType from "./BlockType"

export interface TransactionType {
  id: number | string
  hash: string
  fee: string
  size: number
  notes: TransactionNoteType[]
  spends: TransactionSpendType[]
  blocks?: BlockType[]
  object: string
}

interface TransactionNoteType {
  commitment: string
}

interface TransactionSpendType {
  nullifier: string
}

export default TransactionType