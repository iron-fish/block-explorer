import { IronFishUIProvider } from "@ironfish/ui-kit"
import { Global } from "@emotion/react"

import { Layout } from "components"
import ServiceContexts from "contexts/ServiceContexts"

import "styles/globals.css"
// import "@ironfish/ui-kit/font/style.css"

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
