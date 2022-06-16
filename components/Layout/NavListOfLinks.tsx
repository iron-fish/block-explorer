import { FC } from 'react'
import { useTranslation } from 'hooks/useTranslation'
import {
  useBreakpointValue,
  Flex,
  Link,
  useConst,
  FlexProps,
} from '@ironfish/ui-kit'
import NextLink from 'next/link'

import { OuterReferenceIcon } from 'svgx'
import RoutePaths from 'constants/RoutePaths'
import { EXTERNAL_LINKS } from 'constants/ExternalLinks'

const NavListOfLinks: FC<FlexProps> = props => {
  const $spacing = useBreakpointValue({ base: '2rem', lg: 0 })
  const { t } = useTranslation('c-navlistoflinks')
  const $linkStyle = useConst({
    mr: '2rem',
    whiteSpace: 'nowrap',
    fontSize: 'inherit',
    mb: $spacing,
    height: '2.3125rem',
    display: 'flex',
    alignItems: 'center',
  })

  return (
    <Flex {...props}>
      <NextLink href={RoutePaths.Explorer} passHref>
        <Link variant="underlined" sx={$linkStyle}>
          {t('link-all')}
        </Link>
      </NextLink>
      <NextLink href={RoutePaths.Charts} passHref>
        <Link variant="underlined" sx={$linkStyle}>
          {t('link-charts')}
        </Link>
      </NextLink>
      <NextLink href={EXTERNAL_LINKS.IRONFISH_DOCS} passHref>
        <Link variant="underlined" sx={$linkStyle}>
          {t('link-docs')}
          <OuterReferenceIcon ml="1rem" />
        </Link>
      </NextLink>
      {props.children}
    </Flex>
  )
}

export default NavListOfLinks
