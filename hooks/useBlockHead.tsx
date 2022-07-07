import { useContext, useEffect } from 'react'

import { BlockContext } from 'contexts/ServiceContexts'
import { BlockType } from 'types'
import useAsyncDataWrapper from './useAsyncDataWrapper'

const useBlockHead = () => {
  const service = useContext(BlockContext)
  const [result, wrapper] = useAsyncDataWrapper<BlockType>()

  useEffect(() => {
    wrapper(service.head())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return result
}

export default useBlockHead
