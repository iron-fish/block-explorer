import Head from 'next/head'
import { useRouter } from 'next/router'
import { Box, Flex } from '@ironfish/ui-kit'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import { AssetInformationGrid } from 'components/CustomAssets/AssetInformationGrid/AssetInformationGrid'
import { AssetHistory } from 'components/CustomAssets/AssetHistory/AssetHistory'
import { AssetTransactionChart } from 'components/CustomAssets/AssetTransactionChart/AssetTransactionChart'
import useAsset from 'hooks/useAsset'
import { useMemo } from 'react'

const asset_details = {
  id: '00000000003ab21806c9a64c1e5cab08a53f8fe61cf1cb42a7dcede286c05ff6',
  name: 'Plastic Shrimp',
  owner: '00000000003507dc5d82cd8204322b4da287d6debbaea79062dfc38a2c81665b',
  total_supply: 500,
  created_at: 1675215712150,
  metadata:
    "Plastic shrimp will rule the world someday. You won't see it coming but suddenly they will be in control and it will be you who the fried rice joke is about.",
  transaction:
    'fd1f531deff6eb4a59b944d70769769d152b3c517a12c399fa5bcf372c62256b',
}

const asset_history: Array<{
  action: 'MINT' | 'BURN'
  quantity: number
  transaction: string
  timestamp: number
}> = [
  {
    action: 'MINT',
    quantity: 34,
    transaction:
      'fd1f531deff6eb4a59b944d70769769d152b3c517a12c399fa5bcf372c62256b',
    timestamp: 1675215712150,
  },
  {
    action: 'MINT',
    quantity: 20,
    transaction:
      'fd1f531deff6eb4a59b944d70769769d152b3c517a12c399fa5bcf372c62256b',
    timestamp: 1675215712150,
  },
  {
    action: 'BURN',
    quantity: 1,
    transaction:
      'fd1f531deff6eb4a59b944d70769769d152b3c517a12c399fa5bcf372c62256b',
    timestamp: 1675215712150,
  },
  {
    action: 'MINT',
    quantity: 200,
    transaction:
      'fd1f531deff6eb4a59b944d70769769d152b3c517a12c399fa5bcf372c62256b',
    timestamp: 1675215712150,
  },
]

export default function AssetInfo() {
  const router = useRouter()
  const { id } = router.query

  const asset = useAsset(id as string)

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
      }
    }

    return asset.data
  }, [asset])

  return (
    <main style={{ width: '100%', height: '100%' }}>
      <Head>
        <title>Iron Fish: Block {id}</title>
      </Head>
      <Box mx={{ base: '2rem', lg: '15%' }} mb="6rem" zIndex={1}>
        <Flex mt="2.5rem">
          <Breadcrumbs />
        </Flex>
        <Flex mt="0.5rem" mb="2rem">
          <h3>Asset Information</h3>
        </Flex>
        <AssetInformationGrid assetDetails={assetDetails} />
        <Box my="0.5rem">
          <h3>Asset History</h3>
        </Box>
        <AssetHistory assetHistory={asset_history} />
        <Box mt="0.5rem" mb="2rem">
          <h3>Asset History Chart</h3>
        </Box>
        <AssetTransactionChart />
      </Box>
    </main>
  )
}
