import { FC } from "react"

import {
  Box,
  NAMED_COLORS,
  Table,
  TableProps,
  Tbody,
  Th,
  Thead,
  Tr,
  useBreakpointValue
} from '@ironfish/ui-kit'
import size from "byte-size"

import { BlockType } from "types"
import BlockIcon from "icons/BlockIcon"
import { truncateHash } from "utils/hash"
import DataRowSmall from "./DataRowSmall"
import DataRowLarge from "./DataRowLarge"
import RowItem from "./RowItem"
import RowItemSpin from "./RowItemSpin"

size.defaultOptions({
  precision: 2,
})

interface BlocksTableProps extends TableProps {
  data?: BlockType[],
}

const COLUMNS = [
  {
    key: "block-height",
    label: "Block Height",
    render: (block) => (
      <>
        <Box mr="1rem">
          <BlockIcon pb="0.1rem" h="1.875rem" w="1.625rem" />
        </Box>
        <Box color={NAMED_COLORS.LIGHT_BLUE}>{block.sequence}</Box>
      </>
    )
  },
  {
    key: "block-size",
    label: "Size",
    render: (block) => size(block.size).toString()
  },
  {
    key: "block-transactions",
    label: "TXN",
    render: (block) => block.transactions_count
  },
  {
    key: "block-hash",
    label: "Block Hash",
    render: (block) => truncateHash(block.hash)
  },
  {
    key: "block-timestamp",
    label: "Timestamp",
    render: (block) => {
      const date = new Date(block.timestamp)
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
    }
  }
]

const BlocksTable: FC<BlocksTableProps> = ({
  data = null,
  ...rest
}) => {
  const RowData = useBreakpointValue({
    base: DataRowSmall,
    lg: DataRowLarge
  })

  return (
    <Table
      {...rest}
      variant="blocks"
    >
      <Thead display={{ base: 'none', lg: 'table-header-group' }}>
        <Tr>
          {COLUMNS.map(column => (
            <Th key={column.key}>{column.label}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {data?.map(block => (
          <RowData
            key={block?.id}
            items={COLUMNS.map(column => (
              <RowItem
                key={column.key}
                label={column.label}
              >
                {block ? column.render(block) : <RowItemSpin minW="4rem" />}
              </RowItem>
            ))}
          />
        ))}
      </Tbody>
    </Table>
  )
}

export default BlocksTable