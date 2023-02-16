import { isObject } from 'utils/isObject'

export interface AssetDescriptionType {
  object: 'asset'
  created_transaction_hash: string
  id: number
  identifier: string
  metadata: string
  name: string
  owner: string
  supply: string
}

export function isAsset(
  maybeAsset: unknown
): maybeAsset is AssetDescriptionType {
  if (!isObject(maybeAsset)) return false

  const obj = maybeAsset as object

  return 'object' in obj && obj.object === 'asset'
}

export default AssetDescriptionType
