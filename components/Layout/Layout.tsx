import { FC, ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Box } from '@ironfish/ui-kit'

const Layout: FC<{ children: ReactNode }> = ({ children }) => (
  <>
    <Navbar />
    <main style={{ width: '100%', height: '100%' }}>
      <Box
        maxW="59.625rem"
        marginY="0px"
        minW={{ base: 'auto', lg: '59.625rem' }}
        marginX={{ base: '2rem', lg: 'auto' }}
      >
        {children}
      </Box>
    </main>
    <Footer />
  </>
)

export default Layout
