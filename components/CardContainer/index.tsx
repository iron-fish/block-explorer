import { Flex } from '@ironfish/ui-kit'

export const CardContainer = ({ children }) => (
  <Flex
    w="100%"
    wrap="wrap"
    mb="2.25rem"
    alignItems="space-between"
    justifyContent="space-between"
  >
    {children}
  </Flex>
)

export default CardContainer
