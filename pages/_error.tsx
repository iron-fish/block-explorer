import { useRef } from 'react'
import {
  Flex,
  Box,
  useDimensions,
  Button,
  NAMED_COLORS,
} from '@ironfish/ui-kit'
import Logo404 from 'svgx/Logo404'

function Error({ handleReload, error }) {
  const container = useRef(null)
  const dimension = useDimensions(container, true)

  return (
    <Flex
      style={{
        width: '100%',
        height: `calc(100vh - ${dimension?.borderBox.height || 0}px)`,
      }}
    >
      <Flex
        pt="96px"
        w="100%"
        align="center"
        direction="column"
        mx={{ base: '2rem', lg: '15%' }}
        mb="auto"
        ref={container}
      >
        <Box maxW="611px" maxH="226px" w="100%" h="100%">
          <Logo404 />
        </Box>
        <Box pt="64px" maxW="686px" textAlign="center">
          {error ? (
            <h3>
              This transaction or block either does not exist or hasn’t made it
              to the explorer yet.{' '}
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
