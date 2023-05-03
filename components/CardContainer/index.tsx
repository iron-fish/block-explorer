import { Grid } from '@ironfish/ui-kit'

export const CardContainer = ({ children }) => (
  <Grid
    w="calc(100% - 0.2rem)"
    templateColumns={{
      base: 'repeat(auto-fit, minmax(19rem, 1fr))',
      lg: 'repeat(3, minmax(19rem, 1fr))',
    }}
    mb="2.25rem"
    autoRows="minmax(7.75rem, auto)"
    gap="1.25rem"
    gridAutoFlow="dense"
  >
    {children}
  </Grid>
)

export default CardContainer
