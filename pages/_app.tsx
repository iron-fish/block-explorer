import { IronFishUIProvider } from '@ironfish/ui-kit'
import { useRouter } from 'next/router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Axios from 'axios'

import { Layout } from 'components'
import ServiceContexts from 'contexts/ServiceContexts'
import ErrorBoundary from 'components/ErrorBoundary'

import 'styles/globals.css'

Axios.defaults.baseURL = '/api'
const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  const { asPath } = useRouter()
  return (
    <IronFishUIProvider>
      <QueryClientProvider client={queryClient}>
        <ServiceContexts>
          <Layout>
            <ErrorBoundary key={asPath}>
              <Component {...pageProps} />
            </ErrorBoundary>
          </Layout>
        </ServiceContexts>
      </QueryClientProvider>
    </IronFishUIProvider>
  )
}

export default MyApp
