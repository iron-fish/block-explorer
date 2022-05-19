import { FC } from "react"
import { Group } from "@visx/group"

import BlockPreview from "./BlockPreview"
import { NodeProps } from "./types"
import { NAMED_COLORS, useColorModeValue } from "@ironfish/ui-kit"

const Node: FC<NodeProps> = ({
  node,
  position,
  bgTextColor,
  selected,
  detailsPannelHeight = 280,
  onSelect = (node) => { }
}) => {
  const $colors = useColorModeValue({
    border: NAMED_COLORS.LIGHT_GREY,
    bg: NAMED_COLORS.WHITE,
    text: NAMED_COLORS.DEEP_BLUE
  }, {
    border: NAMED_COLORS.DARK_GREY,
    bg: NAMED_COLORS.DARKER_GREY,
    text: NAMED_COLORS.DEEP_BLUE
  })
  return node.parent && (
  <Group
    top={position.y}
    left={0}
  >
    <Group
      left={position.x}
      top={0}
      onClick={e => onSelect(node)}
    >
      <rect
        height={40}
        width={40}
        y={-20}
        x={-17}
        rx={2}
        ry={2}
        fill={$colors.bg}
        stroke={$colors.border}
      />
      <rect
        height={40}
        width={40}
        y={-23}
        x={-20}
        rx={2}
        ry={2}
        fill={$colors.bg}
        stroke={$colors.border}
      />
      <rect
        height={24}
        width={24}
        y={-15}
        x={-12}
        rx={2}
        ry={2}
        fill={bgTextColor}
      />
      <text
        fontSize={13 - node.data.transactions_count.toString().length}
        textAnchor="middle"
        fill={$colors.text}
        y={1}
        style={{
          fontWeight: "700"
        }}
      >
        {node.data.transactions_count}
      </text>
    </Group>
    <foreignObject
      y={40}
      x={-120}
      height={detailsPannelHeight}
      width="100%"
      display={selected?.data.hash === node.data.hash ? 'block' : 'none'}
    >
      <BlockPreview
        block={node?.data}
        height={detailsPannelHeight}
        onClose={() => onSelect(null)}
      />
    </foreignObject>
  </Group>
)}

export default Node