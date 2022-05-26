import { FC } from 'react'

import {
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from '@ironfish/ui-kit'
import size from 'byte-size'

import DataRowSmall from './DataRowSmall'
import DataRowLarge from './DataRowLarge'
import RowItem from './RowItem'
import RowItemSpin from './RowItemSpin'
import { CommonTableProps } from './types'
import RowItemWrapperSmall from './RowItemWrapperSmall'
import RowItemWrapperLarge from './RowItemWrapperLarge'

size.defaultOptions({
  precision: 2,
})

export const CommonTable: FC<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  CommonTableProps<any>
> = ({
  data = null,
  columns = [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onRowClick = () => {},
  ...rest
}) => {
  const Row = useBreakpointValue({
    base: {
      Data: DataRowSmall,
      ItemWrapper: RowItemWrapperSmall,
    },
    lg: {
      Data: DataRowLarge,
      ItemWrapper: RowItemWrapperLarge,
    },
  })

  return (
    <Table {...rest} variant="blocks">
      <Thead display={{ base: 'none', lg: 'table-header-group' }}>
        <Tr>
          {columns.map(column => (
            <Th key={column.key}>{column.label}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {data?.map((block, index) => (
          <Row.Data
            key={block?.id || `load-${index}`}
            items={columns.map(column => (
              <Row.ItemWrapper key={column.key} {...column.WrapperProps}>
                <RowItem label={column.label} {...column.ItemProps}>
                  {block ? column.render(block) : <RowItemSpin minW="4rem" />}
                </RowItem>
              </Row.ItemWrapper>
            ))}
            onClick={() => block && onRowClick(block)}
          />
        ))}
      </Tbody>
    </Table>
  )
}

export default CommonTable
