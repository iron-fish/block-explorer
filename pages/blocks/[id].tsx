import { Box, Flex, useBreakpointValue } from "@ironfish/ui-kit"
import { Card } from "components";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs"
import useBlockBySeq from "hooks/useBlockBySeq";
import Head from "next/head"
import { useRouter } from "next/router"
import {
  DifficultyIcon,
  HeightIcon,
  LatestBlockHashIcon,
  LatestBlockTXNIcon,
  SecondsToBlockIcon,
  TotalSupplyIcon
} from "svgx";
import { truncateHash } from "utils/hash";
import size from "byte-size"
import { TransactionsTable } from "components/TransactionsTable";

const BlockInfo = ({ id }) => {
  const cardWidth = useBreakpointValue({
    base: '100%',
    sm: 'calc(50% - 1rem)',
    md: 'calc(33% - 1rem)',
  });
  const block = useBlockBySeq(id);

  const getValue = (field, transform = (value) => value) => {
    return block.loaded ? (
      transform(block?.data && block?.data[field] || '')
    ) : (
      <span>&nbsp;</span>
    );
  };

  return (
    <>
      <Box mt="0.5rem" mb="2rem">
        <h3>Block Information</h3>
      </Box>
      <Flex w="100%" wrap="wrap" mb="3.5rem" mx="-0.5rem">
        <Card
          m="0.5rem"
          w={cardWidth}
          label="Height"
          value={getValue('sequence')}
          icon={<HeightIcon />}
          isLoading={!block.loaded}
        />
        <Card
          m="0.5rem"
          w={cardWidth}
          label="Block hash"
          value={getValue('hash', truncateHash)}
          icon={<DifficultyIcon />}
          isLoading={!block.loaded}
        />
        <Card
          m="0.5rem"
          w={cardWidth}
          label="Size"
          value={getValue('size', size).toString()}
          icon={<LatestBlockHashIcon />}
          isLoading={!block.loaded}
        />
        <Card
          m="0.5rem"
          w={cardWidth}
          label="Difficulty"
          value={getValue('difficulty')}
          icon={<DifficultyIcon />}
          isLoading={!block.loaded}
        />

        <Card
          m="0.5rem"
          w={cardWidth}
          label="Transactions Count"
          value={getValue('transactions_count')}
          icon={<LatestBlockTXNIcon />}
          isLoading={!block.loaded}
        />
        <Card
          m="0.5rem"
          w={cardWidth}
          label="Timestamp"
          value={getValue('timestamp', (value) => {
            const date = new Date(value)
            return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
          })}
          icon={<SecondsToBlockIcon />}
          isLoading={!block.loaded}
        />
        <Card
          m="0.5rem"
          w={cardWidth}
          label="Graffiti"
          value={getValue('graffiti', value => value)}
          icon={<TotalSupplyIcon />}
          isLoading={!block.loaded}
        />
      </Flex>
      <Box my="0.5rem">
        <h3>Transactions</h3>
      </Box>
      <TransactionsTable data={block.loaded ? block.data?.transactions.map(transaction => (
        {
          ...transaction,
          blocks: [block.data]
        }
      )) : [null]} />
    </>
  );
};

export default function BlockInformationPage() {
  const router = useRouter()
  const { id } = router.query

  return (
    <main style={{ width: '100%', height: '100%' }}>
      <Head>
        <title>Iron Fish: Block {id}</title>
      </Head>
      <Box mx={{ base: '2rem', lg: '15%' }} mb="6rem" zIndex={1}>
        <Box mt="2.5rem">
          <Breadcrumbs />
        </Box>
        <BlockInfo id={id} />
      </Box>
    </main>
  )
}
