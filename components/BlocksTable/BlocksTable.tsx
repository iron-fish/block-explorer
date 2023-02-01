import { FC } from 'react'
import { Box, NAMED_COLORS } from '@ironfish/ui-kit'
import { useRouter } from 'next/router'

import BlockIcon from 'icons/BlockIcon'
import { safeProp } from 'utils/safeProp'
import { formatBlockTimestamp } from 'utils/format'
import { BlockType } from 'types'
import RoutePaths from 'constants/RoutePaths'
import { CopyValueToClipboard, HashView } from 'components'

import { CommonTable } from '../Table'
import { ColumnProps, CommonTableProps } from '../Table/types'

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
    render: formatBlockTimestamp,
  },
  {
    key: 'block-graffiti',
    label: 'Graffiti',
    render: safeProp('graffiti'),
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
