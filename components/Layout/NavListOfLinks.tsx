import { FC } from "react";
import {
  Flex,
  Link,
  useColorMode,
  NAMED_COLORS,
  Center,
  useBreakpointValue,
} from "@ironfish/ui-kit";
import { OuterReferenceIcon } from "svgx";

const NavListOfLinks: FC = () => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  const style = useBreakpointValue({
    base: {
      link: {
        fontSize: "2.3125rem",
      },
      container: {
        display: { base: "flex", lg: "none" },
        flexDirection: "column",
        w: "100%",
        p: "2.5rem 0rem 2.5rem 2rem",
        bgColor: isDarkMode ? NAMED_COLORS.DARK_GREY : NAMED_COLORS.WHITE,
      },
    },
    lg: {
      link: {
        fontSize: "0.875rem",
        mr: "2rem",
        whiteSpace: "nowrap",
      },
      container: {
        display: { base: "none", lg: "flex" },
      },
    },
  });

  return (
    <Flex sx={style.container}>
      <Link sx={style.link} href="#">
        All blocks
      </Link>
      <Link sx={style.link} href="#">
        Charts
      </Link>
      <Link sx={style.link} href="#">
        <Flex>
          Developer Docs
          <Center ml="0.5rem">
            <OuterReferenceIcon />
          </Center>
        </Flex>
      </Link>
    </Flex>
  );
};

export default NavListOfLinks;
