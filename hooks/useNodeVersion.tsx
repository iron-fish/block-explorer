import { useContext, useEffect } from 'react'

import { VersionContext } from 'contexts/ServiceContexts'
import { NodeVersionType } from 'types'
import useAsyncDataWrapper from './useAsyncDataWrapper'

const useNodeVersion = () => {
  const service = useContext(VersionContext)
  const [result, wrapper] = useAsyncDataWrapper<NodeVersionType>()

  useEffect(() => {
    wrapper(service.current())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return result
}

export default useNodeVersion
