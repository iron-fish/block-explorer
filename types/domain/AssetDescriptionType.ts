import { isObject } from 'utils/isObject'

export interface AssetDescriptionType {
  object: 'asset_description'
  type: 'BURN' | 'MINT'
  transaction_hash: string
  value: string
  id: number
  block_timestamp?: string
  asset: {
    identifier: string
    name: string
  }
}

export function isAssetDescription(
  maybeAsset: unknown
): maybeAsset is AssetDescriptionType {
  if (!isObject(maybeAsset)) return false

  const obj = maybeAsset as object

  return 'object' in obj && obj.object === 'asset_description'
}

export default AssetDescriptionType
