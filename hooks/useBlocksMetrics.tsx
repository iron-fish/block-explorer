import { useContext, useEffect } from 'react'

import { BlockContext } from 'contexts/ServiceContexts'
import useAsyncDataWrapper from './useAsyncDataWrapper'
import Metric from 'types/domain/Metric'

const useBlocksMetrics = (startDate, endDate, granularity) => {
  const service = useContext(BlockContext)
  const [result, wrapper] = useAsyncDataWrapper<Metric[]>()

  useEffect(() => {
    wrapper(
      service
        .statistic({ start: startDate, end: endDate, granularity })
        .then(data =>
          data
            .map((metric: Metric) => ({
              ...metric,
              date: new Date(metric.date),
            }))
            .sort((a: any, b: any) => a.date - b.date)
        )
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate, granularity])

  return result
}

export default useBlocksMetrics
