import size from 'byte-size'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Box, Flex } from '@ironfish/ui-kit'

import { pipe } from 'ramda'

import {
  CardContainer,
  Card,
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
    value: pipe(safeProp('size'), x => size(x, { precision: 2 }).toString()),
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
  null,
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
      <CardContainer>
        {BLOCK_CARDS.map(card =>
          card ? (
            <Card
              key={card.key}
              mb="1rem"
              width={{
                base: 'max(20rem, 100% - 0.5rem)',
                md: 'max(20rem, 50% - 1rem)',
                '2xl': 'max(20rem, 33.333333% - 1rem)',
              }}
              label={card.label}
              value={card.value(block.data)}
              icon={card.icon}
              isLoading={!block.loaded}
            />
          ) : (
            <Box
              key={null}
              width={{
                base: 'max(20rem, 100% - 0.5rem)',
                md: 'max(20rem, 50% - 1rem)',
                '2xl': 'max(20rem, 33.333333% - 1rem)',
              }}
            />
          )
        )}
      </CardContainer>
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
        <BlockInfo id={id} />
      </Box>
    </main>
  )
}
