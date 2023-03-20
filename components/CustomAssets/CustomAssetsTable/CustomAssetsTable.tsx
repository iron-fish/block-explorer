import { CommonTable } from 'components/Table'
import { Box, NAMED_COLORS } from '@ironfish/ui-kit'
import { ColumnProps, CommonTableProps } from 'components/Table/types'
import AssetIcon from 'icons/AssetIcon'
import safeProp from 'utils/safeProp'
import { useRouter } from 'next/router'
import RoutePaths from 'constants/RoutePaths'
import { CopyValueToClipboard, HashView } from 'components'
import { formatBlockTimestamp } from 'utils/format'
import { ACTIONS_COLUMN } from 'components/Table/Table'

type Asset = {
  id: number
  identifier: string
  name: string
  owner: string
  supply: string
  created_at: number
  metadata: string
  created_transaction_hash: string
  created_transaction_timestamp: string
}

const columns: ColumnProps<Asset>[] = [
  {
    key: 'name',
    label: 'Asset Name',
    render: asset => (
      <>
        <Box mr="1rem">
          <AssetIcon pb="0.1rem" h="1.875rem" w="1.625rem" />
        </Box>
        <Box color={NAMED_COLORS.LIGHT_BLUE}>{asset.name}</Box>
      </>
    ),
  },
  {
    key: 'supply',
    label: 'Supply',
    render: safeProp('supply'),
  },
  {
    key: 'id',
    label: 'Asset Identifier',
    render: asset => {
      const identifier = safeProp('identifier')(asset)
      return (
        <CopyValueToClipboard
          value={identifier}
          label={<HashView hash={identifier} />}
        />
      )
    },
  },
  {
    key: 'created_at',
    label: 'Created',
    render: item => {
      return formatBlockTimestamp({
        timestamp: item.created_transaction_timestamp,
      })
    },
  },
  ACTIONS_COLUMN,
]

type Props = {
  assets: Array<Asset>
} & Omit<CommonTableProps<Asset>, 'columns'>

export function CustomAssetsTable({ assets, ...rest }: Props) {
  const router = useRouter()

  return (
    <CommonTable
      {...rest}
      data={assets}
      columns={columns}
      onRowClick={(asset: Asset) =>
        router.push({
          pathname: RoutePaths.AssetsInfo,
          query: {
            id: asset.identifier,
          },
        })
      }
    />
  )
}
