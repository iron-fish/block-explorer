import { FC, ReactNode } from 'react'

import {
  Box,
  Flex,
  NAMED_COLORS,
  BoxProps,
  keyframes,
  useColorModeValue,
  chakra,
} from '@ironfish/ui-kit'
import BorderBox from 'components/BorderBox'

interface CardProps extends BoxProps {
  label: ReactNode
  value?: ReactNode
  icon: ReactNode
  isLoading?: boolean
}

const Card: FC<CardProps> = ({
  label,
  value,
  icon,
  isLoading = false,
  ...rest
}) => {
  const $colors = useColorModeValue(
    {
      label: NAMED_COLORS.GREY,
      spin: keyframes`
      0% { background-color: ${NAMED_COLORS.PALE_GREY} }
      100% { background-color: ${NAMED_COLORS.LIGHT_GREY} }
    `,
    },
    {
      label: NAMED_COLORS.PALE_GREY,
      spin: keyframes`
      0% { background-color: ${NAMED_COLORS.DARK_GREY} }
      100% { background-color: ${NAMED_COLORS.GREY} }
    `,
    }
  )

  const valueContent = isLoading ? (
    <Box
      minWidth="6rem"
      minHeight="1.4rem"
      borderRadius="0.3rem"
      animation={`${$colors.spin} infinite 0.7s alternate`}
    />
  ) : (
    <Box>
      <chakra.h4 wordBreak="break-word">{value}</chakra.h4>
    </Box>
  )
  return (
    <BorderBox h="7.5rem" {...rest}>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        h="100%"
      >
        <Flex flexDirection="column" whiteSpace="break-spaces">
          <Box color={$colors.label}>
            <h4>{label}</h4>
          </Box>
          {valueContent}
        </Flex>
        <Box marginLeft="1rem">{icon}</Box>
      </Flex>
    </BorderBox>
  )
}

export default Card
