import { HStack, Text, Box } from '@ironfish/ui-kit'
import { ColumnProps } from '@ironfish/ui-kit/dist/components/Table/types'
import {
  ExplorerCommonTable,
  HashView,
  CopyValueToClipboard,
  TableCellTimeStamp,
} from 'components'
import BurnAction from 'assets/svg/burn-action.svg'
import MintAction from 'assets/svg/mint-action.svg'
import { AssetDescriptionType, AssetType } from 'types'
import { formatNumberWithLanguage } from 'utils/format'
import { formatCurrency } from 'utils/currency'
import { useMemo } from 'react'

const upperFirst = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

const COLUMNS: Array<ColumnProps<AssetDescriptionType>> = [
  {
    key: 'action',
    label: 'Action',
    render: item => (
      <HStack alignItems="center" gap={4}>
        {item.type === 'MINT' ? <MintAction /> : <BurnAction />}
        <Text>{item.type ? upperFirst(item.type) : ''}</Text>
      </HStack>
    ),
  },
  {
    key: 'quantity',
    label: 'Quantity',
    render: item => formatNumberWithLanguage(item.value),
  },
  {
    key: 'hash',
    label: 'Txn Hash',
    render: item => (
      <CopyValueToClipboard
        value={item.transaction_hash}
        label={<HashView hash={item.transaction_hash} />}
      />
    ),
  },
  {
    key: 'timestamp',
    label: 'Timestamp',
    render: item => <TableCellTimeStamp timestamp={item.block_timestamp} />,
  },
]

type Props = {
  assetHistory: Array<AssetDescriptionType>
  assetData: AssetType
}

export function AssetHistory({ assetHistory, assetData }: Props) {
  const assetHistoryWithDecimals = useMemo(() => {
    return assetData.verified_metadata?.decimals != null
      ? assetHistory.map(v => ({
          ...v,
          value: formatCurrency(v.value, assetData.verified_metadata.decimals),
        }))
      : assetHistory
  }, [assetHistory, assetData])

  return (
    <Box mb="2.25rem">
      <ExplorerCommonTable
        data={assetHistoryWithDecimals}
        columns={COLUMNS}
        disableHover={true}
      />
    </Box>
  )
}
