import { FC, ReactNode } from 'react'

import {
  Box,
  BreadcrumbLink as Link,
  Flex,
  NAMED_COLORS,
  useColorModeValue,
} from '@ironfish/ui-kit'
import RoutePaths from 'constants/RoutePaths'
import HomeIcon from 'icons/HomeIcon'
import BlockIcon from 'icons/BlockIcon'
import NextLink from 'next/link'

export interface BreadCrumbQueryType {
  id?: number | string | null | undefined
  hash?: string | null | undefined
}

interface BreadCrumbToType {
  pathname?: RoutePaths | string | null | undefined
  query?: string | null | BreadCrumbQueryType | undefined
}

interface BaseBreadcrumbLinkProps {
  icon: ReactNode
  label: ReactNode
  isCurrent?: boolean
  to?: BreadCrumbToType | string
}

const LinkWrapper = ({ to, isCurrent, children }) => {
  return isCurrent ? (
    children
  ) : (
    <NextLink href={to} passHref>
      <Link>{children}</Link>
    </NextLink>
  )
}

const BaseBreadcrumbLink: FC<BaseBreadcrumbLinkProps> = ({
  icon,
  label,
  isCurrent = false,
  to = '#',
}) => {
  const currentColor = useColorModeValue(
    {
      icon: NAMED_COLORS.LIGHT_GREY,
      text: NAMED_COLORS.GREY,
    },
    {
      icon: NAMED_COLORS.PALE_GREY,
      text: NAMED_COLORS.PALE_GREY,
    }
  )

  return (
    <LinkWrapper to={to} isCurrent={isCurrent}>
      <Flex alignItems="center" cursor={isCurrent ? 'default' : 'pointer'}>
        <Box
          mr="0.75rem"
          pb="0.4rem"
          color={isCurrent ? currentColor.icon : NAMED_COLORS.LIGHT_BLUE}
        >
          {icon}
        </Box>
        <Box color={isCurrent ? currentColor.text : NAMED_COLORS.LIGHT_BLUE}>
          <h5>{label}</h5>
        </Box>
      </Flex>
    </LinkWrapper>
  )
}

type CurrentBreadcrumbLink = Pick<BaseBreadcrumbLinkProps, 'isCurrent'>

type BlockInfoBreadCrumbLink = Pick<BaseBreadcrumbLinkProps, 'isCurrent' | 'to'>

const Home: FC<CurrentBreadcrumbLink> = ({ isCurrent }) => (
  <BaseBreadcrumbLink
    to={RoutePaths.Home}
    icon={<HomeIcon h="1.25rem" w="1.25rem" color="inherit" />}
    label="Home"
    isCurrent={isCurrent}
  />
)

const Explorer: FC<CurrentBreadcrumbLink> = ({ isCurrent = false }) => (
  <BaseBreadcrumbLink
    to={RoutePaths.Explorer}
    icon={<BlockIcon h="1.25rem" w="1.25rem" color="inherit" />}
    label="All Blocks"
    isCurrent={isCurrent}
  />
)

const BlockInfo: FC<BlockInfoBreadCrumbLink> = ({
  isCurrent = false,
  to = RoutePaths.BlockInfo,
}) => (
  <BaseBreadcrumbLink
    to={to}
    icon={<BlockIcon h="1.25rem" w="1.25rem" color="inherit" />}
    label="Block Info"
    isCurrent={isCurrent}
  />
)

const TransactionInfo: FC<CurrentBreadcrumbLink> = ({ isCurrent = false }) => (
  <BaseBreadcrumbLink
    to={RoutePaths.TransactionInfo}
    icon={<BlockIcon h="1.25rem" w="1.25rem" color="inherit" />}
    label="Txn Info"
    isCurrent={isCurrent}
  />
)

const Charts: FC<CurrentBreadcrumbLink> = ({ isCurrent = false }) => (
  <BaseBreadcrumbLink
    to={RoutePaths.Charts}
    icon={<BlockIcon h="1.25rem" w="1.25rem" color="inherit" />}
    label="All Charts"
    isCurrent={isCurrent}
  />
)

interface BreadcrumbLinkProps {
  Home: FC<CurrentBreadcrumbLink>
  Explorer: FC<CurrentBreadcrumbLink>
  BlockInfo: FC<BlockInfoBreadCrumbLink>
  Charts: FC<CurrentBreadcrumbLink>
  TransactionInfo: FC<CurrentBreadcrumbLink>
}

const BreadcrumbLink: FC<BaseBreadcrumbLinkProps> &
  BreadcrumbLinkProps = props => <BaseBreadcrumbLink {...props} />

BreadcrumbLink.Home = Home
BreadcrumbLink.Explorer = Explorer
BreadcrumbLink.BlockInfo = BlockInfo
BreadcrumbLink.Charts = Charts
BreadcrumbLink.TransactionInfo = TransactionInfo

export default BreadcrumbLink
