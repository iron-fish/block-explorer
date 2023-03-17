import { FC, ReactNode, useMemo } from 'react'
import {
  CommonTable,
  Box,
  useColorModeValue,
  NAMED_COLORS,
} from '@ironfish/ui-kit'
import { TableComponentProps } from '@ironfish/ui-kit/dist/components/Table/types'
import { CommonTableProps } from '@ironfish/ui-kit/dist/components/Table/types'

const borderStyle = {
  base: 'none !important',
  md: 'inherit !important',
}

const DEFAULT_TABLE_ROW_ITEM_PROPS: TableComponentProps = {
  tableHeadRowProps: {
    display: { base: 'block', md: 'none' },
  },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ColumnTableProps extends CommonTableProps<any> {
  emptyComponent?: ReactNode
}

const ColumnTable: FC<ColumnTableProps> = ({
  data,
  columns,
  emptyComponent,
  ...rest
}) => {
  const header = useColorModeValue(NAMED_COLORS.GREY, NAMED_COLORS.PALE_GREY)

  const tableComponentProps: TableComponentProps = useMemo(
    () => ({
      tableHeadProps: {
        display: { base: 'none', md: 'table-header-group' },
      },
      tableHeadCellProps: { color: header },
      tableBodyRowProps: {
        ...(!rest?.onRowClick && {
          _hover: {
            borderColor: 'inherit !important',
          },
        }),
        cursor: rest?.onRowClick ? 'pointer' : 'default',
        display: {
          base: 'flex',
          md: 'table-row',
        },
        flexWrap: {
          base: 'wrap',
          md: 'nowrap',
        },
        p: { base: '1rem 0', md: '0.25rem' },
      },
      tableBodyCellProps: {
        px: {
          base: '2rem',
          md: 'inherit',
        },
        py: {
          base: '0.25rem',
          md: '1.625rem',
        },
        borderTop: borderStyle,
        borderBottom: borderStyle,
        mr: 'auto',
        _first: {
          pl: '2rem',
          borderLeft: borderStyle,
        },
        _last: {
          pr: '2rem',
          borderRight: borderStyle,
          mr: 'unset',
        },
      },
    }),
    [rest?.onRowClick, header]
  )

  return (
    <Box w={{ base: '100%', md: '50%' }}>
      <CommonTable
        data={data}
        w="100%"
        columns={columns}
        tableComponentProps={tableComponentProps}
        tableComponentRowItemProps={DEFAULT_TABLE_ROW_ITEM_PROPS}
        {...rest}
      />
      {!data.length && emptyComponent}
    </Box>
  )
}

export default ColumnTable
