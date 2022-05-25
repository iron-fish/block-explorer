import { FC } from 'react'
import {
  Flex,
  Box,
  Link,
  VStack,
  HStack,
  Button,
  NAMED_COLORS,
  Text,
  useColorModeValue,
} from '@ironfish/ui-kit'
import {
  TelegramIcon,
  GitHubIcon,
  RedditIcon,
  DiscordIcon,
  TwitterIcon,
  IronFishLogo,
} from 'svgx'

const Footer: FC = () => {
  const $colors = useColorModeValue(
    {
      bg: NAMED_COLORS.WHITE,
      border: '#E1E1E1',
      color: NAMED_COLORS.DEEP_BLUE,
    },
    {
      bg: NAMED_COLORS.LIGHT_BLACK,
      border: NAMED_COLORS.DARK_GREY,
      color: NAMED_COLORS.PALE_GREY,
    }
  )

  return (
    <Box
      w="100%"
      h="20rem"
      bgColor={$colors.bg}
      borderTop="0.0625rem solid"
      borderColor={$colors.border}
      p="4rem 7.6875rem 0rem"
      display={{ base: 'none', xl: 'block' }}
    >
      <Flex direction="column">
        <Flex justify="space-between" w="100%" mb="4rem">
          <Flex direction={'column'}>
            <Box mb="1.1875rem">
              <IronFishLogo />
            </Box>
            <div
              style={{
                fontSize: '0.6875rem',
                width: '13.125rem',
                inlineSize: '11.5625rem',
              }}
            >
              Iron Fish is a novel cryptocurrency focused on privacy and
              accessibility
            </div>
          </Flex>
          <VStack spacing="0.5rem" align="baseline">
            <Link variant="text_link" fontSize="1.25rem" mb="0.125rem">
              Company
            </Link>
            <Link variant="text_link" fontSize="1rem">
              About us
            </Link>
            <Link variant="text_link" fontSize="1rem">
              Careers
            </Link>
            <Link variant="text_link" fontSize="1rem">
              Blog
            </Link>
          </VStack>
          <VStack spacing="0.5rem" align="baseline">
            <Link fontSize="1.25rem" mb="0.125rem">
              Product
            </Link>
            <Link fontSize="1rem">Block Explorer</Link>
            <Link fontSize="1rem">Whitepaper</Link>
            <Link fontSize="1rem">FAQ</Link>
          </VStack>
          <Button variant="primary" size="medium">
            Drop us a line!
          </Button>
        </Flex>
      </Flex>
      <Flex
        align={'center'}
        h="4.0625rem"
        w="100%"
        borderTop="0.0625rem solid"
        borderColor={$colors.border}
        color={$colors.color}
        direction="row"
      >
        <Text fontSize="0.75rem" pl="0.8125rem">
          {new Date().getFullYear()} Iron Fish. All rights reserved.
        </Text>
        <HStack spacing={'1.375rem'} justifyContent="flex-end" flex={1}>
          <TelegramIcon />
          <GitHubIcon />
          <RedditIcon />
          <TwitterIcon />
          <DiscordIcon />
        </HStack>
      </Flex>
    </Box>
  )
}

export default Footer
