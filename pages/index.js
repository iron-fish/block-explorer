import { chakra, Flex, Box, HStack, Button, Center, ColorModeSwitcher, NAMED_COLORS, useColorMode, Grid, GridItem, Text } from '@ironfish/ui-kit';

const tmpCardStyle = {
  height: "7.5rem",
  width: '300px',
  backgroundColor: 'white',
  border: "1px solid gray",
  borderRadius: "5px",
  boxShadow: "6px 6px 0px -1px white, 6px 6px gray",
}

export default function Home() {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";

  return (
    <main style={{ width: '100%', height: '100%' }}>
      <Flex
        h="33.75rem"
        w="100%"
        bgColor={isDarkMode ? NAMED_COLORS.BLACK : '#1b006a'}
        bgImage={isDarkMode ? `url('/images/home_page_logo_black.png')` : `url('/images/home_page_logo_purple.png')`}
        bgRepeat="no-repeat"
        pos="absolute"
        mt="5.9375rem"
        sx={{
          backgroundPositionX: 'right',
        }} />
      <Flex
        minW="30rem"
        justify={'center'}
        pt={['11.875rem', '13.4375rem']}
        pb="6rem"
        bgColor={isDarkMode ? '#101010' : NAMED_COLORS.WHITE}
      >
        <Box mr="15%" ml="15%" w="100%" zIndex={1} >
          <Flex direction="column" mb="85px">
            <Text
              fontSize="3.25rem"
              lineHeight={['3.7188rem', '3.8675rem']}
              inlineSize="365px"
              whiteSpace={[null, null, 'nowrap']}
              mb='1.125rem'
              color={NAMED_COLORS.WHITE}
            >
              Welcome to the<wbr /> Iron Fish Block Explorer
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
              {/* ColorModeSwitcher added while no layout available need to be removed in final version */}
              <ColorModeSwitcher />
            </HStack>
          </Flex>
          <Box mb="2.25rem">
            <Grid gap="1.125rem 1.4375rem" templateColumns={{ md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}>
              <GridItem><chakra.div id="card2" sx={tmpCardStyle}></chakra.div></GridItem>
              <GridItem><chakra.div id="card2" sx={tmpCardStyle}></chakra.div></GridItem>
              <GridItem><chakra.div id="card2" sx={tmpCardStyle}></chakra.div></GridItem>
              <GridItem><chakra.div id="card2" sx={tmpCardStyle}></chakra.div></GridItem>
              <GridItem><chakra.div id="card2" sx={tmpCardStyle}></chakra.div></GridItem>
              <GridItem><chakra.div id="card2" sx={tmpCardStyle}></chakra.div></GridItem>
            </Grid>
          </Box>
          <Button variant="secondary" size="medium" mb="6rem">View All Charts</Button>
          <Flex direction="column" mb="2rem">
            <Text
              fontSize="1.5rem"
              mb="0.625rem"
              color={isDarkMode ? NAMED_COLORS.WHITE : NAMED_COLORS.BLACK}
            >
              Latest Blocks
            </Text>
            <Box w="100%" h="41.25rem" border="0.25rem solid black">
              Table
            </Box>
          </Flex>
          <Center>
            <Button variant="secondary" size="medium" >View All Blocks</Button>
          </Center>
        </Box>
      </Flex>
    </main>
  )
}
