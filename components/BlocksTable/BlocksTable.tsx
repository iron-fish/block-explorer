import { FC } from 'react'
import { Box, NAMED_COLORS } from '@ironfish/ui-kit'
import size from 'byte-size'
import { useRouter } from 'next/router'
import pipe from 'ramda/src/pipe'

import BlockIcon from 'icons/BlockIcon'
import { truncateHash } from 'utils/hash'
import { safeProp } from 'utils/safeProp'
import { formatBlockTimestamp } from 'utils/format'
import { BlockType } from 'types'
import RoutePaths from 'constants/RoutePaths'

import { CommonTable } from '../Table'
import { ColumnProps, CommonTableProps } from '../Table/types'

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
    render: pipe(safeProp('size'), x => size(x).toString()),
  },
  {
    key: 'block-transactions',
    label: 'TXN',
    render: safeProp('transactions_count'),
  },
  {
    key: 'block-hash',
    label: 'Block Hash',
    render: pipe(safeProp('hash'), truncateHash),
  },
  {
    key: 'block-timestamp',
    label: 'Timestamp',
    render: formatBlockTimestamp,
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
        router.push({
          pathname: RoutePaths.BlockInfo,
          query: { id: block?.sequence.toString() },
        })
      }
    />
  )
}

export default BlocksTable
