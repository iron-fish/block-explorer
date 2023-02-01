import { Box, Flex } from '@ironfish/ui-kit'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import Head from 'next/head'
import { CustomAssetsTable } from 'components/CustomAssets/CustomAssetsTable/CustomAssetsTable'

const assets = Array.from({ length: 100 }).map((_, i) => ({
  id: i.toString(),
  name: `Mock asset #${i}`,
  owner: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  total_supply: i * 500000 + 1000000,
  created_at: 0 + i * 1000 * 60 * 60 * 24,
  metadata: 'Hello world',
  transaction:
    '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
}))

export default function Assets() {
  return (
    <main style={{ width: '100%', height: '100%' }}>
      <Head>
        <title>Iron Fish: Assets</title>
      </Head>
      <Box mx={{ base: '2rem', lg: '15%' }}>
        <Flex
          pt="2.5rem"
          w="100%"
          alignItems="center"
          justifyContent="space-between"
        >
          <Breadcrumbs />
        </Flex>
        <Box my="0.5rem">
          <h3>All Assets</h3>
        </Box>
        <CustomAssetsTable assets={assets} />
      </Box>
    </main>
  )
}
