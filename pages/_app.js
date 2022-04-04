import '../styles/globals.css'
import { Layout } from 'components'
import { IronFishUIProvider } from '@ironfish/ui-kit'

function MyApp({ Component, pageProps }) {
  return (
    <IronFishUIProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </IronFishUIProvider>
  )
}

export default MyApp
