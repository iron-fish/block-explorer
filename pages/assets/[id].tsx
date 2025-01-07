import Head from 'next/head'
import { useRouter } from 'next/router'
import { Box, Flex, HStack, NAMED_COLORS, Spinner } from '@ironfish/ui-kit'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import { AssetInformationGrid } from 'components/CustomAssets/AssetInformationGrid/AssetInformationGrid'
import { AssetHistory } from 'components/CustomAssets/AssetHistory/AssetHistory'
// import { AssetTransactionChart } from 'components/CustomAssets/AssetTransactionChart/AssetTransactionChart'
import useAsset from 'hooks/useAsset'
import { useMemo } from 'react'
import useAssetDescriptions from 'hooks/useAssetDescriptions'
import { InfoBadge } from 'components'
import { NATIVE_ASSET_ID } from 'constants/AssetConstants'
import { majorSupply } from 'types'

export default function AssetInfo() {
  const router = useRouter()
  const { id } = router.query

  const assetId = id as string
  const asset = useAsset(assetId)

  const isNativeAsset = assetId === NATIVE_ASSET_ID
  const descriptions = useAssetDescriptions({
    asset: isNativeAsset ? null : assetId,
  })

  if (asset.error) {
    throw asset.error
  }

  const assetDetails = useMemo(() => {
    if (!asset.loaded) {
      return {
        created_transaction_hash: '—',
        id: '—',
        identifier: '—',
        metadata: '—',
        name: 'Loading...',
        object: 'asset',
        owner: '—',
        supply: '—',
        verified_metadata: null,
      }
    }

    return {
      ...asset.data,
      supply: majorSupply(asset.data),
    }
  }, [asset])

  return (
    <>
      <Head>
        <title>{`Iron Fish: Asset: ${id}`}</title>
      </Head>
      <Box mb="6rem" zIndex={1}>
        <Flex mt="2.5rem">
          <Breadcrumbs />
        </Flex>
        <Flex mt="0.5rem" mb="2rem">
          <h3>Asset Information</h3>
          {assetDetails.verified_metadata && (
            <InfoBadge
              ml="1rem"
              message="Verified"
              display="flex"
              alignItems="center"
            />
          )}
        </Flex>
        <AssetInformationGrid
          loading={!asset.loaded}
          assetDetails={assetDetails}
        />
        {!isNativeAsset &&
          asset.loaded &&
          (descriptions.loaded ? (
            <>
              <Box my="0.5rem">
                <h3>Asset History</h3>
              </Box>
              <AssetHistory
                assetHistory={descriptions.data}
                assetData={asset.data}
              />
            </>
          ) : (
            <HStack justifyContent="center" py="6rem">
              <Spinner
                color={NAMED_COLORS.LIGHT_BLUE}
                emptyColor={NAMED_COLORS.LIGHT_GREY}
                size="xl"
                thickness="0.25rem"
                speed="0.75s"
              />
            </HStack>
          ))}
        <Box mb="8rem" />
        {/* <Box mt="0.5rem" mb="2rem">
          <h3>Asset History Chart</h3>
        </Box>
        <AssetTransactionChart /> */}
      </Box>
    </>
  )
}
