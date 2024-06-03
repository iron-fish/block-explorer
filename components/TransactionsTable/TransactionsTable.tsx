import { Box, useBreakpointValue } from '@ironfish/ui-kit'
import {
  ColumnProps,
  CommonTableProps
} from '@ironfish/ui-kit/dist/components/Table/types'
import { pathOr } from 'ramda'
import { FC } from 'react'

import {
  ExplorerCommonTable,
  HashView,
  InfoBadge,
  TableCellTimeStamp
} from 'components'
import TransactionType from 'types/domain/TransactionType'
import { formatNumberWithLanguage } from 'utils/format'
import { safeProp } from 'utils/safeProp'

import { ACTIONS_COLUMN } from 'components/ExplorerCommonTable'
import { BlueHashIcon } from 'svgx'

const TAG_COLUMN: ColumnProps<TransactionType> = {
  key: 'transaction-tag',
  label: '',
  render: transaction =>
    transaction?.spends.length === 0 && (
      <InfoBadge
        mt={{ base: '1rem', lg: 0 }}
        mx={{ base: '2rem', sm1: 0 }}
        message={<>Miner&nbsp;Reward&nbsp;+&nbsp;Fee</>}
      />
    ),
}
const HASH_COLUMN: ColumnProps<TransactionType> = {
  key: 'transaction-hash',
  label: 'Hash',
  render: transaction => {
    const hash = safeProp('hash')(transaction)
    return (
      <>
        <Box mr="1rem">
          <BlueHashIcon pb="0.1rem" h="1.875rem" w="1.625rem" />
        </Box>
        <HashView hash={hash} />
      </>
    )
  },
}
const FEE_COLUMN: ColumnProps<TransactionType> = {
  key: 'transaction-fee',
  label: 'Fee',
  render: transaction => `${formatNumberWithLanguage(transaction.fee)} Ore`,
}
const DATE_COLUMN = {
  key: 'transaction-timestamp',
  label: 'Timestamp',
  render: transaction => (
    <TableCellTimeStamp
      timestamp={pathOr({}, ['blocks', 0])(transaction).timestamp}
    />
  ),
}

type TransactionsTableProps = Omit<CommonTableProps<TransactionType>, 'columns'>

const TransactionsTable: FC<TransactionsTableProps> = props => {
  const columns: ColumnProps<TransactionType>[] = useBreakpointValue({
    base: [
      {
        ...TAG_COLUMN,
        WrapperProps: {
          p: '0rem',
          ml: '-2rem',
          w: 'min-content',
        },
        ItemProps: {
          flexDirection: 'row',
        },
      },
      HASH_COLUMN,
      FEE_COLUMN,
      DATE_COLUMN,
    ],
    sm1: [
      HASH_COLUMN,
      {
        ...TAG_COLUMN,
        WrapperProps: {
          pt: '1rem',
          pb: '0rem',
          w: 'min-content',
        },
        ItemProps: {
          flexDirection: 'row',
        },
      },
      FEE_COLUMN,
      DATE_COLUMN,
    ],
    lg: [HASH_COLUMN, TAG_COLUMN, FEE_COLUMN, DATE_COLUMN, ACTIONS_COLUMN],
  })

  const getTransactionUrl = (transaction: TransactionType | null) => {
    return transaction ? '/transaction/' + transaction.hash : null
  }

  return (
    <ExplorerCommonTable
      {...props}
      columns={columns}
      onRowHref={getTransactionUrl}
    />
  )
}

export default TransactionsTable
