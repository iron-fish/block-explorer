import { hierarchy } from '@visx/hierarchy'
import { HierarchyNode } from '@visx/hierarchy/lib/types'
import toTree, { Tree } from 'array-to-tree'
import { BlockType } from 'types'
import { Position } from './types'

export const transformData = (
  blocks: BlockType[]
): HierarchyNode<Tree<BlockType>> => {
  const tree: Tree<BlockType> = {
    id: 0,
    hash: 'root',
    main: true,
    object: 'rootNode',
    graffiti: 'rootNode',
    difficulty: 0,
    previous_block_hash: '',
    sequence: 0,
    size: 0,
    time_since_last_block_ms: 0,
    timestamp: '',
    transactions_count: 0,
    children: toTree<BlockType>(blocks, {
      parentProperty: 'previous_block_hash',
      customID: 'hash',
    }),
  }

  return hierarchy<Tree<BlockType>>(tree)
}

export const getBGColorBySeq = (headSeq: number, seq: number): string => {
  return `hsl(${255 - Math.floor((255 / headSeq) * seq)}, ${
    Math.floor((40 / headSeq) * seq) + 20
  }%, ${100 - Math.floor((30 / headSeq) * seq)}%)`
}

export const getNodeXIndex = (node: HierarchyNode<Tree<BlockType>>): number => {
  if (
    node?.parent &&
    node.parent.children &&
    Array.isArray(node.parent.children)
  ) {
    const parentIndex = node.parent.children.findIndex(
      child => child?.data?.hash && child?.data?.hash === node?.data?.hash
    )

    return (
      parentIndex + (node.parent.data.main ? 0 : getNodeXIndex(node?.parent))
    )
  }

  return 0
}

export const calculateNodePosition = (
  node: HierarchyNode<Tree<BlockType>>,
  head: BlockType,
  selected: HierarchyNode<Tree<BlockType>> | null,
  detailsHeight = 280
): Position => {
  const height = head?.sequence ? head.sequence * 80 + 30 : 1024

  return {
    x: 90 * getNodeXIndex(node),
    y:
      height -
      node.data.sequence * 80 +
      (selected
        ? selected.data.sequence > node.data.sequence
          ? detailsHeight
          : 0
        : 0),
  }
}
