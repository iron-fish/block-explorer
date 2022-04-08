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
          <Th>Block Height</Th>
          <Th>Size</Th>
          <Th>TXN</Th>
          <Th>Block Hash</Th>
          <Th>Timestamp</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data?.map(block => (
          <RowData
            key={block.id}
            items={[
              <RowItem
                key="block-height"
                label="Block Height"
              >
                <Box mr="1rem">
                  <BlockIcon pb="0.1rem" h="1.875rem" w="1.625rem" />
                </Box>
                <Box color={NAMED_COLORS.LIGHT_BLUE}>
                  {block.sequence}
                </Box>
              </RowItem>,
              <RowItem
                key="block-size"
                label="Size"
              >
                {size(block.size).toString()}
              </RowItem>,
              <RowItem
                key="block-transactions"
                label="TXN"
              >
                {block.transactions_count}
              </RowItem>,
              <RowItem
                key="block-hash"
                label="Block Hash"
              >
                {truncateHash(block.hash)}
              </RowItem>,
              <RowItem
                key="block-timestamp"
                label="Timestamp"
              >
                {block.timestamp}
              </RowItem>
            ]}
          />
        ))}
      </Tbody>
    </Table>
  )
}

export default BlocksTable