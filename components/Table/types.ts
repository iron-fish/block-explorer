import { ReactNode } from 'react'
import { FlexProps, StyleProps, TableProps } from '@ironfish/ui-kit'
import { Translator } from 'types/common'

export interface RowItemProps extends FlexProps {
  label: ReactNode
}

export interface DataRowProps {
  onClick?: (e) => void
}

export interface ColumnProps<T> {
  key: string
  label: ReactNode
  ItemProps?: FlexProps
  WrapperProps?: StyleProps
  render: (data: T, t?: Translator) => ReactNode
}

export interface CommonTableProps<T> extends TableProps {
  data?: T[]
  columns?: ColumnProps<T>[]
  onRowClick?: (data: T) => void
}
