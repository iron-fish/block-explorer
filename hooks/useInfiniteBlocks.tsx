import { useContext, useEffect, useCallback, useState } from "react";

import { BlockContext } from "contexts/ServiceContexts";
import { AsyncDataProps, BlockType, ResponseType } from "types";

const useInfiniteBlocks = (
  limit: number = 20,
  with_transactions: boolean = false
): [AsyncDataProps<ResponseType<BlockType[]>>, VoidFunction, boolean] => {
  const service = useContext(BlockContext);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const [data, setData] = useState<ResponseType<BlockType[]>>({ data: [], object: '',  });

  const loadBlocks: Function = useCallback(
    (params) => {
      setLoaded(false);
      setError(undefined);
      service
        .blocks(params)
        .then((data) =>
          setData((prevData) => ({
            ...data,
            data: prevData.data.concat(data.data),
          }))
        )
        .catch(setError)
        .finally(() => setLoaded(true));
    },
    [service]
  );

  const loadNext: VoidFunction = (): void => {
    loadBlocks({
      limit,
      with_transactions,
      main: true,
      after: data.data[data.data.length - 1].id,
    });
  };

  useEffect(() => {
    loadBlocks({ limit, with_transactions, main: true });
  }, [limit, with_transactions, loadBlocks]);

  return [
    {
      data,
      loaded,
      error,
    },
    loadNext,
    data.data.length < limit,
  ];
};

export default useInfiniteBlocks;
