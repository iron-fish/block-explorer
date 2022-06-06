import { FC } from 'react'
import { Flex, Link, FlexProps, useBreakpointValue } from '@ironfish/ui-kit'
import NextLink from 'next/link'

import { OuterReferenceIcon } from 'svgx'
import RoutePaths from 'constants/RoutePaths'

const NavListOfLinks: FC<FlexProps> = props => {
  const $spacing = useBreakpointValue({ base: '32px', lg: 0 })
  const $linkStyle = {
    mr: '2rem',
    whiteSpace: 'nowrap',
    fontSize: 'inherit',
    mb: $spacing,
    height: '2.3125rem',
    display: 'flex',
    alignItems: 'center',
  }

  return (
    <Flex {...props}>
      <NextLink href={RoutePaths.Explorer} passHref>
        <Link sx={$linkStyle}>All blocks</Link>
      </NextLink>
      <NextLink href={RoutePaths.Charts} passHref>
        <Link sx={$linkStyle}>Charts</Link>
      </NextLink>
      <NextLink href="#" passHref>
        <Link sx={$linkStyle}>
          Developer Docs
          <OuterReferenceIcon ml="1rem" />
        </Link>
      </NextLink>
      {props.children}
    </Flex>
  )
}

export default NavListOfLinks
