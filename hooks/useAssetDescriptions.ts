import { useContext, useEffect } from 'react'

import { AssetDescriptionContext } from 'contexts/ServiceContexts'
import {
  AssetDescriptionParameters,
  AssetDescriptionType,
  AsyncDataProps,
  ResponseType,
} from 'types'

import useAsyncDataWrapper from './useAsyncDataWrapper'

const useAssetDescriptions = (
  query: AssetDescriptionParameters
): AsyncDataProps<AssetDescriptionType[]> => {
  const service = useContext(AssetDescriptionContext)
  const [result, wrapper] =
    useAsyncDataWrapper<ResponseType<AssetDescriptionType[]>>()

  useEffect(() => {
    wrapper(service.get(query))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.after, query.before, query.limit, query.asset])

  return {
    ...result,
    ...result.data,
  }
}

export default useAssetDescriptions
