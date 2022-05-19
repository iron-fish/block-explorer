import { HierarchyNode } from "@visx/hierarchy/lib/types"
import { Tree } from "array-to-tree"
import { BlockType } from "types"

export interface Position {
  x: number
  y: number
}

export interface NodeLinkProps {
  head: BlockType
  source: HierarchyNode<Tree<BlockType>>
  target: HierarchyNode<Tree<BlockType>>
  selected: HierarchyNode<Tree<BlockType>> | null
  detailsPannelHeight: number
}

export interface NodeProps {
  node: HierarchyNode<Tree<BlockType>>
  position: Position
  bgTextColor: string
  detailsPannelHeight: number
  selected: HierarchyNode<Tree<BlockType>> | null
  onSelect: (node: HierarchyNode<Tree<BlockType>> | null) => void
}

export interface ChainTreeProps {
  blocks: BlockType[]
  head: BlockType
}
