import { FC, useRef } from "react";
import {
  Flex,
  Box,
  ColorModeSwitcher,
  useColorMode,
  NAMED_COLORS,
  useBreakpointValue,
  Portal,
} from "@ironfish/ui-kit";

import { IronFishLogo } from "svgx";
import { NavSearch } from "components";
import NavMenu from "./NavMenu";
import NavListOfLinks from "./NavListOfLinks";

const Navbar: FC = () => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  const listOfLinksRef = useRef(null);
  const content = useBreakpointValue({
    base: <NavMenu linksListBlockRef={listOfLinksRef} />,
    lg: <NavListOfLinks />,
  });

  return (
    <Flex w="100%" position="fixed" zIndex={10} direction="column">
      <Flex
        align="center"
        w="100%"
        flexWrap="wrap"
        border="0.0625rem solid"
        p={{ base: "2.125rem 2rem 0.5rem", sm: "0rem 2rem", md: "0rem 4rem" }}
        bgColor={isDarkMode ? "#101010" : NAMED_COLORS.WHITE}
        boxShadow="0rem 0.25rem 0.6875rem rgba(0, 0, 0, 0.04)"
        borderColor={
          isDarkMode ? NAMED_COLORS.DARK_GREY : NAMED_COLORS.LIGHT_GREY
        }
      >
        <Box
          order={1}
          justifySelf="flex-start"
          flex={{ base: "0 0 50%", sm: 1 }}
          mr={{ base: 0, sm: "1.5rem" }}
        >
          <IronFishLogo />
        </Box>
        <Box
          flex={{ base: 1.5, lg: 1 }}
          order={{ base: 10, sm: 2 }}
          p="1.5rem 0rem"
        >
          <NavSearch />
        </Box>
        <Flex
          order={3}
          flex={{ base: "0 0 50%", sm: 1 }}
          justifyContent="flex-end"
          align="center"
          ml={{ base: 0, sm: "1.5rem" }}
        >
          <Box mr={{ base: "2rem", lg: 0 }}>{content}</Box>
          <ColorModeSwitcher />
        </Flex>
      </Flex>
      <Box ref={listOfLinksRef} />
    </Flex>
  );
};

export default Navbar;
