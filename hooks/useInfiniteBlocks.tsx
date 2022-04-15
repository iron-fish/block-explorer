import { useContext, useEffect, useCallback, useState } from "react";

import { BlockContext } from "contexts/ServiceContexts";
import {
  AsyncDataProps,
  BlocksParameters,
  BlockType,
  ResponseType,
} from "types";

import useAsyncDataWrapper from "./useAsyncDataWrapper";

const useInfiniteBlocks = (
  limit: number = 20,
  with_transactions: boolean =  false
): [AsyncDataProps<ResponseType<BlockType[]>>, VoidFunction, boolean] => {
  const service = useContext(BlockContext);
  const [result, wrapper] = useAsyncDataWrapper<ResponseType<BlockType[]>>();
  const { data: { data } = {}, loaded, error } = result;
  const [loadedBlocks, setLoadedBlocks] = useState<BlockType[]>([]);
  const loadBlocks = useCallback(
    (params) => wrapper(service.blocks(params)),
    [service, wrapper]
  );

  useEffect(() => {
    if (loaded) {
      setLoadedBlocks((prev) => prev.concat(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  const loadNext: VoidFunction = (): void => {
    loadBlocks({
      limit,
      with_transactions,
      main: true,
      after: loadedBlocks[loadedBlocks.length - 1].id,
    });
  };

  useEffect(() => {
    loadBlocks({ limit, with_transactions, main: true });
  }, [limit, with_transactions, loadBlocks]);

  return [
    {
      data: {
        ...result.data,
        data: loadedBlocks,
      },
      loaded,
      error,
    },
    loadNext,
    loadedBlocks.length < limit,
  ];
};

export default useInfiniteBlocks;
