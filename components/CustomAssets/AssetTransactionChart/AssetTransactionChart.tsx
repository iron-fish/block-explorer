import { useMemo } from 'react'

import useBlocksMetrics from 'hooks/useBlocksMetrics'
import TransactionVolume from 'components/Charts/TransactionVolume'
import { BlockMetricGranularity } from 'constants/BlockMetricGranularity'
import { sub, add } from 'date-fns'

export function AssetTransactionChart() {
  const startDate = useMemo(() => {
    return sub(new Date(), { days: 88 })
  }, [])

  const endDate = useMemo(() => {
    return add(new Date(), { days: 1 })
  }, [])

  const { data, loaded } = useBlocksMetrics(
    startDate,
    endDate,
    BlockMetricGranularity.Day
  )

  if (!loaded) {
    return null
  }

  return <TransactionVolume data={data} />
}
