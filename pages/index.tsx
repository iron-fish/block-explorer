import { Card, BlocksTable } from 'components'
import RoutePaths from 'constants/RoutePaths'
import useBlockHead from 'hooks/useBlockHead'
import useBlocks from 'hooks/useBlocks'
import { truncateHash } from 'utils/hash'
import Head from 'next/head'
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
} from '@ironfish/ui-kit'
import {
  HeightIcon,
  DifficultyIcon,
  LatestBlockHashIcon,
  LatestBlockTXNIcon,
  SecondsToBlockIcon,
  TotalSupplyIcon,
} from 'svgx'
import Link from 'next/link'
import { BlockType } from 'types'

const BLOCKS_LIMIT = 10
const LAST_BLOCK_INFO_CARDS = [
  {
    key: 'difficulty-card',
    label: 'Difficulty',
    value: (block: BlockType | null) => block?.difficulty,
    icon: <DifficultyIcon />,
  },
  {
    key: 'height-card',
    label: 'Height',
    value: (block: BlockType | null) => block?.sequence,
    icon: <HeightIcon />,
  },
  {
    key: 'hash-card',
    label: 'Latest block hash',
    value: (block: BlockType | null) => truncateHash(block?.hash),
    icon: <LatestBlockHashIcon />,
  },
  {
    key: 'txn-card',
    label: 'Latest Block txn',
    value: (block: BlockType | null) => block?.transactions_count,
    icon: <LatestBlockTXNIcon />,
  },
  {
    key: 'interval-card',
    label: 'Seconds to block',
    value: (block: BlockType | null) =>
      Math.floor(block?.time_since_last_block_ms / 1000),
    icon: <SecondsToBlockIcon />,
  },
  {
    key: 'supply-card',
    label: 'Total Supply',
    value: () => '-',
    icon: <TotalSupplyIcon />,
  },
]

const LastBlockInfo = () => {
  const $cardWidth = useBreakpointValue({
    base: '100%',
    sm: 'calc(50% - 1rem)',
    md: 'calc(33% - 1rem)',
  })
  const $headBlock = useBlockHead()

  return (
    <Flex w="100%" wrap="wrap" mb="2.25rem" ml="-0.5rem">
      {LAST_BLOCK_INFO_CARDS.map(data => (
        <Card
          key={data.key}
          m="0.5rem"
          w={$cardWidth}
          label={data.label}
          value={data.value($headBlock.data)}
          icon={data.icon}
          isLoading={!$headBlock.loaded}
        />
      ))}
    </Flex>
  )
}

const LatestBlocks = () => {
  const $blocks = useBlocks({
    limit: BLOCKS_LIMIT,
    main: true,
  })

  return (
    <Flex direction="column" mb="2rem">
      <Text fontSize="1.5rem" mb="0.625rem">
        Latest Blocks
      </Text>
      {!$blocks.error ? (
        <BlocksTable
          data={
            $blocks.loaded ? $blocks.data : new Array(BLOCKS_LIMIT).fill(null)
          }
        />
      ) : (
        <Card
          w="100%"
          label="Something went wrong."
          color="red"
          icon={
            <Box
              border="0.125rem solid red"
              fontSize="1.5rem"
              fontWeight="bold"
              borderRadius="50%"
              w="2.5rem"
              h="2.5rem"
              textAlign="center"
            >
              !
            </Box>
          }
        />
      )}
    </Flex>
  )
}

export default function Home() {
  const $colors = useColorModeValue(
    {
      imageBg: '#1b006a',
      bgImage: `url('/images/home_page_logo_purple.png')`,
      mainBg: NAMED_COLORS.WHITE,
    },
    {
      imageBg: NAMED_COLORS.BLACK,
      bgImage: `url('/images/home_page_logo_black.png')`,
      mainBg: NAMED_COLORS.LIGHT_BLACK,
    }
  )

  return (
    <main style={{ width: '100%', height: '100%' }}>
      <Head>
        <title>Iron Fish: Home</title>
      </Head>
      <Box
        sx={{
          h: { base: '35.5rem', sm: '33.75rem' },
          w: '100%',
          bgColor: $colors.imageBg,
          bgImage: { base: null, sm: $colors.bgImage },
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
        bgColor={$colors.mainBg}
      >
        <Box mx={{ base: '2rem', lg: '15%' }} w="100%" zIndex={1}>
          <Flex direction="column" mb="5.3125rem">
            <Text
              fontSize="3.25rem"
              lineHeight="3.8675rem"
              color={NAMED_COLORS.WHITE}
              mb="1.125rem"
            >
              Welcome to the
              <br />
              Iron Fish Block Explorer
            </Text>
            <Text fontSize="1.5rem" mb="2.25rem" color={NAMED_COLORS.WHITE}>
              Blockchain statistics for $IRON
            </Text>
            <HStack>
              <Link href={RoutePaths.Explorer} passHref>
                <Button variant="secondary" size="medium">
                  View All Blocks
                </Button>
              </Link>
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
            <Link href={RoutePaths.Explorer} passHref>
              <Button variant="secondary" size="medium">
                View All Blocks
              </Button>
            </Link>
          </Center>
        </Box>
      </Flex>
    </main>
  )
}
