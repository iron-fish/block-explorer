import { Box, Flex } from '@ironfish/ui-kit'
import size from 'byte-size'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { pipe } from 'ramda'

import {
  CardsView,
  CopyValueToClipboard,
  HashView,
  InfoBadge,
  TimeStamp
} from 'components'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import { TransactionsTable } from 'components/TransactionsTable'
import { MAX_BLOCK_SIZE } from 'constants/BlockConstants'
import useBlock from 'hooks/useBlock'
import {
  BlockInfoDifficultyIcon,
  BlockInfoGraffitiIcon,
  BlockInfoHeightIcon,
  BlockInfoSizeIcon,
  BlockInfoTimestampIcon,
  BlockInfoTxnIcon,
  DifficultyIcon,
  PickIcon
} from 'svgx'
import { BlockType } from 'types'
import { BufferUtils } from 'utils/buffer'
import { formatTimeSinceLastBlock } from 'utils/format/formatTimeSinceLastBlock'
import safeProp from 'utils/safeProp'

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
    value: pipe(safeProp('graffiti'), graffiti => {
      const hexRegex = /^[0-9A-Fa-f]+$/g
      if (hexRegex.test(graffiti)) {
        graffiti = BufferUtils.toHuman(Buffer.from(graffiti, 'hex'))
      }
      return <Box wordBreak="break-all">{graffiti}</Box>
    }),
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
