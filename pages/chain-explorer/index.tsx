import { useEffect, useState } from 'react'
import { Box, Flex, Skeleton } from '@ironfish/ui-kit'
import { useRouter } from 'next/router'

import Head from 'next/head'
import useBidirectionalInfiniteScroll from 'hooks/useBidirectionalInfiniteScroll'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { ChainTree } from 'components/ChainTree'
import BlocksViewButtons from 'components/BlocksViewButtons'

const BLOCKS_LIMIT = 20

const ChainExplorer = ({ after = null }) => {
  const [
    {
      loaded,
      data: { data, metadata },
      error,
    },
    loadNext,
    loadPrev,
  ] = useBidirectionalInfiniteScroll(BLOCKS_LIMIT, false, null, after)

  const [focused, setFocused] = useState(!after)
  const [lastHeadId, setLastHeadId] = useState(null)

  const [observerRef] = useInfiniteScroll({
    loading: !loaded,
    hasNextPage: metadata?.has_next,
    disabled: focused && !!error,
    onLoadMore: loadNext,
    rootMargin: '0px 0px 400px 0px',
  })

  const [observerTopRef] = useInfiniteScroll({
    loading: !loaded,
    hasNextPage: metadata?.has_previous,
    disabled: true || (focused && !!error),
    onLoadMore: loadPrev,
    rootMargin: '200px 0px 0px 0px',
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!focused && loaded && after) {
      const component = document.getElementById(`chain-tree-node-${after}`)
      if (component && !focused) {
        component.scrollIntoView({ block: 'center' })
        // component.focus()
        setFocused(true)
      }
    }
  })

  useEffect(() => {
    if (data[0]?.id && data?.length > BLOCKS_LIMIT * 2) {
      if (lastHeadId) {
        const component = document.getElementById(
          `chain-tree-node-${lastHeadId}`
        )
        if (component) {
          component.scrollIntoView({ block: 'center' })
        }
      }
      setLastHeadId(data[0].id)
    }
  }, [data])

  if ((!loaded && (!data || data.length === 0)) || error) {
    return <Skeleton h="calc(100vh - 6rem)" w="100%" />
  }

  return (
    <>
      <span
        ref={observerTopRef}
        style={{
          background: 'transparent',
          border: 'none',
          height: '0',
          width: '100%',
        }}
      />
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
  const router = useRouter()

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
        {/* {process.browser && <Minimap of={renderPage()} />} */}
        <ChainExplorer after={router.query?.after || null} />
      </Box>
    </main>
  )
}
