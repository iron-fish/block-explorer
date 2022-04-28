import { ReactNode } from "react";
import { FlexProps, StyleProps, TableProps } from "@ironfish/ui-kit";

export interface RowItemProps extends FlexProps {
  label: ReactNode
}

export interface DataRowProps {
  items: ReactNode[],
  onClick?: (e) => void
}

export interface ColumnProps<T> {
  key: string
  label: ReactNode
  ItemProps?: FlexProps
  WrapperProps?: StyleProps
  render: (data: T) => ReactNode
}

export interface CommonTableProps<T> extends TableProps {
  data?: T[],
  columns?: ColumnProps<T>[]
  onRowClick?: (data: T) => void
}