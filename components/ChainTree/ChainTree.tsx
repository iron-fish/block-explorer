import { FC, useState } from 'react'
import {
  Box,
  NAMED_COLORS,
  useBreakpointValue,
  useColorModeValue,
} from '@ironfish/ui-kit'
import { Group } from '@visx/group'

import Node from './Node'
import NodeLink from './NodeLink'

import { calculateNodePosition, getBGColorBySeq, transformData } from './utils'
import { ChainTreeProps } from './types'
import { HierarchyNode } from '@visx/hierarchy/lib/types'
import { Tree } from 'array-to-tree'
import { BlockType } from 'types'

const ChainTree: FC<ChainTreeProps> = ({ blocks, head }) => {
  const chain = transformData(blocks).sort((a, b) => {
    return b?.data?.main ? 1 : b.height > a.height ? 1 : -1
  })
  const $detailsHeight = useBreakpointValue({
    base: 710,
    sm: 510,
    md: 400,
    lg: 330,
    xl: 280,
  })
  const $textColor = useColorModeValue(
    NAMED_COLORS.GREY,
    NAMED_COLORS.PALE_GREY
  )
  const [$selectedNode, setNode] =
    useState<HierarchyNode<Tree<BlockType>>>(null)
  const height = chain.height * 80 + ($selectedNode ? $detailsHeight : 0) + 30
  const totalHeight = head?.sequence
    ? head?.sequence * 80 + $detailsHeight + 30
    : '100vh'

  return (
    <Box width="100%" height={height} overflow="hidden">
      <svg width="100%" height={totalHeight}>
        <Group top={30} left={30}>
          {Array.from({ length: head?.sequence | 0 }).map((k, index) => (
            <text
              key={head?.sequence - index}
              y={
                totalHeight -
                (head?.sequence - index) * 80 +
                5 -
                ($selectedNode
                  ? $selectedNode.data.sequence > head?.sequence - index
                    ? 0
                    : $detailsHeight
                  : $detailsHeight)
              }
              fill={$textColor}
              textAnchor="middle"
              fontSize={16}
            >
              {head?.sequence - index}
            </text>
          ))}
        </Group>
        <Group top={30} left={130}>
          {chain.links().map(link => (
            <NodeLink
              key={link?.source?.data?.hash + link?.target?.data?.hash}
              head={head}
              source={link?.source}
              target={link?.target}
              selected={$selectedNode}
              detailsPannelHeight={$detailsHeight}
            />
          ))}
          {chain.descendants().map(node => (
            <Node
              key={node.data.hash}
              selected={$selectedNode}
              node={node}
              detailsPannelHeight={$detailsHeight}
              position={calculateNodePosition(
                node,
                head,
                $selectedNode,
                $detailsHeight
              )}
              bgTextColor={getBGColorBySeq(head?.sequence, node.data.sequence)}
              onSelect={selectedNode => setNode(selectedNode)}
            />
          ))}
        </Group>
      </svg>
    </Box>
  )
}

export default ChainTree
