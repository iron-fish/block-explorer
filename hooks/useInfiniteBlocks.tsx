import { useContext, useEffect, useCallback, useState } from 'react'

import { BlockContext } from "contexts/ServiceContexts";
import { AsyncDataProps, BlockType, ResponseType } from "types";
import { uniqBy, sort } from 'ramda'

const useInfiniteBlocks = (
  limit: number = 20,
  with_transactions: boolean = false,
  only_main: boolean | null = true
): [AsyncDataProps<ResponseType<BlockType[]>>, VoidFunction] => {
  const service = useContext(BlockContext)
  const [loaded, setLoaded] = useState<boolean>(false)
  const [error, setError] = useState<Error>()
  const [blocksData, setBlocksData] = useState<ResponseType<BlockType[]>>({
    data: [],
    object: '',
  })

  const loadBlocks = useCallback(
    params => {
      setLoaded(false)
      setError(undefined)
      service
        .blocks(params)
        .then(data =>
          setBlocksData(prevData => ({
            ...data,
            data: sort(
              (blockA: BlockType, blockB: BlockType) => blockB.sequence - blockA.sequence, 
              uniqBy(block => block.id, prevData.data.concat(data.data))
            ),
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

  useEffect(() => {
    loadBlocks({ limit, with_transactions, main: only_main });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, with_transactions]);

  return [
    {
      loaded,
      error,
      data: {
        ...blocksData,
        metadata: {
          has_next: blocksData.data[blocksData.data.length - 1]?.id > 0,
          has_previous: true
        }
      },
    },
    loadNext,
  ]
}

export default useInfiniteBlocks
