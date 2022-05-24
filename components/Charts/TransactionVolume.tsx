import { FC } from 'react'
import prop from 'ramda/src/prop'

import GeneralChart, { GeneralChartProps } from './GeneralChart'
import ChartBox from './ChartBox'
import { getAverageWithAccessor } from 'utils/getAverageWithAccessor'

const TransactionVolume: FC<Pick<GeneralChartProps, 'data'>> = ({ data }) => {
  const valueAccessor = prop('transactions_count')

  return (
    <ChartBox
      header="Daily Transaction Volume"
      average={getAverageWithAccessor(valueAccessor)(data)}
    >
      <GeneralChart yAccessor={valueAccessor} data={data} />
    </ChartBox>
  )
}

export default TransactionVolume
