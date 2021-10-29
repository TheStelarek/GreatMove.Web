import Head from 'next/head';
import cx from 'classnames';
import Navbar from '@/components/core/navbar/Navbar';
import Footer from '@/components/core/footer/Footer';
import { NavbarVariants } from '@/components/core/navbar/NavbarTypes';
import styles from './Layout.module.scss';

interface LayoutProps {
   navbarVariant?: NavbarVariants;
   navbarBoxShadow?: boolean;
   fullWidth?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ navbarVariant, navbarBoxShadow, fullWidth, children }) => (
   <div className={styles.container}>
      <Head>
         <title>GreatMove - make a better lifestyle</title>
         <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
         <Navbar variant={navbarVariant} boxShadow={navbarBoxShadow} />
      </header>
      <main className={cx(styles.main, fullWidth && styles.mainFullWidth)}>{children}</main>
      <Footer />
   </div>
);

export default Layout;
