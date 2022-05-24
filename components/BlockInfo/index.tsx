import size from 'byte-size'
import { useTranslation } from 'hooks/useTranslation'
import { Box, useBreakpointValue } from '@ironfish/ui-kit'

import unless from 'ramda/src/unless'
import equals from 'ramda/src/equals'
import pipe from 'ramda/src/pipe'

import { formatBlockTimestamp } from 'utils/format'
import { CardContainer, Card } from 'components'
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
import safeProp from 'utils/safeProp'
import { TransactionsTable } from 'components/TransactionsTable'

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
    value: pipe(
      safeProp('hash'),
      unless(equals(''), hash => truncateHash(hash, 2, 4))
    ),
    icon: <DifficultyIcon />,
  },
  {
    key: 'size-card',
    label: 'Size',
    value: pipe(safeProp('size'), size, z => z.toString()),
    icon: <BlockInfoSizeIcon />,
  },
  {
    key: 'difficulty-card',
    label: 'Difficulty',
    value: safeProp('difficulty'),
    icon: <BlockInfoDifficultyIcon />,
  },
  {
    key: 'txn-card',
    label: 'Transactions Count',
    value: safeProp('transactions_count'),
    icon: <BlockInfoTxnIcon />,
  },
  {
    key: 'timestamp-card',
    label: 'Timestamp',
    value: formatBlockTimestamp,
    icon: <BlockInfoTimestampIcon />,
  },
  {
    key: 'graffiti-card',
    label: 'Graffiti',
    value: safeProp('graffiti'),
    icon: <BlockInfoGraffitiIcon />,
  },
]

export const BlockInfo = ({ id }) => {
  const { t } = useTranslation('c-blockinfo')
  const cardWidth = useBreakpointValue({
    base: '100%',
    sm: 'calc(50% - 1rem)',
    md: 'calc(33.333333% - 1rem)',
  })
  const block = useBlockBySeq(id)

  return (
    <>
      <Box mt="0.5rem" mb="2rem">
        <h3>{t('info-info')}</h3>
      </Box>
      <CardContainer>
        {BLOCK_CARDS.map(card => (
          <Card
            key={card.key}
            mb="1rem"
            w={cardWidth}
            label={card.label}
            value={card.value(block.data)}
            icon={card.icon}
            isLoading={!block.loaded}
          />
        ))}
      </CardContainer>
      <Box my="0.5rem">
        <h3>{t('info-tx')}</h3>
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
export default BlockInfo
