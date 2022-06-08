import { Tr } from '@ironfish/ui-kit'
import { FC } from 'react'
import { DataRowProps } from './types'

const DataRowLarge: FC<DataRowProps> = ({ children, onClick }) => (
  <Tr onClick={onClick} cursor={onClick ? 'pointer' : 'default'}>
    {children}
  </Tr>
)

export default DataRowLarge
