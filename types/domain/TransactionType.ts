import BlockType from './BlockType'

export interface NoteType {
  commitment: string
}

export interface SpendType {
  nullifier: string
}

export interface TransactionType {
  fee: string
  hash: string
  id: number
  notes: NoteType[]
  object: string
  size: number
  spends: SpendType[]
  blocks?: BlockType[]
}

export default TransactionType
