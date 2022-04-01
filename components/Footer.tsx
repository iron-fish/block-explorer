import { FC } from "react";
import Image from "next/image";
import { Flex, Box, Input, Link, VStack, HStack, Button } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";

const Footer: FC = () => {
  return (
    <Box
      w="100%"
      h="320px"
      bgColor="white"
      sx={{
        borderTop: "1px solid #E1E1E1",
        padding: "64px 123px 0px 123px",
      }}
    >
      <Flex direction="column" >
        <Flex justify="space-between" w="100%" mb="64px" >
          <Flex direction={'column'}>
            <Box mb="19px">
              <Image
                width={164}
                height={18}
                src="/images/logo.png"
                alt="Iron Fish Logo"
              />
            </Box>
            <div style={{ fontSize: 11, width: 210, inlineSize: 185 }}>
              Iron Fish is a novel cryptocurrency focused on privacy and
              accessibility
            </div>
          </Flex>
          <VStack spacing={'8px'} align="baseline">
            <Link fontSize="20px" mb='2px'>Company</Link>
            <Link fontSize="16px" >About us</Link>
            <Link fontSize="16px" >Careers</Link>
            <Link fontSize="16px" >Blog</Link>
          </VStack>
          <VStack spacing={'8px'} align="baseline">
            <Link fontSize="20px" mb="2px">Product</Link>
            <Link fontSize="16px">Block Explorer</Link>
            <Link fontSize="16px">Whitepaper</Link>
            <Link fontSize="16px">FAQ</Link>
          </VStack>
          <Button>Drop us a line!</Button>
        </Flex>
        <Flex align={'center'} h="65px" w="100%" borderTop={"1px solid #E1E1E1"}>
          <span style={{ fontSize: "12px", paddingLeft: 13 }}>
            2021 Iron Fish. All rights reserved.
          </span>
          <HStack ml="auto" spacing={'22px'}>
            <InfoIcon />
            <InfoIcon />
            <InfoIcon />
            <InfoIcon />
            <InfoIcon />
          </HStack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
