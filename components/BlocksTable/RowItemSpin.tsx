import { Box, BoxProps, keyframes, NAMED_COLORS, useColorModeValue } from "@ironfish/ui-kit"

const RowItemSpin = (props: BoxProps) => {
  const $spinAnimation = useColorModeValue(
    keyframes`
      0% { background-color: ${NAMED_COLORS.PALE_GREY} }
      100% { background-color: ${NAMED_COLORS.LIGHT_GREY} }
    `, 
    keyframes`
      0% { background-color: ${NAMED_COLORS.DARK_GREY} }
      100% { background-color: ${NAMED_COLORS.GREY} }
    `
  )
  return <Box 
    h='1.375rem'
    w="100%"
    animation={`${$spinAnimation} infinite 0.7s alternate`}
    borderRadius="0.2rem"
    {...props}
  />
}

export default RowItemSpin
