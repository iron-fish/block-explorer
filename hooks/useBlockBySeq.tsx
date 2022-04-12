import { useContext } from "react"

import { BlockContext } from "contexts/Contexts"
import { BlockType, FindBlockParameters } from "types"
import useAsyncData from "./useAsyncData"

const useBlockBySeq = (seq: number) => {
  return useAsyncData<BlockType, FindBlockParameters>(BlockContext, 'find', { sequence: seq })
}

export default useBlockBySeq