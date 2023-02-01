import { Box, Flex, NAMED_COLORS, useColorModeValue } from '@ironfish/ui-kit'

import Link from 'next/link'
import size from 'byte-size'
import { pipe } from 'ramda'
import safeProp from 'utils/safeProp'
import { formatBlockTimestamp } from 'utils/format'
import { CloseDetailsIcon } from 'svgx/CloseDetailsIcon'
import RoutePaths from 'constants/RoutePaths'
import { HashView } from 'components'

const PREVIEW_BLOCKS = [
  {
    label: 'Hash',
    value: pipe(safeProp('hash'), hash => <HashView hash={hash} parts={2} />),
  },
  {
    label: 'Height',
    value: safeProp('sequence'),
  },
  {
    label: 'Prev',
    value: pipe(safeProp('previous_block_hash'), hash => (
      <HashView hash={hash} parts={2} />
    )),
  },
  {
    label: 'Size',
    value: pipe(safeProp('size'), x => size(x).toString()),
  },
  {
    label: 'Graffiti',
    value: safeProp('graffiti'),
  },
  {
    label: 'Difficulty',
    value: safeProp('difficulty'),
  },
  {
    label: 'Timestamp',
    value: formatBlockTimestamp,
  },
]

const BlockPreview = ({ block, height, onClose }) => {
  const $colors = useColorModeValue(
    {
      bg: NAMED_COLORS.WHITE,
      border: NAMED_COLORS.LIGHT_GREY,
      label: NAMED_COLORS.GREY,
    },
    {
      bg: NAMED_COLORS.DARKER_GREY,
      border: NAMED_COLORS.DARK_GREY,
      label: NAMED_COLORS.PALE_GREY,
    }
  )

  return (
    <Box
      h={`calc(${height}px - 0.5rem)`}
      m="0.25rem 1rem 0.25rem"
      border="0.063rem solid"
      borderColor={$colors.border}
      borderRadius="0.125rem"
      boxShadow={`0.25rem 0.25rem 0 -0.063rem ${$colors.bg}, 0.25rem 0.25rem ${$colors.border}`}
      bg={$colors.bg}
      zIndex={10}
    >
      <CloseDetailsIcon
        position="absolute"
        right="2.5rem"
        top="1.5rem"
        cursor="pointer"
        onClick={onClose}
      />
      <Flex wrap={{ base: 'wrap', lg: 'nowrap' }} w="100%" p="3rem">
        <Flex wrap="wrap" w={{ lg: 'calc(100% - 9rem)', base: '100%' }}>
          {PREVIEW_BLOCKS.map((infoblock, i) => (
            <Box key={`${block?.hash}-infoblock-${i}`} minW="9.5rem" p="1rem">
              <Box color={$colors.label}>{infoblock.label}</Box>
              <Box>{infoblock.value(block)}</Box>
            </Box>
          ))}
        </Flex>
        <Flex minW="8rem" p={{ base: '1rem', lg: '1rem 0rem' }} alignSelf="end">
          <Link
            href={{
              pathname: RoutePaths.BlockInfo,
              query: { id: block?.hash.toString() },
            }}
            passHref
          >
            <a style={{ color: NAMED_COLORS.LIGHT_BLUE }}>View details &gt;</a>
          </Link>
        </Flex>
      </Flex>
    </Box>
  )
}

export default BlockPreview
