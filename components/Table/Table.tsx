import { FC } from 'react'

import {
  NAMED_COLORS,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@ironfish/ui-kit'
import size from 'byte-size'

import RowItem from './RowItem'
import RowItemSpin from './RowItemSpin'
import { CommonTableProps } from './types'

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
  onRowClick,
  ...rest
}) => {
  const $bg = useColorModeValue(NAMED_COLORS.WHITE, NAMED_COLORS.DARKER_GREY)

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
          <Tr
            key={block?.id || `load-${index}`}
            display={{
              base: 'flex',
              lg: 'table-row',
            }}
            flexWrap={{
              base: 'wrap',
              lg: 'nowrap',
            }}
            bg={$bg}
            mb="1rem"
            border="0.063rem solid"
            borderRadius="0.25rem"
            borderColor="inherit"
            boxShadow="0 0.25rem 0.668rem rgba(0, 0, 0, 0.04)"
            p="1rem"
            cursor={block && onRowClick ? 'pointer' : 'default'}
            onClick={() => block && onRowClick && onRowClick(block)}
          >
            {columns.map(column => (
              <Td
                key={column.key}
                {...column.WrapperProps}
                px={{
                  base: '2rem',
                  lg: 'inherit',
                }}
                py={{
                  base: '1rem',
                  lg: '1.625rem',
                }}
                borderTop={{
                  base: 'none !important',
                  lg: 'inherit !important',
                }}
                borderBottom={{
                  base: 'none !important',
                  lg: 'inherit !important',
                }}
                _first={{
                  borderLeft: {
                    base: 'none !important',
                    lg: 'inherit !important',
                  },
                }}
                _last={{
                  borderRight: {
                    base: 'none !important',
                    lg: 'inherit !important',
                  },
                }}
              >
                <RowItem label={column.label} {...column.ItemProps}>
                  {block ? column.render(block) : <RowItemSpin minW="4rem" />}
                </RowItem>
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default CommonTable
