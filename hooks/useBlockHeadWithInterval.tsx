import { useContext, useEffect, useRef } from 'react'

import { BlockContext } from 'contexts/ServiceContexts'
import { BlockType } from 'types'
import useAsyncDataWrapper from './useAsyncDataWrapper'

const useBlockHeadWithInterval = timeout => {
  const service = useContext(BlockContext)
  const [result, wrapper] = useAsyncDataWrapper<BlockType>()

  useEffect(() => {
    wrapper(service.head())
    const interval = setInterval(() => wrapper(service.head()), timeout)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return result
}

export default useBlockHeadWithInterval
