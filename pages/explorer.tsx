import { FC } from "react";
import Head from "next/head";
import {
  Flex,
  Box,
  NAMED_COLORS,
  Text,
  useColorModeValue,
  useBreakpointValue,
} from "@ironfish/ui-kit";
import useInfiniteBlocks from "hooks/useInfiniteBlocks";
import { BlocksTable } from "components";
import useInfiniteScroll from "react-infinite-scroll-hook";

const LatestBlocks: FC = () => {
  const [
    {
      loaded,
      data: { data, metadata },
    },
    loadNext,
    hasInitialData,
  ] = useInfiniteBlocks();

  const [observerRef] = useInfiniteScroll({
    loading: !loaded,
    hasNextPage: metadata?.has_next,
    onLoadMore: loadNext,
    rootMargin: "0px 0px 400px 0px",
  });

  return (
    <Flex
      direction="column"
      mt="7rem"
      mb="2rem"
      mr={{ base: "2rem", lg: "15%" }}
      ml={{ base: "2rem", lg: "15%" }}
    >
      <Text fontSize="1.5rem" mb="0.625rem">
        All Blocks
      </Text>
      <BlocksTable isLoading={hasInitialData} data={data} />
      <Box h={0} ref={observerRef} />
    </Flex>
  );
};

const Explorer: FC = () => {
  return (
    <main style={{ width: "100%", height: "100%" }}>
      <Head>
        <title>Iron Fish: All Blocks</title>
      </Head>
      <LatestBlocks />
    </main>
  );
};

export default Explorer;
