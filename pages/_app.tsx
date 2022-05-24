import { IronFishUIProvider } from '@ironfish/ui-kit'
import { appWithTranslation } from 'next-i18next'

import i18n from '../next-i18next.config'

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

export default appWithTranslation(MyApp, i18n)
