import { FC } from 'react'

import GeneralChart, { GeneralChartProps } from './GeneralChart'
import ChartBox from './ChartBox'
import { Metric } from 'types'
import { getAverageWithAccessor } from 'utils/getAverageWithAccessor'

const BlockSize: FC<Pick<GeneralChartProps, 'data'>> = ({ data }) => {
  const valueAccessor = (d: Metric) => Math.round(d.average_block_size / 1000)

  return (
    <ChartBox
      header="Average Block Size"
      average={`${getAverageWithAccessor(valueAccessor)(data)} B`}
    >
      <GeneralChart yAccessor={valueAccessor} data={data} />
    </ChartBox>
  )
}

export default BlockSize
