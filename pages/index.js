import { Card, BlocksTable } from 'components';
import useBlockHead from 'hooks/useBlockHead';
import useBlocks from 'hooks/useBlocks';
import { truncateHash } from 'utils/hash';
import Head from 'next/head';
import {
  Flex,
  Box,
  HStack,
  Button,
  Center,
  NAMED_COLORS,
  Text,
  useColorModeValue,
  useBreakpointValue,
} from '@ironfish/ui-kit';
import {
  HeightIcon,
  DifficultyIcon,
  LatestBlockHashIcon,
  LatestBlockTXNIcon,
  SecondsToBlockIcon,
  TotalSupplyIcon,
} from 'svgx';

const LastBlockInfo = () => {
  const cardWidth = useBreakpointValue({
    base: '100%',
    sm: 'calc(50% - 1rem)',
    md: 'calc(33% - 1rem)',
  });
  const headBlock = useBlockHead();

  const getValue = (field, transform = (value) => value) => {
    return headBlock.loaded ? (
      transform(headBlock.data[field])
    ) : (
      <span>&nbsp;</span>
    );
  };

  return (
    <Flex w="100%" wrap="wrap" mb="2.25rem">
      <Card
        m="0.5rem"
        w={cardWidth}
        label="Difficulty"
        value={getValue('difficulty')}
        icon={<DifficultyIcon />}
      />
      <Card
        m="0.5rem"
        w={cardWidth}
        label="Height"
        value={getValue('sequence')}
        icon={<HeightIcon />}
      />
      <Card
        m="0.5rem"
        w={cardWidth}
        label="Latest block hash"
        value={getValue('hash', truncateHash)}
        icon={<LatestBlockHashIcon />}
      />
      <Card
        m="0.5rem"
        w={cardWidth}
        label="Latest Block txn"
        value={getValue('transactions_count')}
        icon={<LatestBlockTXNIcon />}
      />
      <Card
        m="0.5rem"
        w={cardWidth}
        label="Seconds to block"
        value={getValue('time_since_last_block_ms', (value) =>
          Math.floor(value / 1000),
        )}
        icon={<SecondsToBlockIcon />}
      />
      <Card
        m="0.5rem"
        w={cardWidth}
        label="Total Supply"
        value="???"
        icon={<TotalSupplyIcon />}
      />
    </Flex>
  );
};

const LatestBlocks = () => {
  const { loaded, data } = useBlocks({
    limit: 10,
    main: true
  });

  return (
    <Flex direction="column" mb="2rem">
      <Text fontSize="1.5rem" mb="0.625rem">
        Latest Blocks
      </Text>
      <BlocksTable isLoading={!loaded} data={data ? data.data : null} />
    </Flex>
  );
};

export default function Home() {
  const colorModeStyles = useColorModeValue(
    {
      imageBg: '#1b006a',
      bgImage: `url('/images/home_page_logo_purple.png')`,
      mainBg: NAMED_COLORS.WHITE,
    },
    {
      imageBg: NAMED_COLORS.BLACK,
      bgImage: `url('/images/home_page_logo_black.png')`,
      mainBg: NAMED_COLORS.LIGHT_BLACK,
    },
  );

  return (
    <main style={{ width: '100%', height: '100%' }}>
      <Head>
        <title>Iron Fish: Home</title>
      </Head>
      <Box
        sx={{
          h: { base: '35.5rem', sm: '33.75rem' },
          w: '100%',
          bgColor: colorModeStyles.imageBg,
          bgImage: { base: null, sm: colorModeStyles.bgImage },
          bgRepeat: 'no-repeat',
          pos: 'absolute',
          backgroundPositionX: 'right',
          backgroundSize: '55.9375rem',
        }}
      />
      <Flex
        justify="center"
        pt={{ base: '6rem', sm: '7.5rem' }}
        pb="6rem"
        bgColor={colorModeStyles.mainBg}
      >
        <Box
          mr={{ base: '2rem', lg: '15%' }}
          ml={{ base: '2rem', lg: '15%' }}
          w="100%"
          zIndex={1}
        >
          <Flex direction="column" mb="5.3125rem">
            <Text
              fontSize="3.25rem"
              lineHeight="3.8675rem"
              color={NAMED_COLORS.WHITE}
              mb="1.125rem"
            >
              Welcome&nbsp;to&nbsp;the
              <br />
              Iron&nbsp;Fish&nbsp;Block Explorer
            </Text>
            <Text fontSize="1.5rem" mb="2.25rem" color={NAMED_COLORS.WHITE}>
              Blockchain statistics for $IRON
            </Text>
            <HStack>
              <Button variant="secondary" size="medium">
                View All Blocks
              </Button>
              <Button variant="secondary" size="medium">
                View Chain Explorer
              </Button>
            </HStack>
          </Flex>
          <LastBlockInfo />
          <Button variant="secondary" size="medium" mb="6rem">
            View All Charts
          </Button>
          <LatestBlocks />
          <Center>
            <Button variant="secondary" size="medium">
              View All Blocks
            </Button>
          </Center>
        </Box>
      </Flex>
    </main>
  );
}
