import {
  Box,
  Flex,
  NAMED_COLORS,
  Skeleton,
  CommonTable,
  useBreakpointValue,
} from '@ironfish/ui-kit'
import { useRouter } from 'next/router'
import HashView from 'components/HashView'
import InfoBadge from 'components/InfoBadge'
import CopyValueToClipboard from 'components/CopyValueToClipboard'
import { ColumnProps } from 'components/Table/types'
import TableCellTimeStamp from 'components/TableCellTimeStamp'
import useAsset from 'hooks/useAsset'
import { AssetType } from 'types'
import { formatNumberWithLanguage } from 'utils/format'
import safeProp from 'utils/safeProp'
import { FishIcon } from 'svgx'
import { ACTIONS_COLUMN } from 'components/Table/Table'
import RoutePaths from 'constants/RoutePaths'

const COLUMNS: ColumnProps<AssetType>[] = [
  {
    key: 'name',
    label: 'Asset Name',
    render: asset => (
      <Flex alignItems="center">
        <Box
          color={NAMED_COLORS.BLACK}
          _dark={{
            color: NAMED_COLORS.WHITE,
          }}
          mr="1rem"
        >
          <FishIcon pb="0.1rem" h="1.875rem" w="1.625rem" />
        </Box>
        <Box>{asset.name}</Box>
        <InfoBadge message="Verified" ml="2.5rem" />
      </Flex>
    ),
  },
  {
    key: 'supply',
    label: 'Supply',
    render: asset => formatNumberWithLanguage(safeProp('supply')(asset)),
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
    render: item => (
      <TableCellTimeStamp timestamp={item.created_transaction_timestamp} />
    ),
  },
]

const DEFAULT_TABLE_PROPS: TableComponentProps = {
  tableHeadProps: {
    display: { base: 'none' },
  },
  tableBodyRowProps: {
    layerStyle: 'card',
    borderRadius: '0.25rem',
  },
}

const DEFAULT_TABLE_ROW_ITEM_PROPS: TableComponentProps = {
  tableHeadRowProps: {
    display: { base: 'block' },
  },
}

const NativeAsset = () => {
  const router = useRouter()
  const { data: nativeAsset, loaded } = useAsset(
    '2cfc97ecdf906e864e6d977da500857b925144de637d8b8ad6eaae0cd84f8240'
  )
  const columns = useBreakpointValue({
    base: COLUMNS,
    lg: [...COLUMNS, ACTIONS_COLUMN],
  })

  return (
    <Skeleton
      variant="ironFish"
      isLoaded={loaded}
      mb="2.125rem"
      minH="7.9375rem"
      w="100%"
    >
      {loaded && (
        <CommonTable
          columns={columns}
          data={[nativeAsset]}
          tableComponentProps={DEFAULT_TABLE_PROPS}
          tableComponentRowItemProps={DEFAULT_TABLE_ROW_ITEM_PROPS}
          onRowClick={() => {
            router.push({
              pathname: RoutePaths.AssetsInfo,
              query: {
                id: nativeAsset.identifier,
              },
            })
          }}
          sx={{
            tr: {
              '[aria-label="actions-cell"]': {
                color: NAMED_COLORS.PALE_GREY,
                transition: 'color 300ms ease-in-out',
              },
              _hover: {
                '[aria-label="actions-cell"]': {
                  color: NAMED_COLORS.DEEP_BLUE,
                  _dark: {
                    color: NAMED_COLORS.WHITE,
                  },
                },
              },
            },
          }}
        />
      )}
    </Skeleton>
  )
}

export default NativeAsset
