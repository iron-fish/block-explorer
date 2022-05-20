import { ButtonGroup, IconButton } from "@ironfish/ui-kit";
import RoutePaths from "constants/RoutePaths";
import { useRouter } from "next/router";
import ListIcon from "svgx/ListIcon";
import TreeIcon from "svgx/TreeIcon";

const BlocksViewButtons = () => {
  const router = useRouter();
  return (
    <ButtonGroup
      size="md"
      isAttached
      variant="outline"
    >
      <IconButton
        aria-label="list-button"
        icon={<ListIcon height="24px" width="24px" />}
        isActive={router.route === RoutePaths.Explorer}
        onClick={() => router.push(RoutePaths.Explorer)}
      />
      <IconButton
        aria-label="tree-button"
        icon={<TreeIcon height="24px" width="24px" />}
        isActive={router.route === RoutePaths.ChainExplorer}
        onClick={() => router.push(RoutePaths.ChainExplorer)}
      />
    </ButtonGroup>
  )
}

export default BlocksViewButtons
