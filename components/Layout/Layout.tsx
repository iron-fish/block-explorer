import { FC } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'
import Navbar from './Navbar';
import Footer from './Footer';

const Layout: FC<ReactNode> = ({ children }) => {
  const router = useRouter()
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
