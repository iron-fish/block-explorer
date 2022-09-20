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
import { EXTERNAL_LINKS } from 'constants/ExternalLinks'

const MENU_LINKS = [
  {
    name: 'Company',
    links: [
      {
        name: 'About us',
        href: EXTERNAL_LINKS.IRONFISH_ABOUT,
      },
      {
        name: 'Careers',
        href: EXTERNAL_LINKS.IRONFISH_CAREERS,
      },
      {
        name: 'Blog',
        href: EXTERNAL_LINKS.IRONFISH_BLOG,
      },
    ],
  },
  {
    name: 'Product',
    links: [
      {
        name: 'Block Explorer',
        href: RoutePaths.Home,
      },
      {
        name: 'Whitepaper',
        href: EXTERNAL_LINKS.IRONFISH_DOCS,
      },
      {
        name: 'FAQ',
        href: EXTERNAL_LINKS.IRONFISH_FAQ,
      },
    ],
  },
]

const CONTACTS = [
  {
    Icon: TelegramIcon,
    href: EXTERNAL_LINKS.IRONFISH_TELEGRAM,
  },
  {
    Icon: GitHubIcon,
    href: EXTERNAL_LINKS.IRONFISH_GITHUB,
  },
  {
    Icon: RedditIcon,
    href: EXTERNAL_LINKS.IRONFISH_REDDIT,
  },
  {
    Icon: TwitterIcon,
    href: EXTERNAL_LINKS.IRONFISH_TWITTER,
  },
  {
    Icon: DiscordIcon,
    href: EXTERNAL_LINKS.IRONFISH_DISCORD,
  },
]

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
      h={{ base: 'auto', md: '20rem' }}
      bgColor={$colors.bg}
      borderTop="0.0625rem solid"
      borderColor={$colors.border}
      p={{ base: '4rem 2rem 0rem', md: '4rem 7.6875rem 0rem' }}
    >
      <Flex direction="column" align="center">
        <Flex
          justify="space-between"
          w={{ base: 'unset', md: '100%' }}
          mb="4rem"
          direction={{ base: 'column', md: 'row' }}
          gap={'1.5rem'}
        >
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
          {MENU_LINKS.map(group => (
            <VStack
              key={`group-${group.name}`}
              spacing="0.5rem"
              align="baseline"
            >
              <Box fontSize="1.25rem" mb="0.125rem">
                {group.name}
              </Box>
              {group.links.map(link => (
                <NextLink key={`link-${link.name}`} href={link.href} passHref>
                  <Link variant="underlined" fontSize="1rem">
                    {link.name}
                  </Link>
                </NextLink>
              ))}
            </VStack>
          ))}
          <NextLink href="mailto:contact@ironfish.network" passHref>
            <Button variant="primary" size="medium">
              Drop us a line!
            </Button>
          </NextLink>
        </Flex>
      </Flex>
      <Flex
        align={'center'}
        w="100%"
        borderTop="0.0625rem solid"
        borderColor={$colors.border}
        color={$colors.color}
        direction={{ base: 'column', sm: 'row' }}
        p={{ base: '1rem', sm: 0 }}
      >
        <Text
          fontSize="0.75rem"
          pl={{ base: 0, sm: '0.8125rem' }}
          my={{ base: '0.875rem', sm: '1.5rem' }}
        >
          {new Date().getFullYear()} Iron Fish. All rights reserved.
        </Text>
        <HStack spacing={'1.375rem'} justifyContent="flex-end" flex={1}>
          {CONTACTS.map((contact, index) => (
            <NextLink key={`contact-${index}`} href={contact.href} passHref>
              <a target="_blank" rel="noopener noreferrer">
                <contact.Icon cursor="pointer" />
              </a>
            </NextLink>
          ))}
        </HStack>
      </Flex>
    </Box>
  )
}

export default Footer
