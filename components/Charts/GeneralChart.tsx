import { FC } from 'react'
import { TickFormatter } from '@visx/axis'
import { LinearGradient } from '@visx/gradient'
import { AnyD3Scale, ScaleInput } from '@visx/scale'
import {
  buildChartTheme,
  Axis,
  Grid,
  AreaSeries,
  LineSeries,
  Tooltip,
  XYChart,
} from '@visx/xychart'
import {
  useColorModeValue,
  NAMED_COLORS,
  useBreakpointValue,
} from '@ironfish/ui-kit'
import format from 'date-fns/format'
import getDate from 'date-fns/getDate'

import { Metric } from 'types'

export interface GeneralChartProps {
  data: Metric[]
  yAccessor: (metric: Metric) => number
  marginLeft?: number
  leftAxisFormatter?: TickFormatter<ScaleInput<AnyD3Scale>>
}

const GeneralChart: FC<GeneralChartProps> = ({
  data,
  yAccessor,
  marginLeft = 50,
  leftAxisFormatter,
}) => {
  const $colors = useColorModeValue(
    {
      chartTheme: buildChartTheme({
        backgroundColor: NAMED_COLORS.WHITE,
        colors: ['url(#area)', NAMED_COLORS.LIGHT_BLUE],
        gridColor: NAMED_COLORS.LIGHT_GREY,
        gridColorDark: NAMED_COLORS.LIGHT_GREY,
        svgLabelSmall: {
          fill: NAMED_COLORS.GREY,
          fontSize: '12px',
          fontFamily: 'favorit-regular',
        },
        svgLabelBig: { fill: NAMED_COLORS.BLACK },
        tickLength: 0,
      }),
      bottomAxisLabelColor: NAMED_COLORS.BLACK,
    },
    {
      chartTheme: buildChartTheme({
        backgroundColor: NAMED_COLORS.DARKER_GREY,
        colors: ['url(#area)', NAMED_COLORS.LIGHT_BLUE],
        gridColor: NAMED_COLORS.DARK_GREY,
        gridColorDark: NAMED_COLORS.DARK_GREY,
        svgLabelSmall: {
          fill: NAMED_COLORS.PALE_GREY,
          fontSize: '0.75rem',
          fontFamily: 'ABC Favorit Trial',
        },
        svgLabelBig: { fill: NAMED_COLORS.WHITE },
        tickLength: 0,
      }),
      bottomAxisLabelColor: NAMED_COLORS.WHITE,
    }
  )
  const $bottomAxisTicks = useBreakpointValue({ base: 4, md: 10 })
  const xAccessor = (metric: Metric): Date => new Date(metric.date)

  return (
    <XYChart
      theme={$colors.chartTheme}
      xScale={{ type: 'utc' }}
      yScale={{ type: 'linear' }}
      height={340}
      margin={{ left: marginLeft, right: 0, top: 20, bottom: 35 }}
    >
      <LinearGradient from={NAMED_COLORS.LIGHT_BLUE} to="#2C72FF00" id="area" />
      <Grid numTicks={8} columns={false} />
      <AreaSeries
        dataKey="transactions"
        data={data}
        xAccessor={xAccessor}
        yAccessor={yAccessor}
      />
      <LineSeries
        dataKey="transactionsLine"
        data={data}
        xAccessor={xAccessor}
        yAccessor={yAccessor}
        strokeWidth={2}
      />
      <Axis
        orientation="left"
        numTicks={8}
        tickTransform="translate(-8, 0)"
        hideAxisLine
        tickFormat={leftAxisFormatter}
      />
      <Axis
        orientation="bottom"
        numTicks={$bottomAxisTicks}
        hideTicks
        tickLabelProps={() => ({
          fill: $colors.bottomAxisLabelColor,
          fontSize: '0.75rem',
          fontFamily: 'ABC Favorit Trial',
        })}
        tickTransform="translate(0, 18)"
        hideAxisLine
        tickFormat={d => format(d, getDate(d) > 1 ? 'MMM.d' : 'MMM')}
      />
      <Tooltip<Metric>
        showVerticalCrosshair
        snapTooltipToDatumX
        renderTooltip={({ tooltipData }) => {
          if (!tooltipData?.nearestDatum) {
            return null
          }
          const d = xAccessor(tooltipData.nearestDatum.datum)
          return (
            <>
              {d.toUTCString().split(' ').slice(0, -2).join(' ')}:{' '}
              {yAccessor(tooltipData.nearestDatum.datum).toString()}
            </>
          )
        }}
      />
    </XYChart>
  )
}

export default GeneralChart
