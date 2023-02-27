import { useContext, useEffect } from 'react'

import { AssetContext } from 'contexts/ServiceContexts'
import { AssetType } from 'types'
import useAsyncDataWrapper from './useAsyncDataWrapper'

const useAsset = (id: string) => {
  const service = useContext(AssetContext)
  const [result, wrapper] = useAsyncDataWrapper<AssetType>()

  useEffect(() => {
    if (id) {
      wrapper(
        service.find({
          id,
        })
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  return result
}

export default useAsset
