import { FC } from "react";
import mean from "ramda/src/mean";

import GeneralChart, { GeneralChartProps } from "./GeneralChart";
import ChartBox from "./ChartBox";
import { Metric } from "types";
import { getAverageWithAccessor } from "utils/getAverageWithAccessor";

const BlockTime: FC<Pick<GeneralChartProps, "data">> = ({ data }) => {
  const valueAccessor = (d: Metric) =>
    Math.round(d.average_block_time_ms / 1000);

  return (
    <ChartBox
      header="Average Block Time"
      average={`${getAverageWithAccessor(valueAccessor)(data)} seconds`}
    >
      <GeneralChart yAccessor={valueAccessor} data={data} />
    </ChartBox>
  );
};

export default BlockTime;
