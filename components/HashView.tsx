import { FC } from 'react'
import { Box, Flex, BoxProps } from '@ironfish/ui-kit'

import { truncateHash } from 'utils/hash'

interface HashViewProps {
  hash: string
  parts?: number
  chars?: number
  labelProps?: BoxProps
}

export const HashView: FC<HashViewProps> = ({
  hash,
  parts = 4,
  chars = 4,
  labelProps,
}) => {
  return (
    <Flex position="relative">
      <Box as="h4" {...labelProps} position="relative" zIndex={1}>
        {truncateHash(hash, parts, chars)}
      </Box>
      <Box
        as="h4"
        {...labelProps}
        fontSize="97px"
        mt="-16px"
        position="absolute"
        top={0}
        whiteSpace="nowrap"
        overflow="hidden"
        zIndex={0}
        height="38px"
        width="100%"
      >
        {hash}
      </Box>
    </Flex>
  )
}

export default HashView
