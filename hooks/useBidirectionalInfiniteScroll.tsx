import { useContext, useEffect, useCallback, useState } from 'react'

import { BlockContext } from 'contexts/ServiceContexts'
import { AsyncDataProps, BlockType, ResponseType } from 'types'
import { uniqBy, sortBy, descend } from 'ramda'
import safeProp from 'utils/safeProp'

const useBidirectionalInfiniteScroll = (
  limit = 20,
  with_transactions = false,
  only_main: boolean | null = true,
  after = null
): [
  AsyncDataProps<ResponseType<BlockType[]>>,
  VoidFunction,
  VoidFunction,
  () => Promise<void>
] => {
  const service = useContext(BlockContext)
  const [loaded, setLoaded] = useState<boolean>(false)
  const [error, setError] = useState<Error>()
  const [blocksData, setBlocksData] = useState<ResponseType<BlockType[]>>({
    data: [],
    object: '',
    metadata: {
      has_previous: true,
      has_next: true,
    },
  })

  const loadBlocks = useCallback(
    params => {
      setLoaded(false)
      setError(undefined)
      return service
        .blocks(params)
        .then(data =>
          setBlocksData(prevData => ({
            ...data,
            data: sortBy(descend(safeProp('sequence')))(
              uniqBy(
                safeProp('id'),
                params.before
                  ? data.data.concat(prevData.data)
                  : prevData.data.concat(data.data)
              )
            ),
            metadata: {
              has_previous: params.before
                ? data.metadata.has_previous
                : blocksData.metadata?.has_previous,
              has_next: data.metadata.has_next,
            },
          }))
        )
        .catch(setError)
        .finally(() => setLoaded(true))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const loadNext = () => {
    loadBlocks({
      limit,
      with_transactions,
      main: true,
      after: blocksData.data[blocksData.data.length - 1].id,
    })
  }

  const loadPrev = () => {
    return loadBlocks({
      limit,
      with_transactions,
      main: true,
      before: blocksData.data[0].id,
    })
  }

  const reloadBlocks = () => {
    setBlocksData({ data: [], object: '' })
    return loadBlocks({ limit, with_transactions, main: only_main })
  }

  useEffect(() => {
    const params = { limit, with_transactions, main: only_main }
    setLoaded(false)
    setError(undefined)
    Promise.all([
      service.blocks({ ...params, before: after - 1 }),
      service.blocks({ ...params, after }),
    ])
      .then(([dataBefore, dataAfter]) =>
        setBlocksData(() => ({
          object: 'list',
          data: sortBy(descend(safeProp('sequence')))(
            uniqBy(safeProp('id'), dataBefore.data.concat(dataAfter.data))
          ),
          metadata: {
            has_previous: dataBefore.metadata.has_previous,
            has_next: dataAfter.metadata.has_next,
          },
        }))
      )
      .catch(setError)
      .finally(() => setLoaded(true))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, with_transactions, after])

  return [
    {
      loaded,
      error,
      data: {
        ...blocksData,
        metadata: {
          has_next: blocksData.data[blocksData.data.length - 1]?.id > 0,
          has_previous: blocksData.metadata?.has_previous,
        },
      },
    },
    loadNext,
    loadPrev,
    reloadBlocks,
  ]
}

export default useBidirectionalInfiniteScroll
