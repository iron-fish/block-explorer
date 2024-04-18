import { Box, Flex } from '@ironfish/ui-kit'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import Head from 'next/head'
import { CustomAssetsTable } from 'components/CustomAssets/CustomAssetsTable/CustomAssetsTable'
import { useInfiniteQuery } from '@tanstack/react-query'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import axios, { AxiosResponse } from 'axios'
import { AssetType, majorSupply, ResponseType } from 'types'
import { useMemo } from 'react'
import NativeAsset from 'components/CustomAssets/NativeAsset/NativeAsset'

const PAGE_SIZE = 20

async function fetchAssets(
  lastCursor: number | undefined
): Promise<AxiosResponse<ResponseType<AssetType[]>>> {
  const fetchedAssets = await axios.get('/api/assets', {
    params: {
      after: lastCursor,
      limit: PAGE_SIZE,
    },
  })
  return fetchedAssets
}

export default function Assets() {
  const { fetchNextPage, hasNextPage, ...result } = useInfiniteQuery({
    refetchOnWindowFocus: false,
    queryKey: ['assets-list'],
    queryFn: ({ pageParam }) => fetchAssets(pageParam),
    getNextPageParam: (lastPage, _allPages) => {
      if (!lastPage.data.metadata.has_next) {
        return undefined
      }
      const lastCursor = lastPage.data.data[lastPage.data.data.length - 1].id
      return lastCursor
    },
  })

  const [observerRef] = useInfiniteScroll({
    loading: result.isLoading,
    hasNextPage: hasNextPage,
    onLoadMore: fetchNextPage,
    disabled: !!result.error,
    rootMargin: '0px 0px 320px 0px',
  })

  const assets = useMemo(() => {
    return result.data?.pages.flatMap(item => {
      return item.data.data.map(asset => ({
        ...asset,
        created_at: 0,
        supply: majorSupply(asset),
      }))
    })
  }, [result.data?.pages])

  return (
    <>
      <Head>
        <title>Iron Fish: Assets</title>
      </Head>
      <Flex
        pt="2.5rem"
        w="100%"
        alignItems="center"
        justifyContent="space-between"
      >
        <Breadcrumbs />
      </Flex>
      <NativeAsset />
      <Box my="0.5rem">
        <h3>All Assets</h3>
      </Box>
      <CustomAssetsTable
        assets={result.isLoading ? new Array(PAGE_SIZE).fill(null) : assets}
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
