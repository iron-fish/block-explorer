import { IronFishUIProvider } from '@ironfish/ui-kit'

function MyApp({ Component, pageProps }) {
  return (
    <IronFishUIProvider>
      <Component {...pageProps} />
    </IronFishUIProvider>
  )
}

export default MyApp
