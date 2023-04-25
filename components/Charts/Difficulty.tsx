import { FC } from 'react'

import GeneralChart, { GeneralChartProps } from './GeneralChart'
import ChartBox from './ChartBox'
import Metric from 'types/domain/Metric'
import { getAverageWithAccessor } from 'utils/getAverageWithAccessor'

const Difficulty: FC<Pick<GeneralChartProps, 'data'>> = ({ data }) => {
  const valueAccessor = (d: Metric) => d.average_difficulty / 1e15

  return (
    <ChartBox
      header="Difficulty (in quadrillion)"
      average={getAverageWithAccessor(valueAccessor)(data)}
    >
      <GeneralChart
        yAccessor={valueAccessor}
        data={data}
        leftAxisFormatter={d => `${d}P`}
      />
    </ChartBox>
  )
}

export default Difficulty
