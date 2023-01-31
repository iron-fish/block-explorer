import { useRef, useState, useEffect } from 'react'
import { Box, Flex } from '@ironfish/ui-kit'
import { BlocksTable } from 'components'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import useInfiniteBlocks from 'hooks/useInfiniteBlocks'
import Head from 'next/head'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { CustomAssetsTable } from 'components/CustomAssets/CustomAssetsTable/CustomAssetsTable'

const BLOCK_CHUNK_SIZE = 20

const InfiniteBlocks = ({ reload, onReloaded }) => {
  const [
    {
      loaded,
      data: { data, metadata },
      error,
    },
    loadNext,
    reloadBlocks,
  ] = useInfiniteBlocks(BLOCK_CHUNK_SIZE)
  const [observerRef] = useInfiniteScroll({
    loading: !loaded,
    hasNextPage: metadata?.has_next,
    disabled: !!error,
    onLoadMore: loadNext,
    rootMargin: '0px 0px 320px 0px',
  })

  useEffect(() => {
    if (reload) {
      reloadBlocks().then(onReloaded)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload])

  return (
    <>
      <BlocksTable
        data={
          loaded ? data : data.concat(new Array(BLOCK_CHUNK_SIZE).fill(null))
        }
      />
      <span
        ref={observerRef}
        style={{
          background: 'transparent',
          border: 'none',
          height: '0',
          width: '100%',
        }}
      />
    </>
  )
}

export default function Assets() {
  const containerRef = useRef(null)
  const [reload, setReload] = useState(false)

  return (
    <main ref={containerRef} style={{ width: '100%', height: '100%' }}>
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
        <CustomAssetsTable />
      </Box>
    </main>
  )
}
