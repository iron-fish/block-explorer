import { BlocksParameters, BlocksStatisticParameters, BlockType, FindBlockParameters, ResponseType } from "types";
import Service from "./Service";

class TransactionService extends Service {
  constructor() {
    super('/transactions')
  }

  transactions(query: BlocksParameters): Promise<ResponseType<BlockType[]>> {
    return this.fetcher.get('', {
      params: query
    }).then(({ data }) => data)
  }

  find(query: FindBlockParameters): Promise<BlockType> {
    return this.fetcher.get('/find', {
      params: query
    }).then(({ data }) => data)
  }

  toString(): string {
    return 'TransactionService'
  }
}

export default TransactionService
