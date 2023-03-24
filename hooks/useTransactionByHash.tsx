import { useContext, useEffect } from 'react'

import { TransactionContext } from 'contexts/ServiceContexts'
import { TransactionType } from 'types'
import useAsyncDataWrapper from './useAsyncDataWrapper'

const useTransactionByHash = (hash: string) => {
  const service = useContext(TransactionContext)
  const [result, wrapper] = useAsyncDataWrapper<TransactionType>()

  useEffect(() => {
    hash && wrapper(service.find({ hash, with_blocks: true }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash])
  return result
}

export default useTransactionByHash
