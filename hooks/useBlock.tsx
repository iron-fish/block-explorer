import { useContext, useEffect } from 'react'

import { BlockContext } from 'contexts/ServiceContexts'
import { BlockType } from 'types'
import useAsyncDataWrapper from './useAsyncDataWrapper'

const useBlock = (id: string) => {
  const service = useContext(BlockContext)
  const [result, wrapper] = useAsyncDataWrapper<BlockType>()
  const wrappedServiceCall = () => {
    const options = isNaN(Number(id))
      ? { hash: id, with_transactions: true }
      : { sequence: Number(id), with_transactions: true }
    return wrapper(service.find(options))
  }

  useEffect(() => {
    if (id) {
      wrappedServiceCall()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  return {
    ...result,
    refresh: () => wrappedServiceCall(),
  }
}

export default useBlock
