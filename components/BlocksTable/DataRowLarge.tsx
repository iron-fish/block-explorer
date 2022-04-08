import { Td, Tr } from "@ironfish/ui-kit"
import { FC } from "react"
import { DataRowProps } from "./types"

const DataRowLarge: FC<DataRowProps> = ({ items }) => (
  <Tr>
    {items.map((item, index) => (
      <Td key={`item-${index}`} py="1.625rem">
        {item}
      </Td>
    ))}
  </Tr>
)

export default DataRowLarge