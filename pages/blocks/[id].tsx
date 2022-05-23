import size from 'byte-size'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Box, Flex, useBreakpointValue } from '@ironfish/ui-kit'
import { parseISO, intlFormat } from 'date-fns'

import { Card } from 'components'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import useBlockBySeq from 'hooks/useBlockBySeq'
import {
  DifficultyIcon,
  BlockInfoHeightIcon,
  BlockInfoSizeIcon,
  BlockInfoDifficultyIcon,
  BlockInfoTxnIcon,
  BlockInfoTimestampIcon,
  BlockInfoGraffitiIcon,
} from 'svgx'
import { truncateHash } from 'utils/hash'
import { TransactionsTable } from 'components/TransactionsTable'
import { BlockType } from 'types'

const BLOCK_CARDS = [
  {
    key: 'height-card',
    label: 'Height',
    value: (block: BlockType | null) => block?.sequence,
    icon: <BlockInfoHeightIcon height={47} width={47} />,
  },
  {
    key: 'hash-card',
    label: 'Block hash',
    value: (block: BlockType | null) => truncateHash(block?.hash, 2, 4),
    icon: <DifficultyIcon />,
  },
  {
    key: 'size-card',
    label: 'Size',
    value: (block: BlockType | null) => size(block?.size).toString(),
    icon: <BlockInfoSizeIcon />,
  },
  {
    key: 'difficulty-card',
    label: 'Difficulty',
    value: (block: BlockType | null) => block?.difficulty,
    icon: <BlockInfoDifficultyIcon />,
  },
  {
    key: 'txn-card',
    label: 'Transactions Count',
    value: (block: BlockType | null) => block?.transactions_count,
    icon: <BlockInfoTxnIcon />,
  },
  {
    key: 'timestamp-card',
    label: 'Timestamp',
    value: (block: BlockType | null) => {
      // eslint-disable-next-line no-console
      console.log({ block })
      const date = parseISO(block?.timestamp ?? '')
      // eslint-disable-next-line no-console
      console.log({ date })
      return intlFormat(date)
    },
    icon: <BlockInfoTimestampIcon />,
  },
  {
    key: 'graffiti-card',
    label: 'Graffiti',
    value: (block: BlockType | null) => block?.graffiti,
    icon: <BlockInfoGraffitiIcon />,
  },
]

const BlockInfo = ({ id }) => {
  const cardWidth = useBreakpointValue({
    base: '100%',
    sm: 'calc(50% - 1rem)',
    md: 'calc(33% - 1rem)',
  })
  const block = useBlockBySeq(id)

  return (
    <>
      <Box mt="0.5rem" mb="2rem">
        <h3>Block Information</h3>
      </Box>
      <Flex w="100%" wrap="wrap" mb="3.5rem" mx="-0.5rem">
        {BLOCK_CARDS.map(card => (
          <Card
            key={card.key}
            m="0.5rem"
            w={cardWidth}
            label={card.label}
            value={card.value(block.data)}
            icon={card.icon}
            isLoading={!block.loaded}
          />
        ))}
      </Flex>
      <Box my="0.5rem">
        <h3>Transactions</h3>
      </Box>
      <TransactionsTable
        data={
          block.loaded
            ? block.data?.transactions.map(transaction => ({
                ...transaction,
                blocks: [block.data],
              }))
            : [null]
        }
      />
    </>
  )
}

export default function BlockInformationPage() {
  const router = useRouter()
  const { id } = router.query

  return (
    <main style={{ width: '100%', height: '100%' }}>
      <Head>
        <title>Iron Fish: Block {id}</title>
      </Head>
      <Box mx={{ base: '2rem', lg: '15%' }} mb="6rem" zIndex={1}>
        <Box mt="2.5rem">
          <Breadcrumbs />
        </Box>
        <BlockInfo id={id} />
      </Box>
    </main>
  )
}
