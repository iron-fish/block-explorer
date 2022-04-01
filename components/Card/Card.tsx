import { FC, ReactNode } from 'react'

import { Box, Flex, useColorMode, NAMED_COLORS, BoxProps } from '@ironfish/ui-kit'

interface CardProps extends BoxProps {
  label: string,
  value: string,
  icon: ReactNode
}

const Card: FC<CardProps> = ({
  label,
  value,
  icon,
  ...rest
}) => {
  const { colorMode } = useColorMode()
  const isDarkMode = colorMode === 'dark'

  return (
    <Box
      bg={isDarkMode ? NAMED_COLORS.DARKER_GREY : NAMED_COLORS.WHITE}
      border="0.063rem solid"
      borderColor={isDarkMode ? NAMED_COLORS.DARK_GREY : NAMED_COLORS.LIGHT_GREY}
      borderRadius="0.125rem"
      h="7.5rem"
      w="18.75rem"
      boxShadow={`0.25rem 0.25rem 0 -0.063rem ${isDarkMode ? NAMED_COLORS.DARKER_GREY : NAMED_COLORS.WHITE}, 0.25rem 0.25rem ${isDarkMode ? NAMED_COLORS.DARK_GREY : NAMED_COLORS.LIGHT_GREY}`}
      p="2rem"
      {...rest}
    >
      <Flex justifyContent="space-between" alignItems="center" w="100%" h="100%">
        <Flex flexDirection="column">
          <Box
            color={isDarkMode ? NAMED_COLORS.PALE_GREY : NAMED_COLORS.GREY}
          >
            <h4>
              {label}
            </h4>
          </Box>
          <Box>
            <h4>
              {value}
            </h4>
          </Box>
        </Flex>
        <Box>
          {icon}
        </Box>
      </Flex>
    </Box>
  )
}

export default Card