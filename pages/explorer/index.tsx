import { Box } from '@ironfish/ui-kit'
import { BlocksTable } from 'components'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import useInfiniteBlocks from 'hooks/useInfiniteBlocks'
import Head from 'next/head'
import useInfiniteScroll from "react-infinite-scroll-hook";

const BLOCK_CHUNK_SIZE = 20

const InfiniteBlocks = () => {
  const [{
    loaded,
    data: { data, metadata },
    error
  }, loadNext] = useInfiniteBlocks(BLOCK_CHUNK_SIZE)
  const [observerRef] = useInfiniteScroll({
    loading: !loaded,
    hasNextPage: metadata?.has_next,
    disabled: !!error,
    onLoadMore: loadNext,
    rootMargin: "0px 0px 400px 0px"
  });

  return (
    <>
      <BlocksTable data={loaded ? data : data.concat(new Array(BLOCK_CHUNK_SIZE).fill(null))} />
      <span ref={observerRef} style={{ background: 'transparent', border: 'none', height: '0', width: '100%' }} />
    </>
  )
}

export default function Explorer() {
  return (
    <main style={{ width: '100%', height: '100%' }}>
      <Head>
        <title>Iron Fish: Explorer</title>
      </Head>
      <Box mx={{ base: '2rem', lg: '15%' }}>
        <Box mt="2.5rem">
          <Breadcrumbs />
        </Box>
        <Box my="0.5rem">
          <h3>All Blocks</h3>
        </Box>
        <InfiniteBlocks />
      </Box>
    </main>
  )
}
