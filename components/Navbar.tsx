import { FC } from "react";
import Image from "next/image";
import { Flex, Input, Link } from "@chakra-ui/react";
import { ExternalLinkIcon, MoonIcon } from "@chakra-ui/icons";

const Navbar: FC = () => {
  return (
    <Flex
      align="center"
      w="100%"
      h="95px"
      bgColor={"white"}
      sx={{
        border: "1px solid #DEDFE2",
        boxShadow: "0px 4px 11px rgba(0, 0, 0, 0.04)",
        padding: "0px 64px",
        position: "fixed",
      }}
    >
      <Image
        width={164}
        height={18}
        src="/images/logo.png"
        alt="Iron Fish Logo"
      />
      <Input w={"426px"} h={"46px"} size="md" ml="auto" />
      <Flex ml="auto" justify="space-between">
        <Link href="#" mr="32px">
          All blocks
        </Link>
        <Link href="#" mr="32px">
          Charts
        </Link>
        <Link href="#" mr="32px">
          Developer Docs <ExternalLinkIcon />
        </Link>
      </Flex>
      <MoonIcon />
    </Flex>
  );
};

export default Navbar;
