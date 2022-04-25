import { useContext, useEffect } from "react";

import { BlockContext, TransactionContext } from "contexts/ServiceContexts";
import {
  AsyncDataProps,
  BlocksParameters,
  BlockType,
  ResponseType,
  TransactionType,
} from "types";

import useAsyncDataWrapper from "./useAsyncDataWrapper";

const useBlocksSearch = (
  search: string = "",
  limit: number = 5
): AsyncDataProps<ResponseType<(BlockType | TransactionType)[]>> => {
  const blockService = useContext(BlockContext);
  const transactionService = useContext(TransactionContext);
  const [result, wrapper] = useAsyncDataWrapper<ResponseType<(BlockType | TransactionType)[]>>();

  useEffect(() => {
    if (search?.trim()) {
      wrapper(
        Promise.all([
          blockService.blocks({
            search,
            with_transactions: true,
            main: true,
            limit
          }),
          transactionService.transactions({ search, with_blocks: true, limit }),
        ]).then(([blocks, transactions]) => {
          return { data: [...blocks.data, ...transactions.data], object: 'list' };
        })
      );
    } else {
      wrapper(Promise.resolve({ data: [], object: 'list' }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, limit]);

  return result;
};

export default useBlocksSearch;
