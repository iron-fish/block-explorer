import { FC } from 'react'
import { prop } from 'ramda'
import byteSize from 'byte-size'

import GeneralChart, { GeneralChartProps } from './GeneralChart'
import ChartBox from './ChartBox'
import { getAverageWithAccessor } from 'utils/getAverageWithAccessor'

const config = {
  units: 'simple',
  precision: 0,
  customUnits: {
    simple: [
      { from: 0, to: 1e3, unit: '' },
      { from: 1e3, to: 1e6, unit: 'K' },
      { from: 1e6, to: 1e9, unit: 'Mn' },
      { from: 1e9, to: 1e12, unit: 'Bn' },
    ],
  },
}

const TransactionVolume: FC<Pick<GeneralChartProps, 'data'>> = ({ data }) => {
  const valueAccessor = prop('transactions_count')

  return (
    <ChartBox
      header="Daily Transaction Volume"
      average={getAverageWithAccessor(valueAccessor)(data)}
    >
      <GeneralChart
        yAccessor={valueAccessor}
        data={data}
        leftAxisFormatter={transactions_count => {
          const { value, unit } = byteSize(transactions_count, config)
          return `${value}${unit}`
        }}
      />
    </ChartBox>
  )
}

export default TransactionVolume
