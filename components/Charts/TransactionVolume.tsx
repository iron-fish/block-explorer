import { FC } from "react";
import mean from "ramda/src/mean";

import GeneralChart, { GeneralChartProps }  from "./GeneralChart";
import ChartBox from "./ChartBox";
import Metric from "types/domain/Metric";

const TransactionVolume: FC<Pick<GeneralChartProps, "data">> = ({ data }) => {
  const valueAccessor = (d: Metric) => d.transactions_count;

  return (
    <ChartBox
      header="Daily Transaction Volume"
      average={Math.ceil(mean(data.map(valueAccessor)))}
    >
      <GeneralChart yAccessor={valueAccessor} data={data} />
    </ChartBox>
  );
};

export default TransactionVolume;
