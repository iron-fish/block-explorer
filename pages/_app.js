import { IronFishUIProvider } from '@ironfish/ui-kit'

import { Layout } from 'components'
import Contexts from 'contexts/Contexts'

import 'styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <IronFishUIProvider>
      <Contexts>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Contexts>
    </IronFishUIProvider>
  )
}

export default MyApp
