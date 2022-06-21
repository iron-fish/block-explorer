import { FC } from 'react'
import size from 'byte-size'
import { Badge, Box, NAMED_COLORS, useBreakpointValue } from '@ironfish/ui-kit'
import pipe from 'ramda/src/pipe'
import pathOr from 'ramda/src/pathOr'
import { useRouter } from 'next/router'

import BlockIcon from 'icons/BlockIcon'
import { truncateHash } from 'utils/hash'
import { formatBlockTimestamp } from 'utils/format'
import TransactionType from 'types/domain/TransactionType'
import RoutePaths from 'constants/RoutePaths'

import { CommonTable } from '../Table'
import { ColumnProps, CommonTableProps } from '../Table/types'

size.defaultOptions({
  precision: 2,
})

const HEIGHT_COLUMN: ColumnProps<TransactionType> = {
  key: 'transaction-height',
  label: 'Height',
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
      <Badge
        bg={NAMED_COLORS.LIGHT_YELLOW}
        color={NAMED_COLORS.BLACK}
        borderRadius="5rem"
        py="0.25rem"
        px="1rem"
        mt={{ base: '1rem', lg: 0 }}
        textTransform="none"
      >
        <h5>Miner&nbsp;Reward&nbsp;+&nbsp;Fee</h5>
      </Badge>
    ),
}
const HASH_COLUMN: ColumnProps<TransactionType> = {
  key: 'transaction-block-hash',
  label: 'Block Hash',
  render: transaction => truncateHash(transaction.blocks[0].hash),
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
      DATE_COLUMN,
    ],
    lg: [HEIGHT_COLUMN, TAG_COLUMN, HASH_COLUMN, DATE_COLUMN],
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
