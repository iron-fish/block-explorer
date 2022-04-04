import { FC } from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout: FC<ReactNode> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Iron Fish</title>
      </Head>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
