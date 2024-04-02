import {
  Card,
  CardsView,
  CountdownView,
  BlocksTable,
  HashView,
} from 'components'
import RoutePaths from 'constants/RoutePaths'
import useBlockHead from 'hooks/useBlockHead'
import useBlocks from 'hooks/useBlocks'
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
} from '@ironfish/ui-kit'
import {
  HeightIcon,
  DifficultyIcon,
  LatestBlockHashIcon,
  SecondsToBlockIcon,
  SupplyIcon,
} from 'svgx'
import NextLink from 'next/link'
import { BlockHead } from 'types'
import { formatTimeSinceLastBlock } from 'utils/format/formatTimeSinceLastBlock'
import { formatCountdown } from 'utils/format/formatCountdown'
import { formatDifficulty } from 'utils/format/units'
import { renderIronWithCurrency } from 'utils/currency'

const BLOCKS_LIMIT = 10
const LAST_BLOCK_INFO_CARDS = [
  {
    key: 'difficulty-card',
    label: 'Difficulty',
    value: (block: BlockHead | null) =>
      formatDifficulty(Number(block?.difficulty)),
    icon: <DifficultyIcon />,
  },
  {
    key: 'height-card',
    label: 'Height',
    value: (block: BlockHead | null) => block?.sequence,
    icon: <HeightIcon />,
  },
  {
    key: 'hash-card',
    label: 'Latest Block Hash',
    value: (block: BlockHead | null) => <HashView hash={block?.hash} />,
    icon: <LatestBlockHashIcon />,
  },
  {
    key: 'interval-card',
    label: 'Last Block Time',
    value: (block: BlockHead | null) =>
      formatTimeSinceLastBlock(block?.time_since_last_block_ms),
    icon: <SecondsToBlockIcon />,
  },
  {
    key: 'circulating-supply-card',
    label: 'Circulating Supply',
    value: (block: BlockHead | null) =>
      renderIronWithCurrency(block?.circulating_supply),
    icon: <SupplyIcon />,
  },
  {
    key: 'total-supply-card',
    label: 'Total Supply',
    value: (block: BlockHead | null) =>
      renderIronWithCurrency(block?.total_supply),
    icon: <SupplyIcon />,
  },
]

const LAST_BLOCK_INFO = [
  {
    key: 'hardfork-countdown',
    label: 'Hardfork-1 Activation In:',
    value: (block: BlockHead | null) => formatCountdown(block?.sequence),
    icon: <SecondsToBlockIcon />,
  },
]

const LastBlockInfo = () => {
  const $headBlock = useBlockHead()

  return <CardsView cards={LAST_BLOCK_INFO_CARDS} data={$headBlock} />
}

const Hardfork1Countdown = () => {
  const $headBlock = useBlockHead()
  return <CountdownView cards={LAST_BLOCK_INFO} data={$headBlock} />
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
    <>
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
          left: 0,
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
        <Box w="100%" zIndex={1}>
          <Flex direction="column" mb="5.3125rem">
            <Text
              fontSize={{ base: '2.3rem', sm: '3.25rem' }}
              lineHeight="3.8675rem"
              color={NAMED_COLORS.WHITE}
              mb="1.125rem"
              fontFamily="extended-regular"
            >
              Welcome to the
              <br />
              Iron Fish Block Explorer
            </Text>
            <Hardfork1Countdown />
            <Text
              fontSize={{ base: '1.3rem', sm: '1.5rem' }}
              mb="2.25rem"
              pt="1.5rem"
              color={NAMED_COLORS.WHITE}
            >
              Blockchain statistics for $IRON
            </Text>
            <HStack spacing="1rem">
              <NextLink href={RoutePaths.Explorer} passHref>
                <Button variant="secondary" size="medium">
                  View All Blocks
                </Button>
              </NextLink>
              <NextLink href={RoutePaths.Assets} passHref>
                <Button variant="secondary" size="medium">
                  View All Assets
                </Button>
              </NextLink>
              {/* Hide chain explorer switch button while its not finished
              <Button variant="secondary" size="medium">
                View Chain Explorer
              </Button> */}
            </HStack>
          </Flex>
          <LastBlockInfo />
          <NextLink href={RoutePaths.Charts} passHref>
            <Button variant="secondary" size="medium" mb="6rem">
              View All Charts
            </Button>
          </NextLink>
          <LatestBlocks />
          <Center>
            <NextLink href={RoutePaths.Explorer} passHref>
              <Button variant="secondary" size="medium">
                View All Blocks
              </Button>
            </NextLink>
          </Center>
        </Box>
      </Flex>
    </>
  )
}
