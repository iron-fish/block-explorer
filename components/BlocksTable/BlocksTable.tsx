import { FC } from 'react'
import { Box, NAMED_COLORS, useBreakpointValue } from '@ironfish/ui-kit'
import { useRouter } from 'next/router'

import BlockIcon from 'icons/BlockIcon'
import { safeProp } from 'utils/safeProp'
import { BlockType } from 'types'
import RoutePaths from 'constants/RoutePaths'
import { CopyValueToClipboard, HashView, TableCellTimeStamp } from 'components'

import { CommonTable } from '../Table'
import { ColumnProps, CommonTableProps } from '../Table/types'
import { ACTIONS_COLUMN } from 'components/Table/Table'

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
    key: 'block-transactions',
    label: 'TXN',
    render: safeProp('transactions_count'),
  },
  {
    key: 'block-hash',
    label: 'Block Hash',
    render: block => {
      const hash = safeProp('hash')(block)
      return (
        <CopyValueToClipboard value={hash} label={<HashView hash={hash} />} />
      )
    },
  },
  {
    key: 'block-timestamp',
    label: 'Timestamp',
    render: block => <TableCellTimeStamp timestamp={block.timestamp} />,
  },
  {
    key: 'block-graffiti',
    label: 'Graffiti',
    ItemProps: {
      flex: { base: 1, lg: 'unset' },
    },
    render: block => (
      <Box wordBreak="break-all">{safeProp('graffiti')(block)}</Box>
    ),
  },
]

type BlocksTableProps = Omit<CommonTableProps<BlockType>, 'columns'>

const BlocksTable: FC<BlocksTableProps> = props => {
  const router = useRouter()
  const columns = useBreakpointValue({
    base: COLUMNS,
    lg: [...COLUMNS, ACTIONS_COLUMN],
  })

  return (
    <CommonTable
      {...props}
      columns={columns}
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
