import AssetDescriptionType from './AssetDescriptionType'
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
  burns: AssetDescriptionType[]
  mints: AssetDescriptionType[]
  expiration?: number
}

export default TransactionType
