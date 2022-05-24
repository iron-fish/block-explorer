import { FC } from 'react'
import { useTranslation } from 'hooks/useTranslation'
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
import { Translator } from 'types/common'

size.defaultOptions({
  precision: 2,
})

const getColumns = (t: Translator): ColumnProps<BlockType>[] => [
  {
    key: 'block-height',
    label: t('info-block-height'),
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
    label: t('info-block-size'),
    render: pipe(safeProp('size'), x => size(x).toString()),
  },
  {
    key: 'block-transactions',
    label: t('info-block-txn'),
    render: safeProp('transactions_count'),
  },
  {
    key: 'block-hash',
    label: t('info-block-hash'),
    render: pipe(safeProp('hash'), truncateHash),
  },
  {
    key: 'block-timestamp',
    label: t('info-block-ts'),
    render: formatBlockTimestamp,
  },
]

type BlocksTableProps = Omit<CommonTableProps<BlockType>, 'columns'>

const BlocksTable: FC<BlocksTableProps> = props => {
  const { t } = useTranslation('c-blockstable')
  const router = useRouter()

  return (
    <CommonTable
      {...props}
      columns={getColumns(t)}
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
