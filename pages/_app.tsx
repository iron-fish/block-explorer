import { IronFishUIProvider } from '@ironfish/ui-kit'
import { useRouter } from 'next/router'

import { Layout } from 'components'
import ServiceContexts from 'contexts/ServiceContexts'
import ErrorBoundary from 'components/ErrorBoundary'

import 'styles/globals.css'

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter()
  return (
    <IronFishUIProvider>
      <ServiceContexts>
        <Layout>
          <ErrorBoundary key={pathname}>
            <Component {...pageProps} />
          </ErrorBoundary>
        </Layout>
      </ServiceContexts>
    </IronFishUIProvider>
  )
}

export default MyApp
