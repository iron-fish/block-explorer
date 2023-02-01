import { HStack, Text, Box } from '@ironfish/ui-kit'
import { CommonTable, HashView, CopyValueToClipboard } from 'components'
import { formatInTimeZone } from 'date-fns-tz'
import { ColumnProps } from 'components/Table/types'
import BurnAction from 'assets/svg/burn-action.svg'
import MintAction from 'assets/svg/mint-action.svg'

type AssetHistoryItem = {
  action: 'MINT' | 'BURN'
  quantity: number
  transaction: string
  timestamp: number
}

const upperFirst = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

const COLUMNS: Array<ColumnProps<AssetHistoryItem>> = [
  {
    key: 'action',
    label: 'Action',
    render: item => (
      <HStack alignItems="center" gap={4}>
        {item.action === 'MINT' ? <MintAction /> : <BurnAction />}
        <Text>{upperFirst(item.action)}</Text>
      </HStack>
    ),
  },
  {
    key: 'quantity',
    label: 'Quantity',
    render: item => item.quantity,
  },
  {
    key: 'hash',
    label: 'Txn Hash',
    render: item => (
      <CopyValueToClipboard
        value={item.transaction}
        label={<HashView hash={item.transaction} />}
      />
    ),
  },
  {
    key: 'timestamp',
    label: 'Timestamp',
    render: item =>
      formatInTimeZone(item.timestamp, 'UTC', 'yyyy/MM/dd hh:mm:ss aa'),
  },
]

type Props = {
  assetHistory: Array<AssetHistoryItem>
}

export function AssetHistory({ assetHistory }: Props) {
  return (
    <Box mb="2.25rem">
      <CommonTable data={assetHistory} columns={COLUMNS} />
    </Box>
  )
}
