import { Box, NAMED_COLORS, useBreakpointValue } from '@ironfish/ui-kit'
import {
  ColumnProps,
  CommonTableProps
} from '@ironfish/ui-kit/dist/components/Table/types'
import size from 'byte-size'
import { CopyValueToClipboard, ExplorerCommonTable, HashView } from 'components'
import { ACTIONS_COLUMN } from 'components/ExplorerCommonTable'
import RoutePaths from 'constants/RoutePaths'
import BlockIcon from 'icons/BlockIcon'
import { useRouter } from 'next/router'
import { pipe } from 'ramda'
import { FC } from 'react'
import { BlockType } from 'types'
import { formatTimeSinceLastBlock } from 'utils/format/formatTimeSinceLastBlock'
import { formatGraffiti } from 'utils/format/graffiti'
import { safeProp } from 'utils/safeProp'

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
    render: pipe(safeProp('size'), x =>
      size(x, { precision: 2, units: 'iec' }).toString()
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
    key: 'block-mining-time',
    label: 'Mined in',
    render: block => formatTimeSinceLastBlock(block.time_since_last_block_ms),
  },
  {
    key: 'block-graffiti',
    label: 'Graffiti',
    ItemProps: {
      flex: { base: 1, lg: 'unset' },
    },
    render: block => {
      return formatGraffiti(block.graffiti)
    },
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
    <ExplorerCommonTable
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
