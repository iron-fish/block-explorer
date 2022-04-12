import { IronFishUIProvider } from '@ironfish/ui-kit'
import Contexts from 'contexts/Contexts'

import 'styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <IronFishUIProvider>
      <Contexts>
        <Component {...pageProps} />
      </Contexts>
    </IronFishUIProvider>
  )
}

export default MyApp
