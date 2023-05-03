import { useContext, useEffect } from 'react'

import { BlockContext } from 'contexts/ServiceContexts'
import { BlockHead } from 'types'
import useAsyncDataWrapper from './useAsyncDataWrapper'

const useBlockHead = () => {
  const service = useContext(BlockContext)
  const [result, wrapper] = useAsyncDataWrapper<BlockHead>()

  useEffect(() => {
    wrapper(service.head())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return result
}

export default useBlockHead
