import { FC, useRef } from 'react'
import {
  Flex,
  Box,
  ColorModeSwitcher,
  useColorModeValue,
  NAMED_COLORS,
  useBreakpointValue,
} from '@ironfish/ui-kit'

import { IronFishLogo } from 'svgx'
import { NavSearch } from 'components'
import NavMenu from './NavMenu'
import NavListOfLinks from './NavListOfLinks'
import Link from 'next/link'
import RoutePaths from 'constants/RoutePaths'

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
        />
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
        <Link href={RoutePaths.Home} passHref>
          <Box
            order={1}
            justifySelf="flex-start"
            flex={{ base: null, sm: 1 }}
            mr={{ base: 0, sm: '1.5rem' }}
            w="50%"
            py="1rem"
            mb="0.125rem"
            cursor="pointer"
          >
            <IronFishLogo />
          </Box>
        </Link>
        <Box
          flex={{ base: 1.5, lg: 1 }}
          order={{ base: 10, sm: 2 }}
          p="1.5rem 0rem"
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
          <Box mr={{ base: '2rem', lg: 0 }}>{$content}</Box>
          <ColorModeSwitcher />
        </Flex>
      </Flex>
      <Box ref={menuRef} />
    </Flex>
  )
}

export default Navbar
