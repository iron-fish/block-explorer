import { useRef, useState, useEffect } from 'react'
import { Box, Flex } from '@ironfish/ui-kit'
import { BlocksTable } from 'components'
// import BlocksViewButtons from 'components/BlocksViewButtons'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import useInfiniteBlocks from 'hooks/useInfiniteBlocks'
import useBlockHeadWithInterval from 'hooks/useBlockHeadWithInterval'
import Head from 'next/head'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import RefreshButton from 'components/RefreshButton'

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
    rootMargin: '0px 0px 320px 0px', //Do not use rem here or it cause the error 'rootMargin must be specified in pixels or percent'.
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

export default function Explorer() {
  const containerRef = useRef(null)
  const [reload, setReload] = useState(false)
  const [showReload, setShowReload] = useState(false)
  const $headBlock = useBlockHeadWithInterval(15000)
  const [, setLastBlockId] = useState(null)

  useEffect(() => {
    if ($headBlock.data?.id) {
      setLastBlockId(prevLastId => {
        if (prevLastId && prevLastId !== $headBlock.data?.id) {
          setShowReload(true)
        }
        return $headBlock.data?.id
      })
    }
  }, [$headBlock.data?.id])

  return (
    <main ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <RefreshButton
        isVisible={showReload}
        offsetTop={containerRef.current?.offsetTop}
        onClick={() => {
          setReload(prev => !prev)
          window.scrollTo(0, 0)
          setShowReload(false)
        }}
      />
      <Head>
        <title>Iron Fish: Explorer</title>
      </Head>
      <Box mx={{ base: '2rem', lg: '15%' }}>
        <Flex
          pt="2.5rem"
          w="100%"
          alignItems="center"
          justifyContent="space-between"
        >
          <Breadcrumbs />
          {/* Hide chain explorer switch button while its not finished */}
          {/* <BlocksViewButtons /> */}
        </Flex>
        <Box my="0.5rem">
          <h3>All Blocks</h3>
        </Box>
        <InfiniteBlocks reload={reload} onReloaded={() => setReload(false)} />
      </Box>
    </main>
  )
}
