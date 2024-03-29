import { useMemo } from 'react'
import Head from 'next/head'
import { Flex, Box } from '@ironfish/ui-kit'

import useBlocksMetrics from 'hooks/useBlocksMetrics'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import UniqueGraffiti from 'components/Charts/UniqueGraffiti'
import TransactionVolume from 'components/Charts/TransactionVolume'
import Difficulty from 'components/Charts/Difficulty'
import BlockTime from 'components/Charts/BlockTime'
import { BlockMetricGranularity } from 'constants/BlockConstants'
import BlockSize from 'components/Charts/BlockSize'

export default function Charts() {
  const startDate = useMemo(() => {
    const date = new Date()
    date.setDate(date.getDate() - 88)
    return date
  }, [])

  const endDate = useMemo(() => {
    const date = new Date()
    date.setDate(date.getDate() + 1)
    return date
  }, [])

  const { data, loaded } = useBlocksMetrics(
    startDate,
    endDate,
    BlockMetricGranularity.Day
  )

  return (
    <>
      <Head>
        <title>Iron Fish: Charts</title>
      </Head>
      <Box mb="9.375rem">
        <Box mt="2.5rem">
          <Breadcrumbs />
        </Box>
        <Box mt="0.5rem" mb="2rem">
          <h3>All Charts</h3>
        </Box>
        <Flex align="center">
          {loaded && (
            <Flex gap={'2rem'} direction="column" width={'100%'}>
              <UniqueGraffiti data={data} />
              <TransactionVolume data={data} />
              <Difficulty data={data} />
              <BlockTime data={data} />
              <BlockSize data={data} />
            </Flex>
          )}
        </Flex>
      </Box>
    </>
  )
}
