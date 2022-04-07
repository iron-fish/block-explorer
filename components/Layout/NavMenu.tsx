import { FC, useState } from "react";
import {
  Box,
  useColorMode,
  NAMED_COLORS,
  useBreakpointValue,
  Portal,
} from "@ironfish/ui-kit";

import NavListOfLinks from "./NavListOfLinks";
import styles from "./navMenu.module.scss";

interface NavMenuProps {
  linksListBlockRef: RefObject<FC | null>
}

const NavMenu: FC<NavMenuProps> = ({ linksListBlockRef }) => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <>
      <Box
        onClick={() => setShowMenu(!showMenu)}
        className={`${styles.menu_btn__burger} ${showMenu ? styles.open : ""}`}
        sx={{
          _before: {
            backgroundColor: isDarkMode
              ? NAMED_COLORS.WHITE
              : NAMED_COLORS.DEEP_BLUE,
          },
          _after: {
            backgroundColor: isDarkMode
              ? NAMED_COLORS.WHITE
              : NAMED_COLORS.DEEP_BLUE,
          },
          backgroundColor: isDarkMode
            ? NAMED_COLORS.WHITE
            : NAMED_COLORS.DEEP_BLUE,
        }}
      />
      <Portal containerRef={linksListBlockRef}>
        {showMenu ? <NavListOfLinks /> : null}
      </Portal>
    </>
  );
};

export default NavMenu;
