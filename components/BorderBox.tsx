import { FC } from 'react'

import {
  Box,
  useColorModeValue,
  NAMED_COLORS,
  BoxProps,
} from '@ironfish/ui-kit'

const BorderBox: FC<BoxProps> = ({ children, ...rest }) => {
  const $colors = useColorModeValue(
    {
      bg: NAMED_COLORS.WHITE,
      border: NAMED_COLORS.LIGHT_GREY,
    },
    {
      bg: NAMED_COLORS.DARKER_GREY,
      border: NAMED_COLORS.DARK_GREY,
    }
  )

  return (
    <Box
      bg={$colors.bg}
      border="0.063rem solid"
      borderColor={$colors.border}
      borderRadius="0.125rem"
      w={{ base: 'auto', sm: '100%' }}
      m="0 0.2rem 0.2rem 0"
      boxShadow={`0.25rem 0.25rem 0 -0.063rem ${$colors.bg}, 0.25rem 0.25rem ${$colors.border}`}
      p="1.5rem"
      {...rest}
    >
      {children}
    </Box>
  )
}

export default BorderBox
