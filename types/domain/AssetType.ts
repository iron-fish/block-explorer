import { NATIVE_ASSET_ID } from 'constants/AssetConstants'
import { isObject } from 'utils/isObject'

export type AssetType = {
  object: 'asset'
  id: number
  identifier: string
  name: string
  owner: string
  supply: string
  created_at: number
  metadata: string
  created_transaction_hash: string
  created_transaction_timestamp: string
  verified_metadata: {
    created_at: Date
    updated_at: Date
    symbol?: string
    decimals?: number
    logoURI?: string
    website?: string
  } | null
}

export function isAsset(maybeAsset: unknown): maybeAsset is AssetType {
  if (!isObject(maybeAsset)) return false

  const obj = maybeAsset as object

  return 'object' in obj && obj.object === 'asset'
}

/*
 * Calculate the supply of an asset in major units taking into
 * account the decimals of the asset if it's verified
 */
export function majorSupply(asset: AssetType): string {
  // The native asset supply is already in the major unit
  if (asset.identifier === NATIVE_ASSET_ID) return asset.supply

  const supply = asset.supply
  const decimals = asset.verified_metadata?.decimals || 0

  if (decimals === 0) return supply

  const before = supply.slice(0, -decimals)
  const after = supply.slice(-decimals)

  return `${before || 0}.${after.padStart(decimals, '0')}`
}

export default AssetType
