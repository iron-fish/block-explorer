import {
  Box,
  Flex,
  NAMED_COLORS,
  CommonTable,
  useBreakpointValue,
} from '@ironfish/ui-kit'
import { useRouter } from 'next/router'
import InfoBadge from 'components/InfoBadge'
import { ColumnProps } from 'components/Table/types'
import useAsset from 'hooks/useAsset'
import { AssetType } from 'types'
import { FishIcon } from 'svgx'
import { ACTIONS_COLUMN } from 'components/ExplorerCommonTable'
import RoutePaths from 'constants/RoutePaths'
import { TableComponentProps } from '@ironfish/ui-kit/dist/components/Table/types'
import { ASSET_COLUMNS } from '../CustomAssetsTable/CustomAssetsTable'
import { NATIVE_ASSET_ID } from 'constants/AssetConstants'

const NATIVE_ASSET_COLUMN: ColumnProps<AssetType> = {
  key: 'name',
  label: 'Asset Name',
  WrapperProps: {
    minW: { base: 'auto', lg: '16.875rem' },
    maxW: { base: 'auto', lg: '16.875rem' },
  },
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
      {asset.verified_at && <InfoBadge message="Verified" ml="2.5rem" />}
    </Flex>
  ),
}

const DEFAULT_TABLE_PROPS: TableComponentProps = {
  tableHeadProps: {
    display: { base: 'none' },
  },
  tableBodyRowProps: {
    layerStyle: 'card',
    borderRadius: '0.25rem',
    _light: {
      boxShadow: `0.25rem 0.25rem 0 -0.063rem ${NAMED_COLORS.WHITE}, 0.25rem 0.25rem ${NAMED_COLORS.LIGHT_GREY}`,
    },
    _hover: {
      borderColor: NAMED_COLORS.DEEP_BLUE,
      _dark: {
        borderColor: NAMED_COLORS.WHITE,
      },
    },
  },
}

const DEFAULT_TABLE_ROW_ITEM_PROPS: TableComponentProps = {
  tableHeadRowProps: {
    display: { base: 'block' },
  },
}

const COLUMNS = [NATIVE_ASSET_COLUMN, ...ASSET_COLUMNS]

const NativeAsset = () => {
  const router = useRouter()
  const { data: nativeAsset, loaded } = useAsset(NATIVE_ASSET_ID)
  const columns = useBreakpointValue({
    base: COLUMNS,
    lg: [...COLUMNS, ACTIONS_COLUMN],
  })

  return (
    <CommonTable
      columns={columns}
      data={loaded ? [nativeAsset] : [null]}
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
  )
}

export default NativeAsset
