import Head from 'next/head';
import Navbar from '@/components/core/navbar/Navbar';
import Footer from '@/components/core/footer/Footer';
import styles from './Layout.module.scss';

interface LayoutProps {
  whiteNavbar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ whiteNavbar, children }) => (
  <div className={styles.container}>
    <Head>
      <title>GreatMove - make a better lifestyle</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <header className={styles.header}>
      <Navbar whiteNavbar={whiteNavbar} />
    </header>
    <main className={styles.main}>{children}</main>
    <Footer />
  </div>
);

export default Layout;
