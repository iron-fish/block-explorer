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
  total_supply: string
  created_at: string
  metadata: string
  transaction: string
}

const assets = Array.from({ length: 100 }).map((_, i) => ({
  id: i,
  name: `Mock asset #${i}`,
  owner: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  total_supply: i * 500000 + 1000000,
  created_at: 0 + i * 1000 * 60 * 60 * 24,
  metadata: 'Hello world',
  transaction:
    '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
}))

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

type Props = Omit<CommonTableProps<Asset>, 'columns'>

export function CustomAssetsTable(props: Props) {
  const router = useRouter()

  return (
    <CommonTable
      {...props}
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
