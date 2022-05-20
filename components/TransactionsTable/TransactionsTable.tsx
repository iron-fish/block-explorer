import { Badge, Box, NAMED_COLORS, useBreakpointValue } from "@ironfish/ui-kit"
import BlockIcon from "icons/BlockIcon"
import { truncateHash } from "utils/hash"

import size from "byte-size"
import { CommonTable } from "../Table"
import { FC } from "react"
import { ColumnProps, CommonTableProps } from "../Table/types"
import TransactionType from "types/domain/TransactionType"

size.defaultOptions({
  precision: 2,
})

const HEIGHT_COLUMN: ColumnProps<TransactionType> = {
  key: "transaction-height",
  label: "Height",
  render: (transaction) => (
    <>
      <Box mr="1rem">
        <BlockIcon pb="0.1rem" h="1.875rem" w="1.625rem" />
      </Box>
      <Box color={NAMED_COLORS.LIGHT_BLUE}>{transaction.id}</Box>
    </>
  )
}
const TAG_COLUMN: ColumnProps<TransactionType> = {
  key: "transaction-tag",
  label: "",
  render: (transaction) => transaction?.spends.length === 0 && (
    <Badge
      bg={NAMED_COLORS.LIGHT_YELLOW}
      color={NAMED_COLORS.BLACK}
      borderRadius="80px"
      py="0.25rem"
      px="1rem"
      textTransform="none"
    >
      <h5>Miner&nbsp;Reward&nbsp;+&nbsp;Fee</h5>
    </Badge>
  )
}
const HASH_COLUMN: ColumnProps<TransactionType> = {
  key: "transaction-block-hash",
  label: "Block Hash",
  render: (transaction) => truncateHash(transaction.blocks[0].hash)
}
const DATE_COLUMN = {
  key: "transaction-timestamp",
  label: "Timestamp",
  render: (transaction) => {
    const date = new Date(transaction.blocks[0].timestamp)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
  }
}

type TransactionsTableProps = Omit<CommonTableProps<TransactionType>, 'columns'>

const TransactionsTable: FC<TransactionsTableProps> = (props) => {
  const columns: ColumnProps<TransactionType>[] = useBreakpointValue({ 
    base: [
      {
        ...TAG_COLUMN,
        WrapperProps: {
          w: '100%',
          pt: '1rem',
          pb: '0rem',
        },
        ItemProps: {
          flexDirection: 'row'
        }
      },
      HEIGHT_COLUMN,
      HASH_COLUMN,
      DATE_COLUMN
    ], 
    lg: [
      HEIGHT_COLUMN,
      TAG_COLUMN,
      HASH_COLUMN,
      DATE_COLUMN
    ]
  })
  return (
    <CommonTable
      {...props}
      columns={columns}
    />
  )
}

export default TransactionsTable
