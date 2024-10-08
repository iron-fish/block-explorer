import { Box, NAMED_COLORS, useBreakpointValue } from '@ironfish/ui-kit'
import {
  ColumnProps,
  CommonTableProps,
} from '@ironfish/ui-kit/dist/components/Table/types'

import AssetIcon from 'icons/AssetIcon'
import safeProp from 'utils/safeProp'
import {
  CopyValueToClipboard,
  HashView,
  TableCellTimeStamp,
  ExplorerCommonTable,
  InfoBadge,
} from 'components'
import { formatNumberWithLanguage } from 'utils/format'
import { ACTIONS_COLUMN } from 'components/ExplorerCommonTable'
import { AssetType } from 'types'

export const ASSET_NAME_COLUMN: ColumnProps<AssetType> = {
  key: 'name',
  label: 'Asset Name',
  WrapperProps: {
    minW: '16.875rem',
    maxW: '16.875rem',
  },
  render: asset => (
    <>
      <Box mr="1rem">
        <AssetIcon pb="0.1rem" h="1.875rem" w="1.625rem" />
      </Box>
      <Box color={NAMED_COLORS.LIGHT_BLUE}>{asset.name}</Box>
      {asset.verified_metadata && <InfoBadge message="Verified" ml="2.5rem" />}
    </>
  ),
}

export const ASSET_COLUMNS: ColumnProps<AssetType>[] = [
  {
    key: 'supply',
    label: 'Supply',
    render: asset => formatNumberWithLanguage(safeProp('supply')(asset)),
    WrapperProps: {
      minW: '15rem',
      maxW: '15rem',
    },
  },
  {
    key: 'id',
    label: 'Asset Identifier',
    WrapperProps: {
      minW: { base: '16.875rem', lg: 'auto' },
    },
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

const COLUMNS = [ASSET_NAME_COLUMN, ...ASSET_COLUMNS]

type Props = {
  assets: Array<AssetType>
} & Omit<CommonTableProps<AssetType>, 'columns'>

export function CustomAssetsTable({ assets, ...rest }: Props) {
  const columns = useBreakpointValue({
    base: COLUMNS,
    lg: [...COLUMNS, ACTIONS_COLUMN],
  })

  const getAssetUrl = (asset: AssetType | null) => {
    return asset ? '/assets/' + asset.identifier : null
  }

  return (
    <ExplorerCommonTable
      {...rest}
      data={assets}
      columns={columns}
      onRowHref={getAssetUrl}
    />
  )
}
