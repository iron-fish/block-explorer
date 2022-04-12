import { BlockContext } from "contexts/Contexts"
import { BlocksParameters, BlockType, Response } from "types"

import useAsyncData from "./useAsyncData"

const useBlocks = (query: BlocksParameters) => {
  return useAsyncData<Response<BlockType[]>, BlocksParameters>(BlockContext, 'blocks', query)
}

export default useBlocks