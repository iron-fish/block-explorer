import { BlocksParameters, BlocksStatisticParameters, BlockType, FindBlockParameters, ResponseType } from "types";
import Metric from "types/domain/Metric";
import Service from "./Service";

class BlockService extends Service {
  constructor() {
    super('/blocks')
  }

  blocks(query: BlocksParameters): Promise<ResponseType<BlockType[]>> {
    return this.fetcher.get('', {
      params: query
    }).then(({ data }) => data)
  }

  find(query: FindBlockParameters): Promise<BlockType> {
    return this.fetcher.get('/find', {
      params: query
    }).then(({ data }) => data)
  }

  head(): Promise<BlockType> {
    return this.fetcher.get('/head').then(({ data }) => data)
  }

  status(): Promise<BlockType> {
    return this.fetcher.get('/status').then(({ data }) => data)
  }

  statistic(query: BlocksStatisticParameters): Promise<ResponseType<Metric[]>> {
    return this.fetcher.get('/metrics', {
      params: {
        start: query.start.toISOString(),
        end: query.end.toISOString(),
        granularity: query.granularity
      }
    }).then(({ data }) => data)
  }

  toString(): string {
    return 'BlockService'
  }
}

export default BlockService
