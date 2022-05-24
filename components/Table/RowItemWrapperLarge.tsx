import { FC } from 'react'
import { StyleProps, Td } from '@ironfish/ui-kit'

const RowItemWrapperLarge: FC<StyleProps> = ({ children, ...rest }) => (
  <Td py="1.625rem" {...rest}>
    {children}
  </Td>
)

export default RowItemWrapperLarge
