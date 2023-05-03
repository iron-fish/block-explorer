import size from 'byte-size'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Box, Flex } from '@ironfish/ui-kit'

import { pipe } from 'ramda'

import {
  CardsView,
  TimeStamp,
  CopyValueToClipboard,
  InfoBadge,
} from 'components'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import {
  DifficultyIcon,
  BlockInfoHeightIcon,
  BlockInfoSizeIcon,
  BlockInfoDifficultyIcon,
  BlockInfoTxnIcon,
  BlockInfoTimestampIcon,
  BlockInfoGraffitiIcon,
  PickIcon,
} from 'svgx'
import safeProp from 'utils/safeProp'
import { TransactionsTable } from 'components/TransactionsTable'
import { HashView } from 'components'
import { BlockType } from 'types'
import useBlock from 'hooks/useBlock'
import { MAX_BLOCK_SIZE } from 'constants/BlockConstants'
import { formatTimeSinceLastBlock } from 'utils/format/formatTimeSinceLastBlock'

const BLOCK_CARDS = [
  {
    key: 'height-card',
    label: 'Height',
    value: safeProp('sequence'),
    icon: <BlockInfoHeightIcon height={47} width={47} />,
  },
  {
    key: 'hash-card',
    label: 'Block hash',
    value: block => {
      const hash = safeProp('hash')(block)
      return (
        <CopyValueToClipboard
          value={hash}
          label={<HashView hash={hash} parts={2} />}
        />
      )
    },
    icon: <DifficultyIcon />,
  },
  {
    key: 'size-card',
    label: 'Size',
    value: pipe(
      safeProp('size'),
      x =>
        size(x, { precision: 2, units: 'iec' }).toString() +
        '/' +
        size(MAX_BLOCK_SIZE, { precision: 0, units: 'iec' }).toString()
    ),
    icon: <BlockInfoSizeIcon />,
  },
  {
    key: 'difficulty-card',
    label: 'Difficulty',
    value: safeProp('difficulty'),
    icon: <BlockInfoDifficultyIcon />,
  },
  {
    key: 'transactions_count-card',
    label: 'Transactions',
    value: safeProp('transactions_count'),
    icon: <BlockInfoTxnIcon />,
  },
  {
    key: 'timestamp-card',
    label: 'Timestamp',
    value: (block: BlockType) => (
      <TimeStamp timestamp={safeProp('timestamp')(block)} />
    ),
    icon: <BlockInfoTimestampIcon />,
  },
  {
    key: 'graffiti-card',
    label: 'Graffiti',
    value: safeProp('graffiti'),
    icon: <BlockInfoGraffitiIcon />,
  },
  {
    key: 'mining-time-card',
    label: 'Mine Time',
    value: pipe(safeProp('time_since_last_block_ms'), formatTimeSinceLastBlock),
    icon: <PickIcon />,
  },
]

const BlockInfo = ({ id }) => {
  const block = useBlock(id)

  if (block.error) {
    throw block.error
  }

  return (
    <>
      <Flex mt="2.5rem">
        <Breadcrumbs />
      </Flex>
      <Flex mt="0.5rem" mb="2rem">
        <h3>Block Information</h3>
        {block.data?.main === false && (
          <InfoBadge ml={'1rem'} message={'Forked'} />
        )}
      </Flex>
      <CardsView cards={BLOCK_CARDS} data={block} />
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
    <>
      <Head>
        <title>Iron Fish: Block {id}</title>
      </Head>
      <Box mb="6rem" zIndex={1}>
        <BlockInfo id={id} />
      </Box>
    </>
  )
}
