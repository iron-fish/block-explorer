import { FC, ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Box } from '@ironfish/ui-kit'

const Layout: FC<{ children: ReactNode }> = ({ children }) => (
  <>
    <Navbar />
    <main style={{ width: '100%', height: '100%' }}>
      <Box
        maxW={{ base: '59.625rem', xl: 'max-content' }}
        marginY="0px"
        marginX={{ base: '2rem', lg: 'auto', xl: '15%' }}
      >
        {children}
      </Box>
    </main>
    <Footer />
  </>
)

export default Layout
