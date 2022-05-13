import { FC } from "react";

import { BreadcrumbItem, Breadcrumb, useColorModeValue, NAMED_COLORS } from "@ironfish/ui-kit";
import { useRouter } from "next/router";

import RoutePaths from "constants/RoutePaths";
import BreadcrumbLink from "./BreadcrumbLink";

const resolvePath = (path: string) => {
  switch (path) {
    case RoutePaths.Home: return [
      {
        key: "breadcrumb-home",
        link: <BreadcrumbLink.Home isCurrent={true} />
      }]
    case RoutePaths.Explorer: return [
      {
        key: "breadcrumb-home",
        link: <BreadcrumbLink.Home />
      }, {
        key: "breadcrumb-explorer",
        link: <BreadcrumbLink.Explorer isCurrent={true} />
      }
    ]
    case RoutePaths.Charts: return [
      {
        key: "breadcrumb-home",
        link: <BreadcrumbLink.Home />
      }, {
        key: "breadcrumb-charts",
        link: <BreadcrumbLink.Charts isCurrent={true} />
      }
    ]
  }
}

const Breadcrumbs: FC = (props) => {
  const router = useRouter();

  const separatorColor = useColorModeValue(NAMED_COLORS.GREY, NAMED_COLORS.PALE_GREY)

  return (
    <Breadcrumb
      separator={
        <h5
          style={{ cursor: 'default', color: separatorColor }}
        >/</h5>
      }
      spacing='1rem'
      py="1rem"
    >
      {resolvePath(router.route).map(breadcrumb => (
        <BreadcrumbItem key={breadcrumb.key}>
          {breadcrumb.link}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  )
}

export default Breadcrumbs
