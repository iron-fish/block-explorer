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
  if (asset.identifier === NATIVE_ASSET_ID) {
    return asset.supply
  }

  // If supply is not a number, return the original value
  let supply: bigint
  try {
    supply = BigInt(asset.supply)
  } catch (e) {
    return asset.supply
  }

  const decimals = asset.verified_metadata?.decimals || 0

  // Do BigInt division with 3 decimal place precision
  const precision = 3
  const major =
    Number(
      (BigInt(supply) * BigInt(10 ** precision)) / BigInt(10 ** decimals)
    ) /
    10 ** precision

  return major.toString()
}

export default AssetType
