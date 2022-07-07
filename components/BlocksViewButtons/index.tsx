import {
  ButtonGroup,
  IconButton,
  NAMED_COLORS,
  useColorModeValue,
} from '@ironfish/ui-kit'
import RoutePaths from 'constants/RoutePaths'
import { useRouter } from 'next/router'
import ListIcon from 'svgx/ListIcon'
import TreeIcon from 'svgx/TreeIcon'

const BlocksViewButtons = () => {
  const router = useRouter()
  const $iconStyle = useColorModeValue(
    {
      background: NAMED_COLORS.WHITE,
      color: NAMED_COLORS.GREY,
      _active: {
        color: NAMED_COLORS.DEEP_BLUE,
        border: `0.0625rem solid ${NAMED_COLORS.DEEP_BLUE}`,
      },
      _hover: {
        background: NAMED_COLORS.WHITE,
        color: NAMED_COLORS.DEEP_BLUE,
      },
    },
    {
      background: NAMED_COLORS.LIGHT_BLACK,
      color: NAMED_COLORS.PALE_GREY,
      _active: {
        color: NAMED_COLORS.WHITE,
        border: `0.0625rem solid ${NAMED_COLORS.WHITE}`,
        background: NAMED_COLORS.DARKER_GREY,
      },
      _hover: {
        background: NAMED_COLORS.LIGHT_BLACK,
        color: NAMED_COLORS.WHITE,
      },
    }
  )
  return (
    <ButtonGroup size="md" isAttached variant="outline">
      <IconButton
        aria-label="list-button"
        icon={<ListIcon height="24px" width="24px" />}
        isActive={router.route === RoutePaths.Explorer}
        onClick={() => router.push(RoutePaths.Explorer)}
        sx={$iconStyle}
      />
      <IconButton
        aria-label="tree-button"
        icon={<TreeIcon height="24px" width="24px" />}
        isActive={router.route === RoutePaths.ChainExplorer}
        onClick={() => router.push(RoutePaths.ChainExplorer)}
        sx={$iconStyle}
      />
    </ButtonGroup>
  )
}

export default BlocksViewButtons
