import { IronFishUIProvider } from '@ironfish/ui-kit'
import { useRouter } from 'next/router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Layout } from 'components'
import ServiceContexts from 'contexts/ServiceContexts'
import ErrorBoundary from 'components/ErrorBoundary'

import 'styles/globals.css'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  const { asPath } = useRouter()
  return (
    <QueryClientProvider client={queryClient}>
      <IronFishUIProvider>
        <ServiceContexts>
          <Layout>
            <ErrorBoundary key={asPath}>
              <Component {...pageProps} />
            </ErrorBoundary>
          </Layout>
        </ServiceContexts>
      </IronFishUIProvider>
    </QueryClientProvider>
  )
}

export default MyApp
