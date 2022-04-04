import { FC } from 'react';
import Image from 'next/image';
import {
  Flex,
  Link,
  Box,
  ColorModeSwitcher,
  useColorMode,
  NAMED_COLORS,
  Center,
  HStack,
} from '@ironfish/ui-kit';
import { OuterReferenceIcon, IronFishLogo } from 'svgx';
import { SearchInput } from 'components';

const Navbar: FC = () => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";

  return (
    <Flex
      align="center"
      w="100%"
      h="5.9375rem"
      bgColor={isDarkMode ? NAMED_COLORS.DARK_GREY : NAMED_COLORS.WHITE}
      p="0rem 4rem"
      position="fixed"
      border="0.0625rem solid"
      borderColor={
        isDarkMode ? NAMED_COLORS.DARK_GREY : NAMED_COLORS.LIGHT_GREY
      }
      boxShadow="0rem 0.25rem 0.6875rem rgba(0, 0, 0, 0.04)"
      zIndex={1}
    >
      <IronFishLogo />
      <Box w="26.625rem" h="2.875rem" ml="auto">
        <SearchInput
          variant="nav_search"
          placeholder="Search by block height, hash or transaction"
        />
      </Box>
      <Flex ml="auto" justify="space-between">
        <Link variant="text_link" href="#" mr="2rem">
          All blocks
        </Link>
        <Link variant="text_link" href="#" mr="2rem">
          Charts
        </Link>
        <Link variant="text_link" href="#" mr="2rem">
          <Flex>
            Developer Docs
            <Center ml="0.5rem">
              <OuterReferenceIcon />
            </Center>
          </Flex>
        </Link>
      </Flex>
      <ColorModeSwitcher />
    </Flex>
  );
};

export default Navbar;
