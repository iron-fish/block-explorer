import { FC } from 'react'
import { NAMED_COLORS, useBreakpointValue, Box } from '@ironfish/ui-kit'
import pipe from 'ramda/src/pipe'
import pathOr from 'ramda/src/pathOr'
import { useRouter } from 'next/router'

import { formatBlockTimestamp } from 'utils/format'
import TransactionType from 'types/domain/TransactionType'
import RoutePaths from 'constants/RoutePaths'
import { safeProp } from 'utils/safeProp'
import { CopyValueToClipboard, InfoBadge, HashView } from 'components'

import { CommonTable } from '../Table'
import { ColumnProps, CommonTableProps } from '../Table/types'
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
        <CopyValueToClipboard
          labelProps={{ color: NAMED_COLORS.LIGHT_BLUE }}
          value={hash}
          label={<HashView hash={hash} />}
        />
      </>
    )
  },
}
const FEE_COLUMN: ColumnProps<TransactionType> = {
  key: 'transaction-fee',
  label: 'Reward',
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
    lg: [HASH_COLUMN, TAG_COLUMN, FEE_COLUMN, DATE_COLUMN],
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
