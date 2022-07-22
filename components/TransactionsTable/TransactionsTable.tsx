import { FC } from 'react'
import { Box, NAMED_COLORS, useBreakpointValue } from '@ironfish/ui-kit'
import pipe from 'ramda/src/pipe'
import pathOr from 'ramda/src/pathOr'
import { useRouter } from 'next/router'

import BlockIcon from 'icons/BlockIcon'
import { truncateHash } from 'utils/hash'
import { formatBlockTimestamp } from 'utils/format'
import TransactionType from 'types/domain/TransactionType'
import RoutePaths from 'constants/RoutePaths'
import { safeProp } from 'utils/safeProp'
import { CopyValueToClipboard, InfoBadge } from 'components'

import { CommonTable } from '../Table'
import { ColumnProps, CommonTableProps } from '../Table/types'

const HEIGHT_COLUMN: ColumnProps<TransactionType> = {
  key: 'transaction-id',
  label: 'TXN ID',
  render: transaction => (
    <>
      <Box mr="1rem">
        <BlockIcon pb="0.1rem" h="1.875rem" w="1.625rem" />
      </Box>
      <Box color={NAMED_COLORS.LIGHT_BLUE}>{transaction.id}</Box>
    </>
  ),
}
const TAG_COLUMN: ColumnProps<TransactionType> = {
  key: 'transaction-tag',
  label: '',
  render: transaction =>
    transaction?.spends.length === 0 && (
      <InfoBadge
        mt={{ base: '1rem', lg: 0 }}
        message={<>Miner&nbsp;Reward&nbsp;+&nbsp;Fee</>}
      />
    ),
}
const HASH_COLUMN: ColumnProps<TransactionType> = {
  key: 'transaction-hash',
  label: 'Hash',
  render: transaction => {
    const hash = safeProp('hash')(transaction)
    return <CopyValueToClipboard value={hash} label={truncateHash(hash)} />
  },
}
const FEE_COLUMN: ColumnProps<TransactionType> = {
  key: 'transaction-fee',
  label: 'Fee',
  render: transaction => `${transaction.fee} Ore`,
}
const DATE_COLUMN = {
  key: 'transaction-timestamp',
  label: 'Timestamp',
  render: pipe(pathOr({}, ['blocks', 0]), formatBlockTimestamp),
}

type TransactionsTableProps = Omit<CommonTableProps<TransactionType>, 'columns'>

const TransactionsTable: FC<TransactionsTableProps> = props => {
  const columns: ColumnProps<TransactionType>[] = useBreakpointValue({
    base: [
      {
        ...TAG_COLUMN,
        WrapperProps: {
          w: '100%',
          pt: '0rem',
          pb: '0rem',
        },
        ItemProps: {
          flexDirection: 'row',
        },
      },
      HEIGHT_COLUMN,
      HASH_COLUMN,
      FEE_COLUMN,
      DATE_COLUMN,
    ],
    lg: [HEIGHT_COLUMN, TAG_COLUMN, HASH_COLUMN, FEE_COLUMN, DATE_COLUMN],
  })
  const router = useRouter()

  return (
    <CommonTable
      {...props}
      columns={columns}
      onRowClick={(transaction: TransactionType) => {
        return router.push({
          pathname: RoutePaths.TransactionInfo,
          query: { hash: transaction?.hash },
        })
      }}
    />
  )
}

export default TransactionsTable
