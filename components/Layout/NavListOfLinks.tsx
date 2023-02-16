import { FC } from 'react'
import { Flex, Link, FlexProps, useBreakpointValue } from '@ironfish/ui-kit'
import NextLink from 'next/link'

import { OuterReferenceIcon } from 'svgx'
import RoutePaths from 'constants/RoutePaths'
import { EXTERNAL_LINKS } from 'constants/ExternalLinks'

const NavListOfLinks: FC<FlexProps> = props => {
  const $spacing = useBreakpointValue({ base: '2rem', lg: 0 })
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
        <Link variant="underlined" sx={$linkStyle}>
          All Blocks
        </Link>
      </NextLink>
      <NextLink href={RoutePaths.Assets} passHref>
        <Link variant="underlined" sx={$linkStyle}>
          All Assets
        </Link>
      </NextLink>
      <NextLink href={RoutePaths.Charts} passHref>
        <Link variant="underlined" sx={$linkStyle}>
          Charts
        </Link>
      </NextLink>
      <NextLink href={EXTERNAL_LINKS.IRONFISH_DOCS} passHref>
        <Link
          variant="underlined"
          sx={$linkStyle}
          target="_blank"
          rel="noreferrer"
        >
          Developer Docs
          <OuterReferenceIcon ml="0.5rem" />
        </Link>
      </NextLink>
      {props.children}
    </Flex>
  )
}

export default NavListOfLinks
