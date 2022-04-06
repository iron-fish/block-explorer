import { FC, useEffect, useState } from "react";
import Image from "next/image";
import {
  Flex,
  Link,
  Box,
  ColorModeSwitcher,
  useColorMode,
  NAMED_COLORS,
  Center,
  useBreakpointValue,
} from "@ironfish/ui-kit";
import { OuterReferenceIcon, IronFishLogo } from "svgx";
import { SearchInput } from "components";

import styles from "./navbar.module.css";

const Navbar: FC = () => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  const useMenu = useBreakpointValue({ base: true, lg: false });
  const shortSearchPlaceHolder = "Search";
  const longSearchPlaceHolder = "Search by block height, hash or transaction";
  const placeholder = useBreakpointValue({
    base: longSearchPlaceHolder,
    sm: shortSearchPlaceHolder,
    xl: longSearchPlaceHolder,
  });
  const [showMenu, setShowMenu] = useState<boolean>(false);

  useEffect(() => {
    if (!useMenu && showMenu) {
      setShowMenu(false);
    }
  }, [useMenu, showMenu]);

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
          flex={{ base: "0.5 1 30%", sm: "0.5", lg: "1" }}
          mr="1.5rem"
        >
          <IronFishLogo />
        </Box>
        <Box
          flex={{ base: "1.5", lg: "1" }}
          order={{ base: 10, sm: 2 }}
          p="1.5rem 0rem"
        >
          <SearchInput variant="nav_search" placeholder={placeholder} />
        </Box>
        <Flex
          order={3}
          flex={{ base: "0.5 1 40%", sm: "0.5", lg: "1" }}
          justifyContent="flex-end"
          align="center"
          ml="1.5rem"
        >
          <Flex display={{ base: "none", lg: "flex" }}>
            <Link whiteSpace="nowrap" href="#" mr="2rem">
              All blocks
            </Link>
            <Link whiteSpace="nowrap" href="#" mr="2rem">
              Charts
            </Link>
            <Link whiteSpace="nowrap" href="#">
              <Flex>
                Developer Docs
                <Center ml="0.5rem">
                  <OuterReferenceIcon />
                </Center>
              </Flex>
            </Link>
          </Flex>
          <Box
            display={{ base: "block", lg: "none" }}
            onClick={() => setShowMenu(!showMenu)}
            className={`${styles.menu_btn__burger} ${
              showMenu ? styles.open : ""
            }`}
            sx={{
              _before: {
                backgroundColor: isDarkMode ? NAMED_COLORS.WHITE : NAMED_COLORS.DEEP_BLUE
              },
              _after: {
                backgroundColor: isDarkMode ? NAMED_COLORS.WHITE : NAMED_COLORS.DEEP_BLUE
              },
              backgroundColor: isDarkMode ? NAMED_COLORS.WHITE : NAMED_COLORS.DEEP_BLUE
            }}
          />
          <Box ml="2rem">
            <ColorModeSwitcher />
          </Box>
        </Flex>
      </Flex>
      <Box
        display={showMenu ? "block" : "none"}
        w="100%"
        p="2.5rem 0rem 2.5rem 2rem"
        bgColor={isDarkMode ? NAMED_COLORS.DARK_GREY : NAMED_COLORS.WHITE}
      >
        <Flex direction={"column"}>
          <Link fontSize={"2.3125rem"} href="#">
            All blocks
          </Link>
          <Link fontSize={"2.3125rem"} href="#">
            Charts
          </Link>
          <Link fontSize={"2.3125rem"} href="#">
            <Flex>
              Developer Docs
              <Center ml="0.5rem">
                <OuterReferenceIcon />
              </Center>
            </Flex>
          </Link>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Navbar;
