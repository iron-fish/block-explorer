import { FC } from 'react'

import {
  BreadcrumbItem,
  Breadcrumb,
  useColorModeValue,
  NAMED_COLORS,
} from '@ironfish/ui-kit'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'node:querystring'

import RoutePaths from 'constants/RoutePaths'
import BreadcrumbLink from './BreadcrumbLink'

const resolvePath = (path: string, queryParams: ParsedUrlQuery | null) => {
  switch (path) {
    case RoutePaths.Home:
      return [
        {
          key: 'breadcrumb-home',
          link: <BreadcrumbLink.Home isCurrent={true} />,
        },
      ]
    case RoutePaths.Explorer:
      return [
        {
          key: 'breadcrumb-home',
          link: <BreadcrumbLink.Home />,
        },
        {
          key: 'breadcrumb-explorer',
          link: <BreadcrumbLink.Explorer isCurrent={true} />,
        },
      ]
    case RoutePaths.BlockInfo:
      return [
        {
          key: 'breadcrumb-home',
          link: <BreadcrumbLink.Home />,
        },
        {
          key: 'breadcrumb-explorer',
          link: <BreadcrumbLink.Explorer />,
        },
        {
          key: 'breadcrumb-block-details',
          link: <BreadcrumbLink.BlockInfo isCurrent={true} />,
        },
      ]
    case RoutePaths.Charts:
      return [
        {
          key: 'breadcrumb-home',
          link: <BreadcrumbLink.Home />,
        },
        {
          key: 'breadcrumb-charts',
          link: <BreadcrumbLink.Charts isCurrent={true} />,
        },
      ]
    case RoutePaths.TransactionInfo:
      return [
        {
          key: 'breadcrumb-home',
          link: <BreadcrumbLink.Home />,
        },
        {
          key: 'breadcrumb-explorer',
          link: <BreadcrumbLink.Explorer />,
        },
        {
          key: 'breadcrumb-block-details',
          link: (
            <BreadcrumbLink.BlockInfo
              to={{
                pathname: RoutePaths.BlockInfo,
                query: { id: queryParams.id },
              }}
            />
          ),
        },
        {
          key: 'breadcrumb-transaction-details',
          link: <BreadcrumbLink.TransactionInfo isCurrent={true} />,
        },
      ]
  }
}

interface BreadCrumbProps {
  queryParams?: ParsedUrlQuery
}

const Breadcrumbs: FC<BreadCrumbProps> = ({ queryParams }) => {
  const { route } = useRouter()

  const separatorColor = useColorModeValue(
    NAMED_COLORS.GREY,
    NAMED_COLORS.PALE_GREY
  )

  return (
    <Breadcrumb
      separator={
        <h5 style={{ cursor: 'default', color: separatorColor }}>/</h5>
      }
      spacing="1rem"
      pt="1rem"
      pb="1.5rem"
    >
      {resolvePath(route, queryParams).map(breadcrumb => (
        <BreadcrumbItem key={breadcrumb.key}>{breadcrumb.link}</BreadcrumbItem>
      ))}
    </Breadcrumb>
  )
}

export default Breadcrumbs
