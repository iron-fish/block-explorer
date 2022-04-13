import { FC, RefObject, ReactNode, useState } from "react";
import { Box, useColorModeValue, NAMED_COLORS, Portal } from "@ironfish/ui-kit";

import NavListOfLinks from "./NavListOfLinks";

const burgerLineStyle = {
  width: "2.0625rem",
  height: "0.1719rem",
  transition: "all .3s ease-in-out",
};

interface NavMenuProps {
  menuRef: RefObject<HTMLElement>;
  children: ReactNode;
}

const NavMenu: FC<NavMenuProps> = ({ menuRef, children }) => {
  const background = useColorModeValue(
    NAMED_COLORS.DEEP_BLUE,
    NAMED_COLORS.WHITE
  );

  const [showMenu, setShowMenu] = useState<boolean>(false);
  return (
    <>
      <Box
        onClick={() => setShowMenu(!showMenu)}
        _before={{
          content: `""`,
          position: "absolute",
          ...burgerLineStyle,
          bgColor: background,
          transform: showMenu ? "rotate(45deg)" : "translateY(0.2575rem)",
        }}
        _after={{
          content: `""`,
          position: "absolute",
          ...burgerLineStyle,
          bgColor: background,
          transform: showMenu ? "rotate(-45deg)" : "translateY(-0.2575rem)",
        }}
        sx={{
          ...burgerLineStyle,
          bg: showMenu ? "transparent" : background,
        }}
      />
      <Portal containerRef={menuRef}>{showMenu ? children : null}</Portal>
    </>
  );
};

export default NavMenu;
