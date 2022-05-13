import { FC } from "react";
import mean from "ramda/src/mean";

import GeneralChart, { GeneralChartProps }  from "./GeneralChart";
import ChartBox from "./ChartBox";
import Metric from "types/domain/Metric";

const Difficulty: FC<Pick<GeneralChartProps, "data">> = ({ data }) => {
  const valueAccessor = (d: Metric) => d.average_difficulty / 1e12;

  return (
    <ChartBox
      header="Difficulty (in trillions)"
      average={Math.ceil(mean(data.map(valueAccessor)))}
    >
      <GeneralChart
        yAccessor={valueAccessor}
        data={data}
        leftAxisFormatter={(d) => `${d}T`}
      />
    </ChartBox>
  );
};

export default Difficulty;
