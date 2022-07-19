import { IronFishUIProvider } from '@ironfish/ui-kit'

import { Layout } from 'components'
import ServiceContexts from 'contexts/ServiceContexts'
import ErrorBoundary from 'components/ErrorBoundary'
import Error from 'pages/_error'

import 'styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <IronFishUIProvider>
      <ServiceContexts>
        <Layout>
          <ErrorBoundary FallbackComponent={Error}>
            <Component {...pageProps} />
          </ErrorBoundary>
        </Layout>
      </ServiceContexts>
    </IronFishUIProvider>
  )
}

export default MyApp
