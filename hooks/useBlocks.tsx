import { BlockContext } from "contexts/Contexts"
import { useContext, useEffect } from "react"
import { AsyncDataProps, BlocksParameters, BlockType, Response } from "types"

import useAsyncDataWrapper from "./useAsyncDataWrapper"

const useBlocks = (query: BlocksParameters): AsyncDataProps<Response<BlockType[]>> => {
  const service = useContext(BlockContext)
  const [result, wrapper] = useAsyncDataWrapper<Response<BlockType[]>>()

  useEffect(() => {
    wrapper(service.blocks(query))
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