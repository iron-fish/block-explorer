import { FC } from "react"
import { Line } from "@visx/shape"
import { NodeLinkProps } from "./types"

import { calculateNodePosition, getNodeXIndex } from "./utils"
import { NAMED_COLORS, useColorModeValue } from "@ironfish/ui-kit"

const NodeLink: FC<NodeLinkProps> = ({
  head,
  source,
  target,
  selected,
  detailsPannelHeight = 280
}) => {
  const $lineColor = useColorModeValue(NAMED_COLORS.LIGHT_GREY, NAMED_COLORS.DARK_GREY)

  if (!source?.parent) {
    return null
  }

  const isBranch = getNodeXIndex(source) !== getNodeXIndex(target)
  const sourcePosition = calculateNodePosition(source, head, selected, detailsPannelHeight)
  const targetPosition = calculateNodePosition(target, head, selected, detailsPannelHeight)

  return <Line
    from={{ x: sourcePosition.x + (isBranch ? 23 : 0), y: sourcePosition.y - (isBranch ? 0 : 23) }}
    to={{ x: targetPosition.x, y: targetPosition.y + 20 }}
    stroke={$lineColor}
    strokeWidth="1"
  />
}

export default NodeLink