import { FC } from "react";
import { Box, Flex, Th } from "@ironfish/ui-kit";

import { RowItemProps } from "./types";

const RowItem: FC<RowItemProps> = ({
  label = null,
  children,
  ...rest
}) => (
  <Flex direction="column" {...rest}>
    <Box
      display={{ base: 'block', lg: 'none' }}
    >
      <Th p={0}>
        {label}
      </Th>
    </Box>
    <Flex
      alignItems="center"
      minH="1.875rem"
      sx={{
        fontSize: '1rem',
        fontStyle: 'normal',
        lineHeight: '1.625rem',
        fontWeight: '400',
        fontFamily: 'ABC Favorit Trial',
      }}
    >
      {children}
    </Flex>
  </Flex>
)

export default RowItem
