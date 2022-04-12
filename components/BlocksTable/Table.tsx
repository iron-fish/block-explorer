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

import { Block } from "types"
import BlockIcon from "icons/BlockIcon"
import { truncateHash } from "utils/hash"
import DataRowSmall from "./DataRowSmall"
import DataRowLarge from "./DataRowLarge"
import RowItem from "./RowItem"

size.defaultOptions({
  precision: 2,
})

interface BlocksTableProps extends TableProps {
  data?: Block[],
  isLoading?: boolean,
}

const COLUMNS = [
  {
    key: "block-height",
    label: "Block Height",
    render: (block) => (
      <>
        <Box mr="1rem">
          <BlockIcon pb="0.1rem" h="1.875rem" w="1.625rem" />
        </Box><Box color={NAMED_COLORS.LIGHT_BLUE}>
          {block.sequence}
        </Box>
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
    render: (block) => block.timestamp
  }
]

const BlocksTable: FC<BlocksTableProps> = ({
  data = null,
  isLoading,
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
            key={block.id}
            items={COLUMNS.map(column => (
              <RowItem 
                key={column.key} 
                label={column.label}
              >
                {column.render(block)}
              </RowItem>
            ))}
          />
        ))}
      </Tbody>
    </Table>
  )
}

export default BlocksTable