import { Box, Flex, NAMED_COLORS, useColorModeValue } from "@ironfish/ui-kit"

import { BlockType } from "types"
import { truncateHash } from "utils/hash"
import size from "byte-size"
import { CloseDetailsIcon } from "svgx/CloseDetailsIcon"

const PREVIEW_BLOCKS = [
  {
    label: 'Hash',
    value: (block: BlockType) => truncateHash(block?.hash, 2, 4)
  },
  {
    label: 'Height',
    value: (block: BlockType) => block?.sequence
  },
  {
    label: 'Prev',
    value: (block: BlockType) => truncateHash(block?.previous_block_hash, 2, 4)
  },
  {
    label: 'Size',
    value: (block: BlockType) => size(block?.size).toString()
  },
  {
    label: 'Graffiti',
    value: (block: BlockType) => block?.graffiti
  },
  {
    label: 'Difficulty',
    value: (block: BlockType) => block?.difficulty
  },
  {
    label: 'Timestamp',
    value: (block: BlockType) => {
      const date = new Date(block?.timestamp)
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
    }
  }
]

const BlockPreview = ({
  block,
  height,
  onClose
}) => {
  const $colors = useColorModeValue({
    bg: NAMED_COLORS.WHITE,
    border: NAMED_COLORS.LIGHT_GREY,
    label: NAMED_COLORS.GREY,
  }, {
    bg: NAMED_COLORS.DARKER_GREY,
    border: NAMED_COLORS.DARK_GREY,
    label: NAMED_COLORS.PALE_GREY,
  })

  return (
    <Box
      h={`calc(${height}px - 0.5rem)`}
      m="0.25rem"
      border="0.063rem solid"
      borderColor={$colors.border}
      borderRadius="0.125rem"
      boxShadow={`0.25rem 0.25rem 0 -0.063rem ${$colors.bg}, 0.25rem 0.25rem ${$colors.border}`}
      bg={$colors.bg}
      zIndex={10}
    >
      <CloseDetailsIcon
        position="absolute"
        right="1.5rem"
        top="1.5rem"
        cursor="pointer"
        onClick={onClose}
      />
      <Flex wrap="wrap" w="100%" h="100%">
        <Flex wrap="wrap" p="2.5rem" w="calc(100% - 150px)" minWidth="70%" justifyContent="space-between">
          {PREVIEW_BLOCKS.map((infoblock, i) => (
            <Box 
              key={`${block?.hash}-infoblock-${i}`} 
              m="1rem"
              minW="6rem"
            >
              <Box color={$colors.label}>
                {infoblock.label}
              </Box>
              <Box>
                {infoblock.value(block)}
              </Box>
            </Box>
          ))}
        </Flex>
        <Box w="150px">

        </Box>
      </Flex>
    </Box>
  )
}

export default BlockPreview
