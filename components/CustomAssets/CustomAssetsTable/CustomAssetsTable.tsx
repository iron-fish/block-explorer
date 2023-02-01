import { CommonTable } from 'components/Table'
import { Box, NAMED_COLORS } from '@ironfish/ui-kit'
import { ColumnProps, CommonTableProps } from 'components/Table/types'
import AssetIcon from 'icons/AssetIcon'
import safeProp from 'utils/safeProp'
import { formatInTimeZone } from 'date-fns-tz'
import { useRouter } from 'next/router'
import RoutePaths from 'constants/RoutePaths'

type Asset = {
  id: string
  name: string
  owner: string
  total_supply: number
  created_at: number
  metadata: string
  transaction: string
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
    render: safeProp('total_supply'),
  },
  {
    key: 'id',
    label: 'Asset Identifier',
    render: safeProp('id'),
  },
  {
    key: 'created_at',
    label: 'Created',
    render: item => {
      return formatInTimeZone(item.created_at, 'UTC', 'yyyy/MM/dd hh:mm:ss aa')
    },
  },
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
      onRowClick={(block: Asset) =>
        router.push({
          pathname: RoutePaths.AssetsInfo,
          query: { id: block?.id },
        })
      }
    />
  )
}
