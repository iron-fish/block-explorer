import { FC, ReactNode } from 'react'

import {
  Box,
  Flex,
  NAMED_COLORS,
  BoxProps,
  keyframes,
  useColorModeValue,
  chakra,
} from "@ironfish/ui-kit";

interface CardProps extends BoxProps {
  label: ReactNode,
  value?: ReactNode,
  icon: ReactNode,
  isLoading?: boolean
}

const Card: FC<CardProps> = ({
  label,
  value,
  icon,
  isLoading = false,
  ...rest
}) => {
  const $colors = useColorModeValue({
    bg: NAMED_COLORS.WHITE,
    border: NAMED_COLORS.LIGHT_GREY,
    label: NAMED_COLORS.GREY,
    spin: keyframes`
      0% { background-color: ${NAMED_COLORS.PALE_GREY} }
      100% { background-color: ${NAMED_COLORS.LIGHT_GREY} }
    `
  }, {
    bg: NAMED_COLORS.DARKER_GREY,
    border: NAMED_COLORS.DARK_GREY,
    label: NAMED_COLORS.PALE_GREY,
    spin: keyframes`
      0% { background-color: ${NAMED_COLORS.DARK_GREY} }
      100% { background-color: ${NAMED_COLORS.GREY} }
    `
  })

  const valueContent = isLoading ?
    <Box minWidth="6rem" minHeight="1.4rem" borderRadius='0.3rem' animation={`${$colors.spin} infinite 0.7s alternate`} /> :
    <Box >
      <chakra.h4 wordBreak="break-word">
        {value}
      </chakra.h4>
    </Box>
  return (
    <Box
      bg={$colors.bg}
      border="0.063rem solid"
      borderColor={$colors.border}
      borderRadius="0.125rem"
      h="7.5rem"
      w={{ base: 'auto', sm: "100%" }}
      m="0.2rem"
      boxShadow={`0.25rem 0.25rem 0 -0.063rem ${$colors.bg}, 0.25rem 0.25rem ${$colors.border}`}
      p="2rem"
      {...rest}
    >
      <Flex justifyContent="space-between" alignItems="center" w="100%" h="100%">
        <Flex flexDirection="column">
          <Box
            color={$colors.label}
          >
            <h4>
              {label}
            </h4>
          </Box>
          {valueContent}
        </Flex>
        <Box>
          {icon}
        </Box>
      </Flex>
    </Box>
  )
}

export default Card