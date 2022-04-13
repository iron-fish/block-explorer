import { BlocksParameters, BlocksStatisticParameters, BlockType, FindBlockParameters, Response } from "types";
import Service from "./Service";

class BlockService extends Service {
  constructor() {
    super('/blocks')
  }

  blocks(query: BlocksParameters): Promise<Response<BlockType[]>> {
    return this.fetcher.get('', {
      params: query
    }).then(({ data }) => data)
  }

  find(query: FindBlockParameters) {
    return this.fetcher.get('/find', {
      params: query
    }).then(({ data }) => data)
  }

  head() {
    return this.fetcher.get('/head').then(({ data }) => data)
  }

  statistic(query: BlocksStatisticParameters) {
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
