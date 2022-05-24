import { Box, Flex } from '@ironfish/ui-kit'
import { useTranslation } from 'hooks/useTranslation'
import { BlocksTable } from 'components'
import BlocksViewButtons from 'components/BlocksViewButtons'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import useInfiniteBlocks from 'hooks/useInfiniteBlocks'
import Head from 'next/head'
import useInfiniteScroll from 'react-infinite-scroll-hook'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const BLOCK_CHUNK_SIZE = 20

const InfiniteBlocks = () => {
  const [
    {
      loaded,
      data: { data, metadata },
      error,
    },
    loadNext,
  ] = useInfiniteBlocks(BLOCK_CHUNK_SIZE)
  const [observerRef] = useInfiniteScroll({
    loading: !loaded,
    hasNextPage: metadata?.has_next,
    disabled: !!error,
    onLoadMore: loadNext,
    rootMargin: '0px 0px 320px 0px', //Do not use rem here or it cause the error 'rootMargin must be specified in pixels or percent'.
  })

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
  const { t } = useTranslation(['p-explorer'])
  return (
    <main style={{ width: '100%', height: '100%' }}>
      <Head>
        <title>{t('meta-title')}</title>
      </Head>
      <Box mx={{ base: '2rem', lg: '15%' }}>
        <Flex
          mt="2.5rem"
          w="100%"
          alignItems="center"
          justifyContent="space-between"
        >
          <Breadcrumbs />
          <BlocksViewButtons />
        </Flex>
        <Box my="0.5rem">
          <h3>{t('info-subtitle')}</h3>
        </Box>
        <InfiniteBlocks />
      </Box>
    </main>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  }
}
