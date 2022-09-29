import { FC } from 'react'
import { Box, Flex, BoxProps, NAMED_COLORS } from '@ironfish/ui-kit'
import { useRouter } from 'next/router'

import BlockIcon from 'icons/BlockIcon'
import { truncateHash } from 'utils/hash'
import { safeProp } from 'utils/safeProp'
import { formatBlockTimestamp } from 'utils/format'
import { BlockType } from 'types'
import RoutePaths from 'constants/RoutePaths'
import { CopyValueToClipboard } from 'components'

import { CommonTable } from '../Table'
import { ColumnProps, CommonTableProps } from '../Table/types'

interface HashTextProps {
  hash: string
  parts: number
  chars: number
  labelProps: BoxProps
}

export const HashText: FC<HashTextProps> = ({
  hash,
  parts,
  chars,
  labelProps,
}) => {
  return (
    <Flex position="relative">
      <Box as="h5" {...labelProps} position="relative" zIndex={1}>
        {truncateHash(hash, parts, chars)}
      </Box>
      <Box
        as="h4"
        {...labelProps}
        fontSize="96px"
        mt="-16px"
        position="absolute"
        top={0}
        whiteSpace="nowrap"
        overflow="hidden"
        zIndex={0}
        height="38px"
        width="100%"
      >
        {hash}
      </Box>
    </Flex>
  )
}

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
        <CopyValueToClipboard
          value={hash}
          label={<HashText hash={hash} parts={4} chars={4} />}
        />
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
