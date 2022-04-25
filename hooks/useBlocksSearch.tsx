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
  search: string = ""
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
          }),
          transactionService.transactions({ search, with_blocks: true }),
        ]).then(([blocks, transactions]) => {
          return { data: [...blocks.data, ...transactions.data], object: 'list' };
        })
      );
    } else {
      wrapper(Promise.resolve({ data: [], object: 'list' }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return result;
};

export default useBlocksSearch;
