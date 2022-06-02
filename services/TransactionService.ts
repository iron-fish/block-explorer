import {
  TransactionsParameters,
  TransactionType,
  FindTransactionParameters,
} from 'types'
import Service from './Service'

class TransactionService extends Service {
  constructor() {
    super('/transactions')
  }

  transactions(query: TransactionsParameters): Promise<TransactionType[]> {
    return this.fetcher.get('', {
      params: query,
    }).then(({ data }) => data)
  }

  find(query: FindTransactionParameters): Promise<TransactionType> {
    return this.fetcher.get('/find', {
      params: query,
    })
  }

  toString(): string {
    return 'TransactionService'
  }
}

export default TransactionService
