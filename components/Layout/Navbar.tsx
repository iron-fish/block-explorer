import { FC, useRef, useMemo } from 'react'
import {
  Flex,
  Box,
  ColorModeSwitcher,
  keyframes,
  useColorModeValue,
  NAMED_COLORS,
  StyleProps,
  useBreakpointValue,
  Badge,
  Center,
} from '@ironfish/ui-kit'

import { IronFishLogo, OuterReferenceIcon } from 'svgx'
import { NavSearch } from 'components'
import NavMenu from './NavMenu'
import NavListOfLinks from './NavListOfLinks'
import Link from 'next/link'
import useNodeVersion from 'hooks/useNodeVersion'
import { EXTERNAL_LINKS } from 'constants/ExternalLinks'

const openInNewTab = (url: string): void => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) {
    newWindow.opener = null
  }
}

const NodeVersionButton: FC<StyleProps> = (props: StyleProps) => {
  const { loaded, data, error } = useNodeVersion()

  const spinAnimation = useColorModeValue(
    keyframes`
      0% { background-color: ${NAMED_COLORS.PALE_GREY} }
      100% { background-color: ${NAMED_COLORS.LIGHT_GREY} }
    `,
    keyframes`
      0% { background-color: ${NAMED_COLORS.DARK_GREY} }
      100% { background-color: ${NAMED_COLORS.GREY} }
    `
  )

  const versionUrl = useMemo(
    () =>
      `https://github.com/iron-fish/ironfish/releases/${
        loaded ? 'tag/v' + data.ironfish.version : ''
      }`,
    [loaded, data]
  )

  if (error) {
    return null
  }

  return (
    <Badge
      onClick={() => openInNewTab(versionUrl)}
      bg={NAMED_COLORS.LIGHTER_GREY}
      color={NAMED_COLORS.BLACK}
      borderRadius="5rem"
      py="0.25rem"
      px="1rem"
      textTransform="none"
      sx={{
        transitionProperty: 'var(--chakra-transition-property-common)',
        transitionDuration: 'var(--chakra-transition-duration-normal)',
        _hover: {
          bg: NAMED_COLORS.LIGHT_YELLOW,
        },
      }}
      cursor="pointer"
      {...props}
    >
      {loaded ? (
        <Center>
          <h5>Node {data.ironfish.version}</h5>
          <OuterReferenceIcon ml="0.5rem" mb="0.1rem" />
        </Center>
      ) : (
        <Box
          h="1.375rem"
          minW="6rem"
          animation={`${spinAnimation} infinite 0.7s alternate`}
          borderRadius="0.2rem"
        />
      )}
    </Badge>
  )
}

const Navbar: FC = () => {
  const menuRef = useRef(null)
  const $colors = useColorModeValue(
    {
      bg: NAMED_COLORS.WHITE,
      border: NAMED_COLORS.LIGHT_GREY,
    },
    {
      bg: NAMED_COLORS.LIGHT_BLACK,
      border: NAMED_COLORS.DARK_GREY,
    }
  )
  const $content = useBreakpointValue({
    base: (
      <NavMenu menuRef={menuRef}>
        <NavListOfLinks
          sx={{
            flexDirection: 'column',
            w: '100%',
            h: '100vh',
            p: '2.5rem',
            fontSize: '2.3125rem',
            bgColor: $colors.bg,
          }}
        >
          <NodeVersionButton
            mt="1rem"
            display={{ base: 'block', lg: 'none' }}
            width="9rem"
            bg={NAMED_COLORS.LIGHT_YELLOW}
          />
        </NavListOfLinks>
      </NavMenu>
    ),
    lg: <NavListOfLinks sx={{ fontSize: '0.875rem' }} />,
  })

  return (
    <Flex w="100%" position="sticky" top={0} zIndex={10} direction="column">
      <Flex
        align="center"
        w="100%"
        flexWrap="wrap"
        borderBottom="0.0625rem solid"
        p={{ base: '1.125rem 2rem 0rem', sm: '0rem 2rem', md: '0rem 4rem' }}
        bgColor={$colors.bg}
        boxShadow="0rem 0.25rem 0.6875rem rgba(0, 0, 0, 0.04)"
        borderColor={$colors.border}
        justifyContent="space-between"
      >
        <Link href={EXTERNAL_LINKS.IRONFISH} passHref>
          <Box
            order={1}
            justifySelf="flex-start"
            flex={{ base: null, sm: 1 }}
            mr={{ base: 0, sm: '1.5rem' }}
            w="50%"
            mb="0.125rem"
            whiteSpace="nowrap"
          >
            <IronFishLogo cursor="pointer" />
            <NodeVersionButton
              mx="1rem"
              display={{ base: 'none', lg: 'inline-block' }}
            />
          </Box>
        </Link>
        <Box
          flex={{ base: 1.5, lg: 1 }}
          order={{ base: 10, sm: 2 }}
          p={{ base: '1rem 0rem 1.5rem 0rem', sm: '1.5rem 0rem' }}
        >
          <NavSearch />
        </Box>
        <Flex
          order={3}
          flex={{ base: null, sm: 1 }}
          justifyContent="flex-end"
          align="center"
          ml={{ base: 0, sm: '1.5rem' }}
          w="50%"
        >
          <Box mr={{ base: '1.5rem', lg: 0 }}>{$content}</Box>
          <ColorModeSwitcher />
        </Flex>
      </Flex>
      <Box ref={menuRef} />
    </Flex>
  )
}

export default Navbar
