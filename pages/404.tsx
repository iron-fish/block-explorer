import { Flex, Box } from '@ironfish/ui-kit'

import Logo404 from 'svgx/Logo404'

function Error404() {
  return (
    <Flex w="100%" h="100%">
      <Flex
        pt="6rem"
        w="100%"
        align="center"
        direction="column"
        mx={{ base: '2rem', lg: '15%' }}
        mb="auto"
        h="100%"
        pb="6rem"
      >
        <Box maxW="38.1875rem" maxH="14.125rem" w="100%" h="100%">
          <Logo404 />
        </Box>
        <Box pt="4rem" maxW="42.875rem" textAlign="center">
          <h3>This page could not be found</h3>
        </Box>
      </Flex>
    </Flex>
  )
}

export default Error404
