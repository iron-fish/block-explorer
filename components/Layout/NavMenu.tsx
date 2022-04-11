import { FC, useState } from "react";
import {
  Box,
  useColorModeValue,
  NAMED_COLORS,
  Portal,
  useConst,
} from "@ironfish/ui-kit";

import NavListOfLinks from "./NavListOfLinks";

interface NavMenuProps {
  menuRef: RefObject<FC | null>;
  children: ReactNode;
}

const NavMenu: FC<NavMenuProps> = ({ menuRef, children }) => {
  const colors = useColorModeValue(
    { bg: NAMED_COLORS.DEEP_BLUE },
    { bg: NAMED_COLORS.WHITE }
  );
  const burgerLineStyle = useConst({
    width: "2.0625rem",
    height: "0.1719rem",
    transition: "all .3s ease-in-out",
  });

  const [showMenu, setShowMenu] = useState<boolean>(false);
  return (
    <>
      <Box
        onClick={() => setShowMenu(!showMenu)}
        _before={{
          content: `""`,
          position: "absolute",
          ...burgerLineStyle,
          bgColor: colors.bg,
          transform: showMenu ? "rotate(45deg)" : "translateY(0.2575rem)",
        }}
        _after={{
          content: `""`,
          position: "absolute",
          ...burgerLineStyle,
          bgColor: colors.bg,
          transform: showMenu ? "rotate(-45deg)" : "translateY(-0.2575rem)",
        }}
        sx={{
          ...burgerLineStyle,
          bg: showMenu ? "transparent" : colors.bg,
        }}
      />
      <Portal containerRef={menuRef}>{showMenu ? children : null}</Portal>
    </>
  );
};

export default NavMenu;
