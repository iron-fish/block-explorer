import { useEffect, useRef, useState } from 'react'
import { Box, Flex, Skeleton } from '@ironfish/ui-kit'
import { useRouter } from 'next/router'

import Head from 'next/head'
import useBidirectionalInfiniteScroll from 'hooks/useBidirectionalInfiniteScroll'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { ChainTree } from 'components/ChainTree'
import BlocksViewButtons from 'components/BlocksViewButtons'
import { BlockType } from 'types'

const BLOCKS_LIMIT = 20

const scrollToBlock = (blockId, setFocus = false) => {
  const component = document.getElementById(`chain-tree-node-${blockId}`)
  if (component) {
    component.scrollIntoView({ block: 'center' })
    setFocus && component.focus()
    return true
  }
  return false
}

const ChainExplorer = ({ blockId = null }) => {
  const [
    {
      loaded,
      data: { data, metadata },
      error,
    },
    loadNext,
    loadPrev,
  ] = useBidirectionalInfiniteScroll(BLOCKS_LIMIT, false, null, blockId)

  const $focusedBlock = useRef<BlockType>(null)
  const [$focused, $setFocused] = useState(false)

  const [observerTopRef] = useInfiniteScroll({
    loading: !loaded,
    hasNextPage: metadata?.has_previous,
    disabled: !blockId || !!error,
    onLoadMore: () => {
      loadPrev().then(() => {
        if (data[0].id) {
          const interval = setInterval(() => {
            if (scrollToBlock(data[0].id)) {
              clearInterval(interval)
            }
          }, 500)
        }
      })
    },
    rootMargin: '-95px 0px 0px 0px',
  })

  const [observerRef] = useInfiniteScroll({
    loading: !loaded,
    hasNextPage: metadata?.has_next,
    disabled: !!error,
    onLoadMore: loadNext,
    rootMargin: '0px 0px 400px 0px',
  })

  useEffect(() => {
    if (blockId) {
      const interval = setInterval(() => {
        if (scrollToBlock(blockId, true)) {
          clearInterval(interval)
          $setFocused(true)
        }
      }, 1000)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockId])

  if ((!loaded && (!data || data.length === 0)) || error) {
    return <Skeleton h="calc(100vh - 6rem)" w="100%" />
  }

  if (!$focusedBlock.current && blockId) {
    $focusedBlock.current = data.find(({ id }) => id.toString() === blockId)
  }

  return (
    <>
      <Flex w="100%" justifyContent="end">
        <Box position="fixed" mt="2.5rem">
          <BlocksViewButtons blockId={$focusedBlock.current?.sequence} />
        </Box>
      </Flex>
      <span
        ref={observerTopRef}
        style={{
          display: $focused ? 'block' : 'none',
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
          display: !blockId || $focused ? 'block' : 'none',
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
        <ChainExplorer blockId={router.query?.blockId || null} />
      </Box>
    </main>
  )
}
