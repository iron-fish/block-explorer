import { Grid } from '@ironfish/ui-kit'

export const CardContainer = ({ children }) => (
  <Grid
    w="calc(100% - 0.2rem)"
    templateColumns="repeat(auto-fit, minmax(19rem, 1fr))"
    mb="2.25rem"
    autoRows="7.75rem"
    gap="1.25rem"
  >
    {children}
  </Grid>
)

export default CardContainer
