import { Box, Flex, Skeleton } from '@ironfish/ui-kit'

import Head from 'next/head'
import useInfiniteBlocks from 'hooks/useInfiniteBlocks'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { ChainTree } from 'components/ChainTree'
import BlocksViewButtons from 'components/BlocksViewButtons'

const ChainExplorer = () => {
  const [
    {
      loaded,
      data: { data, metadata },
      error,
    },
    loadNext,
  ] = useInfiniteBlocks(20, false, null)
  const [observerRef] = useInfiniteScroll({
    loading: !loaded,
    hasNextPage: metadata?.has_next,
    disabled: !!error,
    onLoadMore: loadNext,
    rootMargin: '0px 0px 400px 0px',
  })

  if ((!loaded && (!data || data.length === 0)) || error) {
    return <Skeleton h="calc(100vh - 6rem)" w="100%" />
  }

  return (
    <>
      <ChainTree blocks={data} head={data[0]} />
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

export default function ChainExplorerPage() {
  return (
    <main style={{ width: '100%', height: '100%' }}>
      <Head>
        <title>Iron Fish: Chain Explorer</title>
      </Head>
      <Box mx={{ base: '2rem', lg: '15%' }}>
        <Flex w="100%" justifyContent="end">
          <Box position="fixed" mt="2.5rem">
            <BlocksViewButtons />
          </Box>
        </Flex>
        <ChainExplorer />
      </Box>
    </main>
  )
}
