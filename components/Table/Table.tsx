import { FC } from 'react'

import {
  Flex,
  NAMED_COLORS,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@ironfish/ui-kit'

import RowItem from './RowItem'
import RowItemSpin from './RowItemSpin'
import { CommonTableProps } from './types'
import CaretRightIcon from 'icons/CaretRightIcon'

export const ACTIONS_COLUMN = {
  key: 'actions-cell',
  label: '',
  WrapperProps: {
    width: 'min-content',
    alignSelf: 'center',
  },
  render: () => (
    <Flex w="100%">
      <CaretRightIcon
        aria-label="actions-cell"
        mr="-0.8125rem"
        ml="auto"
        w={'1.75rem'}
        h={'1.75rem'}
      />
    </Flex>
  ),
}

const nonInteractiveTbodyStyles = {
  tr: {
    _hover: {
      borderColor: null,
    },
  },
}

export const CommonTable: FC<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  CommonTableProps<any>
> = ({ data = null, columns = [], onRowClick, ...rest }) => {
  const colors = useColorModeValue(
    {
      bg: NAMED_COLORS.WHITE,
      hoverBorder: NAMED_COLORS.DEEP_BLUE,
      caretColor: NAMED_COLORS.PALE_GREY,
    },
    {
      bg: NAMED_COLORS.DARKER_GREY,
      hoverBorder: NAMED_COLORS.WHITE,
      caretColor: NAMED_COLORS.PALE_GREY,
    }
  )

  return (
    <Table {...rest} variant="blocks">
      <Thead display={{ base: 'none', lg: 'table-header-group' }}>
        <Tr>
          {columns.map(column => (
            <Th key={column.key}>{column.label}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody sx={!onRowClick ? nonInteractiveTbodyStyles : null}>
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
            bg={colors.bg}
            mb="1rem"
            border="0.063rem solid"
            borderRadius="0.25rem"
            borderColor="inherit"
            boxShadow="0 0.25rem 0.668rem rgba(0, 0, 0, 0.04)"
            p={{ base: '1rem 0', lg: '1rem' }}
            cursor={block && onRowClick ? 'pointer' : 'default'}
            onClick={() => block && onRowClick && onRowClick(block)}
            sx={{
              '[aria-label="actions-cell"]': {
                transition: 'color 300ms ease-in-out',
                color: colors.caretColor,
              },
              _hover: {
                '[aria-label="actions-cell"]': {
                  color: colors.hoverBorder,
                },
              },
            }}
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
                  pl: '2rem',
                  borderLeft: {
                    base: 'none !important',
                    lg: 'inherit !important',
                  },
                }}
                _last={{
                  pr: '2rem',
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
