import {
  Box,
  List,
  ListItem,
  NAMED_COLORS,
  Text,
  FONTS,
  Flex,
  useColorModeValue,
  chakra,
  HStack,
} from '@ironfish/ui-kit'
import { HashView } from 'components'
import AssetIcon from 'icons/AssetIcon'
import CaretRightIcon from 'icons/CaretRightIcon'
import Link from 'next/link'
import { AssetDescriptionType } from 'types'

type DescriptionType = 'mints' | 'burns'

type Props = {
  type: DescriptionType
  data: Array<AssetDescriptionType>
}

export function MintsBurnsList({ type, data }: Props) {
  return (
    <Box
      flex={1}
      w={{ base: '100%', md: 'calc(50% - 2rem)' }}
      mb="1rem"
      display={{ base: data?.length ? 'block' : 'none', md: 'block' }}
    >
      <HStack align="center" justify="space-between" mb="1rem">
        <Text
          color={NAMED_COLORS.GREY}
          fontSize="0.75rem"
          fontFamily={FONTS.FAVORIT}
          pl="2rem"
          display={{ base: 'none', md: 'block' }}
          textTransform="uppercase"
        >
          {type === 'mints' ? 'Mints' : 'Burns'}
        </Text>
        <Text
          color={NAMED_COLORS.GREY}
          fontSize="0.75rem"
          fontFamily={FONTS.FAVORIT}
          pr="2rem"
          display={{ base: 'none', md: 'block' }}
          textTransform="uppercase"
        >
          Quantity
        </Text>
      </HStack>
      <List w="100%" spacing={'1rem'}>
        {data.length ? (
          data.map((item, index) => (
            <ListItem key={index}>
              <MintBurnItem
                quantity={item.value}
                transactionHash={item.transaction_hash}
              />
            </ListItem>
          ))
        ) : (
          <EmptyDataBlock type={type} />
        )}
      </List>
    </Box>
  )
}

function MintBurnItem({ quantity, transactionHash }) {
  const $colors = useColorModeValue(
    {
      border: NAMED_COLORS.LIGHT_GREY,
      bg: NAMED_COLORS.WHITE,
      icon: NAMED_COLORS.BLACK,
    },
    {
      border: NAMED_COLORS.DARK_GREY,
      bg: NAMED_COLORS.DARKER_GREY,
      icon: NAMED_COLORS.WHITE,
    }
  )

  return (
    <Box as={Link} href={`/transaction/${transactionHash}`}>
      <HStack
        py="1.875rem"
        pl="2rem"
        pr="1.5rem"
        border={`0.0625rem solid ${$colors.border}`}
        bg={$colors.bg}
        borderRadius="0.25rem"
        boxShadow="0 0.25rem 0.6875rem rgba(0, 0, 0, 0.04)"
        direction="column"
        gap={2}
      >
        <AssetIcon w={7} h={7} />
        <HashView hash={transactionHash} parts={2} chars={6} />
        <Text flexGrow={1} textAlign="right">
          {quantity}
        </Text>
        <CaretRightIcon color={$colors.icon} w={3} h={3} />
      </HStack>
    </Box>
  )
}

function EmptyDataBlock({ type }: { type: DescriptionType }) {
  const $colors = useColorModeValue(
    { bg: NAMED_COLORS.LIGHTER_GREY, text: NAMED_COLORS.GREY },
    { bg: NAMED_COLORS.DARKER_GREY_1, text: NAMED_COLORS.DARKER_GREY_2 }
  )

  return (
    <Flex
      padding="1.875rem 2rem"
      border={`0.0625rem solid ${$colors.bg}`}
      bg={$colors.bg}
      borderRadius="0.25rem"
      direction="column"
      display={{ base: 'none', md: 'flex' }}
    >
      <Flex align="center">
        <chakra.h4 color={$colors.text} overflow="hidden" w="100%">
          There are no {type} in this transaction
        </chakra.h4>
      </Flex>
    </Flex>
  )
}
