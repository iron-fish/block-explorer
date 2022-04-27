import { TransactionsParameters, TransactionType, FindTransactionParameters, ResponseType } from "types";
import Service from "./Service";

class TransactionService extends Service {
  constructor() {
    super('/transactions')
  }

  transactions(query: TransactionsParameters): Promise<ResponseType<TransactionType[]>> {
    return this.fetcher.get('', {
      params: query
    })
  }

  find(query: FindTransactionParameters): Promise<TransactionType> {
    return this.fetcher.get('/find', {
      params: query
    })
  }

  toString(): string {
    return 'TransactionService'
  }
}

export default TransactionService
