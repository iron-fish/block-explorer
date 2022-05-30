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
import NextLink from 'next/link'
import RoutePaths from 'constants/RoutePaths'

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
            <NextLink href="https://www.ironfish.network/" passHref>
              <Box mb="1.1875rem" cursor="pointer">
                <IronFishLogo />
              </Box>
            </NextLink>
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
            <Box fontSize="1.25rem" mb="0.125rem">
              Company
            </Box>
            <NextLink href="https://ironfish.network/about/" passHref>
              <Link variant="text_link" fontSize="1rem">
                About us
              </Link>
            </NextLink>
            <NextLink href="https://ironfish.network/careers/" passHref>
              <Link variant="text_link" fontSize="1rem">
                Careers
              </Link>
            </NextLink>
            <NextLink href="https://ironfish.network/blog/" passHref>
              <Link variant="text_link" fontSize="1rem">
                Blog
              </Link>
            </NextLink>
          </VStack>
          <VStack spacing="0.5rem" align="baseline">
            <Box fontSize="1.25rem" mb="0.125rem">
              Product
            </Box>
            <NextLink href={RoutePaths.Home} passHref>
              <Link fontSize="1rem">Block Explorer</Link>
            </NextLink>
            <NextLink href="https://ironfish.network/docs/whitepaper/1_introduction" passHref>
              <Link fontSize="1rem">Whitepaper</Link>
            </NextLink>
            <NextLink href="https://ironfish.network/faq/" passHref>
              <Link fontSize="1rem">FAQ</Link>
            </NextLink>
          </VStack>
          <NextLink href="mailto:contact@ironfish.network" passHref>
            <Button
              variant="primary"
              size="medium"
            >
              Drop us a line!
            </Button>
          </NextLink>
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
          2021 Iron Fish. All rights reserved.
        </Text>
        <HStack spacing={'1.375rem'} justifyContent="flex-end" flex={1}>
          <NextLink href="https://t.me/ironfishcrypto" passHref>
            <TelegramIcon cursor="pointer" />
          </NextLink>
          <NextLink href="https://github.com/iron-fish" passHref>
            <GitHubIcon cursor="pointer" />
          </NextLink>
          <NextLink href="http://reddit.com/r/ironfish" passHref>
            <RedditIcon cursor="pointer" />
          </NextLink>
          <NextLink href="https://twitter.com/ironfishcrypto" passHref>
            <TwitterIcon cursor="pointer" />
          </NextLink>
          <NextLink href="https://discord.gg/EkQkEcm8DH" passHref>
            <DiscordIcon cursor="pointer" />
          </NextLink>
        </HStack>
      </Flex>
    </Box>
  )
}

export default Footer
