import { FC, ReactNode } from "react";

import {
  Flex,
  Box,
  HStack,
  Button,
  Center,
  NAMED_COLORS,
  Text,
  useColorModeValue,
  useBreakpointValue,
} from "@ironfish/ui-kit";
import BorderBox from "components/BorderBox";

interface ChartBoxProps {
  header: string;
  average: string | number;
  children: ReactNode;
}

const ChartBox: FC<ChartBoxProps> = ({
  header,
  average,
  children,
}) => {
  return (
    <BorderBox >
      <h4>{header}</h4>
      <h5>Daily Average: {average}</h5>
      {children}
    </BorderBox>
  );
};

export default ChartBox;
