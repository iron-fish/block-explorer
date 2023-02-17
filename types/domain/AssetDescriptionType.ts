import { isObject } from 'utils/isObject'

export interface AssetDescriptionType {
  object: 'asset_description'
  id: number
  transaction_hash: string
  type: 'BURN' | 'MINT'
  value: string
}

export function isAssetDescription(
  maybeAsset: unknown
): maybeAsset is AssetDescriptionType {
  if (!isObject(maybeAsset)) return false

  const obj = maybeAsset as object

  return 'object' in obj && obj.object === 'asset_description'
}

export default AssetDescriptionType
