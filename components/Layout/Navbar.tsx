import { FC, useRef } from "react";
import {
  Flex,
  Box,
  ColorModeSwitcher,
  useColorModeValue,
  NAMED_COLORS,
  useBreakpointValue,
  Portal,
} from "@ironfish/ui-kit";

import { IronFishLogo } from "svgx";
import { NavSearch } from "components";
import NavMenu from "./NavMenu";
import NavListOfLinks from "./NavListOfLinks";

const Navbar: FC = () => {
  const menuRef = useRef(null);
  const colors = useColorModeValue(
    {
      bg: NAMED_COLORS.WHITE,
      border: NAMED_COLORS.LIGHT_GREY,
    },
    {
      bg: NAMED_COLORS.LIGHT_BLACK,
      border: NAMED_COLORS.DARK_GREY,
    }
  );
  const content = useBreakpointValue({
    base: (
      <NavMenu menuRef={menuRef}>
        <NavListOfLinks
          sx={{
            flexDirection: "column",
            w: "100%",
            h: "100vh",
            p: "2.5rem 0rem 2.5rem 2rem",
            fontSize: "2.3125rem",
            bgColor: colors.bg,
          }}
        />
      </NavMenu>
    ),
    lg: <NavListOfLinks sx={{ fontSize: "0.875rem" }} />,
  });

  return (
    <Flex w="100%" position="fixed" zIndex={10} direction="column">
      <Flex
        align="center"
        w="100%"
        flexWrap="wrap"
        border="0.0625rem solid"
        p={{ base: "2.125rem 2rem 0.5rem", sm: "0rem 2rem", md: "0rem 4rem" }}
        bgColor={colors.bg}
        boxShadow="0rem 0.25rem 0.6875rem rgba(0, 0, 0, 0.04)"
        borderColor={colors.border}
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
      <Box ref={menuRef} />
    </Flex>
  );
};

export default Navbar;
