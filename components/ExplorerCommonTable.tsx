import { FC } from 'react'
import { Flex, NAMED_COLORS, CommonTable } from '@ironfish/ui-kit'
import CaretRightIcon from 'icons/CaretRightIcon'
import {
  TableComponentProps,
  CommonTableProps,
} from '@ironfish/ui-kit/dist/components/Table/types'

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

const TABLE_COMPONENT_PROPS: TableComponentProps = {
  tableBodyRowProps: {
    sx: {
      '[aria-label="actions-cell"]': {
        transition: 'color 300ms ease-in-out',
        color: NAMED_COLORS.PALE_GREY,
      },
      _hover: {
        '[aria-label="actions-cell"]': {
          color: NAMED_COLORS.DEEP_BLUE,
          _dark: {
            color: NAMED_COLORS.WHITE,
          },
        },
      },
    },
  },
}

const tableComponentRowItemProps: TableComponentProps = {
  tableBodyCellProps: {
    display: 'flex',
    alignItems: 'center',
  },
}

const ExplorerCommonTable: FC<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  CommonTableProps<any>
> = props => {
  return (
    <CommonTable
      tableComponentProps={TABLE_COMPONENT_PROPS}
      tableComponentRowItemProps={tableComponentRowItemProps}
      {...props}
    />
  )
}

export default ExplorerCommonTable
