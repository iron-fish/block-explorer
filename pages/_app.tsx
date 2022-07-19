import { IronFishUIProvider } from '@ironfish/ui-kit'

import { Layout } from 'components'
import ServiceContexts from 'contexts/ServiceContexts'
import ErrorBoundary from 'components/ErrorBoundary'

import 'styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <IronFishUIProvider>
      <ServiceContexts>
        <Layout>
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
        </Layout>
      </ServiceContexts>
    </IronFishUIProvider>
  )
}

export default MyApp
