import { Box, NAMED_COLORS } from '@ironfish/ui-kit'
import BlockIcon from 'icons/BlockIcon'
import { truncateHash } from 'utils/hash'

import size from 'byte-size'
import { CommonTable } from '../Table'
import { FC } from 'react'
import { ColumnProps, CommonTableProps } from '../Table/types'
import { BlockType } from 'types'
import RoutePaths from 'constants/RoutePaths'
import { useRouter } from 'next/router'

size.defaultOptions({
  precision: 2,
})

const COLUMNS: ColumnProps<BlockType>[] = [
  {
    key: 'block-height',
    label: 'Block Height',
    render: block => (
      <>
        <Box mr="1rem">
          <BlockIcon pb="0.1rem" h="1.875rem" w="1.625rem" />
        </Box>
        <Box color={NAMED_COLORS.LIGHT_BLUE}>{block.sequence}</Box>
      </>
    ),
  },
  {
    key: 'block-size',
    label: 'Size',
    render: block => size(block.size).toString(),
  },
  {
    key: 'block-transactions',
    label: 'TXN',
    render: block => block.transactions_count,
  },
  {
    key: 'block-hash',
    label: 'Block Hash',
    render: block => truncateHash(block.hash),
  },
  {
    key: 'block-timestamp',
    label: 'Timestamp',
    render: block => {
      const date = new Date(block.timestamp)
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
    },
  },
]

type BlocksTableProps = Omit<CommonTableProps<BlockType>, 'columns'>

const BlocksTable: FC<BlocksTableProps> = props => {
  const router = useRouter()

  return (
    <CommonTable
      {...props}
      columns={COLUMNS}
      onRowClick={(block: BlockType) =>
        router.push(
          RoutePaths.BlockInfo.replace('[id]', block?.sequence.toString())
        )
      }
    />
  )
}

export default BlocksTable
