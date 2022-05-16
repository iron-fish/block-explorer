import { useContext, useEffect } from "react"

import { BlockContext } from "contexts/ServiceContexts"
import { AsyncDataProps, BlocksParameters, BlockType, ResponseType } from "types"

import useAsyncDataWrapper from "./useAsyncDataWrapper"

const useBlocks = (query: BlocksParameters = {}): AsyncDataProps<ResponseType<BlockType[]>> => {
  const service = useContext(BlockContext)
  const [result, wrapper] = useAsyncDataWrapper<ResponseType<BlockType[]>>()

  useEffect(() => {
    wrapper(service.blocks(query).then(({ data }) => data))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    query.after,
    query.before,
    query.limit,
    query.main,
    query.search,
    query.sequence_gte,
    query.sequence_lt,
    query.transaction_id,
    query.with_transactions
  ])

  return result
}

export default useBlocks