import { IronFishUIProvider } from '@ironfish/ui-kit'

import { Layout } from 'components'
import ServiceContexts from 'contexts/ServiceContexts'

import 'styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <IronFishUIProvider>
      <ServiceContexts>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ServiceContexts>
    </IronFishUIProvider>
  )
}

export default MyApp
