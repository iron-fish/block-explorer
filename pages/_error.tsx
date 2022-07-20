import { useRef } from 'react'
import {
  Flex,
  Box,
  useDimensions,
  Button,
  NAMED_COLORS,
} from '@ironfish/ui-kit'
import { useRouter } from 'next/router'

import RoutePaths from 'constants/RoutePaths'
import Logo404 from 'svgx/Logo404'

const getErrorMessage = pathname => {
  let type = 'transaction or block'
  switch (pathname) {
    case RoutePaths.BlockInfo:
      type = 'block'
      break
    case RoutePaths.TransactionInfo:
      type = 'transaction'
      break
    default:
      break
  }
  return `This ${type} either does not exist or hasn’t made it to the explorer yet.`
}

function Error({ handleReload, error }) {
  const container = useRef(null)
  const dimension = useDimensions(container, true)
  const { pathname } = useRouter()

  return (
    <Flex
      style={{
        width: '100%',
        height: `calc(100vh - ${dimension?.borderBox.height || 0}px)`,
      }}
    >
      <Flex
        pt="6rem"
        w="100%"
        align="center"
        direction="column"
        mx={{ base: '2rem', lg: '15%' }}
        mb="auto"
        ref={container}
      >
        <Box maxW="38.1875rem" maxH="14.125rem" w="100%" h="100%">
          <Logo404 />
        </Box>
        <Box pt="4rem" maxW="42.875rem" textAlign="center">
          {error ? (
            <h3>
              {getErrorMessage(pathname)}{' '}
              <Button
                variant="link"
                onClick={handleReload}
                color={NAMED_COLORS.LIGHT_BLUE}
              >
                <h3>Refresh to try again.</h3>
              </Button>
            </h3>
          ) : (
            <h3>This page could not be found</h3>
          )}
        </Box>
      </Flex>
    </Flex>
  )
}

export default Error
