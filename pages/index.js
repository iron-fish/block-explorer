import { Card, BlocksTable } from 'components'
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
} from '@ironfish/ui-kit';
import {
  HeightIcon,
  DifficultyIcon,
  LatestBlockHashIcon,
  LatestBlockTXNIcon,
  SecondsToBlockIcon,
  TotalSupplyIcon,
} from 'svgx'


const useBlocks = () => ({
  loaded: true,
  data: new Array(14).fill({
    sequence: 23940194,
    size: 4096,
    transactions_count: 1,
    hash: '0000456456654564346345644564000045645665456434634564456445644564',
    timestamp: '6/22/2021 8:09:45PM'
  })
})

export default function Home() {
  const colorModeStyles = useColorModeValue(
    {
      imageBg: '#1b006a',
      bgImage: `url('/images/home_page_logo_purple.png')`,
      mainBg: NAMED_COLORS.WHITE
    },
    {
      imageBg: NAMED_COLORS.BLACK,
      bgImage: `url('/images/home_page_logo_black.png')`,
      mainBg: NAMED_COLORS.LIGHT_BLACK
    }
  )
  const cardWidth = useBreakpointValue({ base: '100%', sm: 'calc(50% - 1rem)', md: 'calc(33% - 1rem)' })

  const { loaded, data } = useBlocks();

  return (
    <main style={{ width: '100%', height: '100%' }}>
      <Head>
        <title>Iron Fish: Home</title>
      </Head>
      <Box
        sx={{
          h: { base: "568px", sm: "33.75rem" },
          w: "100%",
          bgColor: colorModeStyles.imageBg,
          bgImage: { base: null, sm: colorModeStyles.bgImage },
          bgRepeat: "no-repeat",
          pos: "absolute",
          backgroundPositionX: 'right',
          backgroundSize: '55.9375rem'
        }} />
      <Flex
        justify='center'
        pt={{ base: '96px', sm: '120px' }}
        pb="6rem"
        bgColor={colorModeStyles.mainBg}
      >
        <Box mr={{ base: "2rem", lg: "15%" }} ml={{ base: "2rem", lg: "15%" }} w="100%" zIndex={1} >
          <Flex direction="column" mb="5.3125rem">
            <Text
              fontSize="3.25rem"
              lineHeight="3.8675rem"
              color={NAMED_COLORS.WHITE}
              mb="18px"
            >
              Welcome to the<br />Iron Fish Block Explorer
            </Text>
            <Text
              fontSize="1.5rem"
              mb="2.25rem"
              color={NAMED_COLORS.WHITE}
            >
              Blockchain statistics for $IRON
            </Text>
            <HStack>
              <Button variant="secondary" size="medium" >View All Blocks</Button>
              <Button variant="secondary" size="medium" >View Chain Explorer</Button>
            </HStack>
          </Flex>
          <Flex w="100%" wrap="wrap" mb="2.25rem">
            <Card
              m="0.5rem"
              w={cardWidth}
              label="Difficulty"
              value="1542554"
              icon={<DifficultyIcon />}
            />
            <Card
              m="0.5rem"
              w={cardWidth}
              label="Height"
              value="2824804814"
              icon={<HeightIcon />}
            />
            <Card
              m="0.5rem"
              w={cardWidth}
              label="Latest block hash"
              value="65 Seconds"
              icon={<LatestBlockHashIcon />}
            />
            <Card
              m="0.5rem"
              w={cardWidth}
              label="Latest Block txn"
              value="1,433,566"
              icon={<LatestBlockTXNIcon />}
            />
            <Card
              m="0.5rem"
              w={cardWidth}
              label="Seconds to block"
              value="23"
              icon={<SecondsToBlockIcon />}
            />
            <Card
              m="0.5rem"
              w={cardWidth}
              label="Total Supply"
              value="24,245,221"
              icon={<TotalSupplyIcon />}
            />
          </Flex>
          <Button variant="secondary" size="medium" mb="6rem">View All Charts</Button>
          <Flex direction="column" mb="2rem">
            <Text fontSize="1.5rem" mb="0.625rem" >
              Latest Blocks
            </Text>
            <BlocksTable isLoading={!loaded} data={data} />
          </Flex>
          <Center>
            <Button variant="secondary" size="medium" >View All Blocks</Button>
          </Center>
        </Box>
      </Flex>
    </main>
  )
}
