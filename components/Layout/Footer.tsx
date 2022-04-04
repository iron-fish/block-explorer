import { FC } from "react";
import Image from "next/image";
import {
  Flex,
  Box,
  Input,
  Link,
  VStack,
  HStack,
  Button,
  useColorMode,
  NAMED_COLORS,
} from "@ironfish/ui-kit";
import {
  TelegramIcon,
  GitHubIcon,
  RedditIcon,
  DiscordIcon,
  TwitterIcon,
  IronFishLogo,
} from "svgx";

const Footer: FC = () => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";

  return (
    <Box
      w="100%"
      h="20rem"
      bgColor={isDarkMode ? "#101010" : NAMED_COLORS.WHITE}
      borderTop="0.0625rem solid"
      borderColor={isDarkMode ? NAMED_COLORS.DARK_GREY : "#E1E1E1"}
      p="64px 7.6875rem 0rem 7.6875rem"
    >
      <Flex direction="column">
        <Flex justify="space-between" w="100%" mb="4rem">
          <Flex direction={"column"}>
            <Box mb="1.1875rem">
              <IronFishLogo />
            </Box>
            <div style={{ fontSize: "0.6875rem", width: "13.125rem", inlineSize: "11.5625rem" }}>
              Iron Fish is a novel cryptocurrency focused on privacy and
              accessibility
            </div>
          </Flex>
          <VStack spacing="0.5rem" align="baseline">
            <Link variant="text_link" fontSize="1.25rem" mb="0.125rem">
              Company
            </Link>
            <Link variant="text_link" fontSize="1rem">
              About us
            </Link>
            <Link variant="text_link" fontSize="1rem">
              Careers
            </Link>
            <Link variant="text_link" fontSize="1rem">
              Blog
            </Link>
          </VStack>
          <VStack spacing="0.5rem" align="baseline">
            <Link fontSize="1.25rem" mb="0.125rem">
              Product
            </Link>
            <Link fontSize="1rem">Block Explorer</Link>
            <Link fontSize="1rem">Whitepaper</Link>
            <Link fontSize="1rem">FAQ</Link>
          </VStack>
          <Button variant="secondary" size="medium">
            Drop us a line!
          </Button>
        </Flex>
        <Flex
          align={"center"}
          h="4.0625rem"
          w="100%"
          borderTop="0.0625rem solid"
          borderColor={isDarkMode ? NAMED_COLORS.DARK_GREY : "#E1E1E1"}
          color={isDarkMode ? NAMED_COLORS.PALE_GREY : NAMED_COLORS.DEEP_BLUE}
        >
          <span style={{ fontSize: "0.75rem", paddingLeft: '0.8125rem' }}>
            2021 Iron Fish. All rights reserved.
          </span>
          <HStack ml="auto" spacing={"1.375rem"}>
            <TelegramIcon />
            <GitHubIcon />
            <RedditIcon />
            <TwitterIcon />
            <DiscordIcon />
          </HStack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
