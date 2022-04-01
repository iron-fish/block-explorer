import '../styles/globals.css'
import Layout from 'components/Layout'
import { ChakraProvider } from '@chakra-ui/react'
// import { IronFishUIProvider } from '@ironfish/ui-kit/dist/components'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}

export default MyApp
