import { Tr } from '@ironfish/ui-kit'
import { FC } from 'react'
import { DataRowProps } from './types'

const DataRowLarge: FC<DataRowProps> = ({ items, onClick }) => (
  <Tr onClick={onClick} cursor={onClick ? 'pointer' : 'default'}>
    {items.map(item => item)}
  </Tr>
)

export default DataRowLarge
