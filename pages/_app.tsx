import { IronFishUIProvider } from '@ironfish/ui-kit'
import { useRouter } from 'next/router'

import { Layout } from 'components'
import ServiceContexts from 'contexts/ServiceContexts'
import ErrorBoundary from 'components/ErrorBoundary'

import 'styles/globals.css'

function MyApp({ Component, pageProps }) {
  const { asPath } = useRouter()
  return (
    <IronFishUIProvider>
      <ServiceContexts>
        <Layout>
          <ErrorBoundary key={asPath}>
            <Component {...pageProps} />
          </ErrorBoundary>
        </Layout>
      </ServiceContexts>
    </IronFishUIProvider>
  )
}

export default MyApp
