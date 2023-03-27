import { FC, ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout: FC<{ children: ReactNode }> = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
)

export default Layout
