import { useMemo } from 'react'

import useBlocksMetrics from 'hooks/useBlocksMetrics'
import TransactionVolume from 'components/Charts/TransactionVolume'
import { BlockMetricGranularity } from 'constants/BlockMetricGranularity'
import { sub, add } from 'date-fns'
import ChartBox from 'components/Charts/ChartBox'
import { HStack, NAMED_COLORS, Spinner } from '@ironfish/ui-kit'

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
    return (
      <ChartBox header="Daily Transaction Volume" average="—">
        <HStack justifyContent="center" py="6rem">
          <Spinner
            color={NAMED_COLORS.LIGHT_BLUE}
            emptyColor={NAMED_COLORS.LIGHT_GREY}
            size="xl"
            thickness="0.25rem"
            speed="0.75s"
          />
        </HStack>
      </ChartBox>
    )
  }

  return <TransactionVolume data={data} />
}
