import Image from 'next/image'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Flex, Box, HStack, Button, Center } from "@chakra-ui/react";
import Table from '../components/Table'

const tmpCardStyle = {
  height: 120,
  width: 303,
  backgroundColor: 'white',
  border: "1px solid gray",
  borderRadius: "5px",
  boxShadow: "6px 6px 0px -1px white, 6px 6px gray",
}

export default function Home() {
  return (
    <main style={{ width: '100%', height: '100%' }}>
      <Flex sx={{
        height: 540,
        width: '100%',
        backgroundColor: '#1b006a',
        backgroundImage: `url('/images/home_page_logo_purple.png')`,
        backgroundRepeat: 'no-repeat',
        backgroundPositionX: 'right',
        position: 'absolute',
        zIndex: -1,
        marginTop: 95,
      }} />
      <Flex justify={'center'} pt="215px" pb="96px" >
        <Box minW={'960px'} mr="15%" ml="15%" w="100%" >
          <Flex direction={'column'} mb="85px">
            <span style={{ fontSize: 52, color: 'white', inlineSize: 365, whiteSpace: 'nowrap', marginBottom: 18 }}>Welcome to the<wbr /> Iron Fish Block Explorer</span>
            <span style={{ fontSize: 24, color: 'white', marginBottom: 36 }}>Blockchain statistics for $IRON</span>
            <HStack>
              <Button>View All Blocks</Button>
              <Button>View Chain Explorer</Button>
            </HStack>
          </Flex>
          <Box mb={'36px'}>
            <Flex justify={'space-between'} mb={'23px'}>
              <div id="card1" style={tmpCardStyle}></div>
              <div id="card2" style={tmpCardStyle}></div>
              <div id="card3" style={tmpCardStyle}></div>
            </Flex>
            <Flex justify={'space-between'}>
              <div id="card4" style={tmpCardStyle}></div>
              <div id="card5" style={tmpCardStyle}></div>
              <div id="card6" style={tmpCardStyle}></div>
            </Flex>
          </Box>
          <Button mb={'96px'}>View All Charts</Button>
          <Flex direction={'column'} mb={'32px'}>
            <span style={{ fontSize: 24, marginBottom: 10 }}>Latest Blocks</span>
            <Table />
          </Flex>
          <Center>
            <Button >View All Blocks</Button>
          </Center>
        </Box>
      </Flex>
    </main>
  )
}
