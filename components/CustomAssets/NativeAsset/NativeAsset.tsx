import {
  Box,
  Flex,
  NAMED_COLORS,
  Skeleton,
  CommonTable,
  useBreakpointValue,
} from '@ironfish/ui-kit'
import { useRouter } from 'next/router'
import InfoBadge from 'components/InfoBadge'
import { ColumnProps } from 'components/Table/types'
import useAsset from 'hooks/useAsset'
import { AssetType } from 'types'
import { FishIcon } from 'svgx'
import { ACTIONS_COLUMN } from 'components/Table/Table'
import RoutePaths from 'constants/RoutePaths'
import { TableComponentProps } from '@ironfish/ui-kit/dist/components/Table/types'
import { ASSET_COLUMNS } from '../CustomAssetsTable/CustomAssetsTable'

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
      <InfoBadge message="Verified" ml="2.5rem" />
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
