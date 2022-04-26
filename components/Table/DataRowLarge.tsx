import { Td, Tr } from "@ironfish/ui-kit"
import { FC } from "react"
import { DataRowProps } from "./types"

const DataRowLarge: FC<DataRowProps> = ({ items }) => (
  <Tr>
    {items.map((item) => item)}
  </Tr>
)

export default DataRowLarge