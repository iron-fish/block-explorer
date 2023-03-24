import { HStack, Text, Box } from '@ironfish/ui-kit'
import { CommonTable, HashView, CopyValueToClipboard } from 'components'
import { ColumnProps } from 'components/Table/types'
import BurnAction from 'assets/svg/burn-action.svg'
import MintAction from 'assets/svg/mint-action.svg'
import { AssetDescriptionType } from 'types'
import { formatBlockTimestamp, formatNumberWithLanguage } from 'utils/format'

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
    render: item => formatBlockTimestamp({ timestamp: item.block_timestamp }),
  },
]

type Props = {
  assetHistory: Array<AssetDescriptionType>
}

export function AssetHistory({ assetHistory }: Props) {
  return (
    <Box mb="2.25rem">
      <CommonTable data={assetHistory} columns={COLUMNS} />
    </Box>
  )
}
