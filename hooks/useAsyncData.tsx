import { useEffect, useState, Context, useContext } from "react";

import Service from "services/Service";
import { AsyncDataProps } from "types";

function useAsyncData<T, Q>(context: Context<Service>, method: string, query: Q): AsyncDataProps<T> {
  const service = useContext(context)
  const [result, setResult] = useState<AsyncDataProps<T>>({
    loaded: false
  })

  const strQuery = query && JSON.stringify(query)

  useEffect(() => {
    setResult({
      loaded: false
    })
    service[method](query)
      .then(data => setResult({
        loaded: true,
        data: data
      }))
      .catch(e => setResult({
        loaded: true,
        error: e
      }))
  }, [service.toString(), method, strQuery])

  return result
}

export default useAsyncData
