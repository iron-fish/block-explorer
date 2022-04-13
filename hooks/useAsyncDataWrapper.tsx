import { useState, useCallback } from "react";

import { AsyncDataProps } from "types";

function useAsyncDataWrapper<T>(): [AsyncDataProps<T>, (promise: Promise<T>) => void] {
  const [loaded, setLoaded] = useState<boolean>(false)
  const [error, setError] = useState<Error>()
  const [data, setData] = useState<T>()

  const promiseWrapper = useCallback(
    (promise: Promise<T>) => {
      setLoaded(false)
      setError(undefined)
      promise
        .then(setData)
        .catch(setError)
        .finally(() => setLoaded(true))
    }, []
  )

  return [{ loaded, data, error }, promiseWrapper]
}

export default useAsyncDataWrapper
