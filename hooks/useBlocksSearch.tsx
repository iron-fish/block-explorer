import { useContext, useEffect } from "react";

import { BlockContext, TransactionContext } from "contexts/ServiceContexts";
import {
  AsyncDataProps,
  BlocksParameters,
  BlockType,
  ResponseType,
} from "types";

import useAsyncDataWrapper from "./useAsyncDataWrapper";

const useBlocksSearch = (
  query: BlocksParameters = {}
): AsyncDataProps<ResponseType<BlockType[]>> => {
  const blockService = useContext(BlockContext);
  const transactionService = useContext(TransactionContext);
  const [result, wrapper] = useAsyncDataWrapper<ResponseType<BlockType[]>>();

  useEffect(() => {
    if (query.search?.trim()) {
      wrapper(
        Promise.all([
          blockService.blocks({
            ...query,
            with_transactions: true,
            main: true,
          }),
          transactionService.transactions({ ...query, with_blocks: true }),
        ]).then(([blocks, transactions]) => {
          return { data: [...blocks.data, ...transactions.data] };
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.search]);

  return result;
};

export default useBlocksSearch;
