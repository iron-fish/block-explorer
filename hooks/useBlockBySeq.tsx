import { useContext, useEffect } from "react"

import { BlockContext } from "contexts/ServiceContexts"
import { BlockType } from "types"
import useAsyncDataWrapper from "./useAsyncDataWrapper"

const useBlockBySeq = (seq: number) => {
  const service = useContext(BlockContext)
  const [result, wrapper] = useAsyncDataWrapper<BlockType>()

  useEffect(() => {
    wrapper(service.find({ sequence: seq }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seq])
  return result
}

export default useBlockBySeq