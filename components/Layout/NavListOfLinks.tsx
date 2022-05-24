import { FC } from 'react'
import { Flex, Link, Center, useConst, FlexProps } from '@ironfish/ui-kit'
import NextLink from 'next/link'

import { OuterReferenceIcon } from 'svgx'
import RoutePaths from 'constants/RoutePaths'

const NavListOfLinks: FC<FlexProps> = props => {
  const linkStyle = useConst({
    mr: '2rem',
    whiteSpace: 'nowrap',
  })

  return (
    <Flex {...props}>
      <NextLink href={RoutePaths.Explorer} passHref>
        <Link sx={linkStyle}>All blocks</Link>
      </NextLink>
      <NextLink href={RoutePaths.Charts} passHref>
        <Link sx={linkStyle}>Charts</Link>
      </NextLink>
      <NextLink href="#" passHref>
        <Link sx={linkStyle}>
          <Flex>
            Developer Docs
            <Center ml="0.5rem">
              <OuterReferenceIcon />
            </Center>
          </Flex>
        </Link>
      </NextLink>
    </Flex>
  )
}

export default NavListOfLinks
