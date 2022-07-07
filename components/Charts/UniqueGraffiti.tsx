import { FC } from 'react'
import prop from 'ramda/src/prop'

import GeneralChart, { GeneralChartProps } from './GeneralChart'
import ChartBox from './ChartBox'
import { getAverageWithAccessor } from 'utils/getAverageWithAccessor'

const UniqueGraffiti: FC<Pick<GeneralChartProps, 'data'>> = ({ data }) => {
  const valueAccessor = prop('unique_graffiti_count')

  return (
    <ChartBox
      header="Number of Unique Graffiti"
      average={getAverageWithAccessor(valueAccessor)(data)}
    >
      <GeneralChart yAccessor={valueAccessor} data={data} />
    </ChartBox>
  )
}

export default UniqueGraffiti
