import { FC } from "react";
import { Box, StyleProps } from "@ironfish/ui-kit";

const RowItemWrapperSmall: FC<StyleProps> = ({ children, ...rest }) => (
  <Box px="2rem" py="1rem" {...rest}>
    {children}
  </Box>
)

export default RowItemWrapperSmall
