import { useContext, useEffect } from 'react'

import { BlockContext, TransactionContext } from 'contexts/ServiceContexts'
import { AsyncDataProps, BlockType, ResponseType, TransactionType } from 'types'

import useAsyncDataWrapper from './useAsyncDataWrapper'

interface SearchResultType<T> {
  label: string;
  data: T[];
}

const useBlocksSearch = (
  search: string = "",
  limit: number = 5
): AsyncDataProps<
  ResponseType<
    (SearchResultType<BlockType> | SearchResultType<TransactionType>)[]
  >
> => {
  const blockService = useContext(BlockContext);
  const transactionService = useContext(TransactionContext);
  const [result, wrapper] =
    useAsyncDataWrapper<
      ResponseType<
        (SearchResultType<BlockType> | SearchResultType<TransactionType>)[]
      >
    >();

  useEffect(() => {
    if (search?.trim()) {
      wrapper(
        Promise.all([
          blockService
            .blocks({
              search,
              with_transactions: true,
              main: true,
              limit,
            })
            .then(({ data }) => data),
          transactionService.transactions({ search, with_blocks: true, limit }),
        ]).then(([blocks, transactions]) => {
          return {
            data: [
              { label: "Blocks", data: blocks },
              { label: "Transactions", data: transactions },
            ],
            object: "list",
          };
        })
      )
    } else {
      wrapper(Promise.resolve({ data: [], object: "list" }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, limit])

  return result
}

export default useBlocksSearch
