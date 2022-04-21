import { Box, Flex, NAMED_COLORS, useColorMode } from "@ironfish/ui-kit"
import { FC } from "react"
import { DataRowProps } from "./types"

const DataRowSmall: FC<DataRowProps> = ({ items }) => {
  const { colorMode } = useColorMode()
  const isDarkMode = colorMode === 'dark'

  return (
    <Flex
      mb="1rem"
      border="0.063rem solid"
      borderRadius="0.25rem"
      borderColor="inherit"
      boxShadow='0 0.25rem 0.668rem rgba(0, 0, 0, 0.04)'
      bg={isDarkMode ? NAMED_COLORS.DARKER_GREY : NAMED_COLORS.WHITE}
      wrap="wrap"
      p="1rem"
    >
      {items.map((item, index) => (
        <Box key={`item-${index}`} px="2rem" py="1rem">
          {item}
        </Box>
      ))}
    </Flex>
  )
}

export default DataRowSmall