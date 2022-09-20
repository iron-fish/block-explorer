import { useContext, useEffect } from 'react'

import { BlockContext, TransactionContext } from 'contexts/ServiceContexts'
import { AsyncDataProps, BlockType, ResponseType, TransactionType } from 'types'

import useAsyncDataWrapper from './useAsyncDataWrapper'

interface SearchResultType {
  label: string
  data: (BlockType | TransactionType)[]
}

const useBlocksSearch = (
  search = '',
  limit = 5
): AsyncDataProps<ResponseType<SearchResultType[]>> => {
  const blockService = useContext(BlockContext)
  const transactionService = useContext(TransactionContext)
  const [result, wrapper] =
    useAsyncDataWrapper<ResponseType<SearchResultType[]>>()

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
            data: [{ label: 'Results', data: [...blocks, ...transactions] }],
            object: 'list',
          }
        })
      )
    } else {
      wrapper(Promise.resolve({ data: [], object: 'list' }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, limit])

  return result
}

export default useBlocksSearch
