import Head from 'next/head';
import cx from 'classnames';
import Navbar from '@/components/core/navbar/Navbar';
import Footer from '@/components/core/footer/Footer';
import { NavbarVariants } from '@/components/core/navbar/NavbarTypes';
import styles from '@/layouts/mainLayout/MainLayout.module.scss';

interface MainLayoutProps {
   navbarVariant?: NavbarVariants;
   navbarBoxShadow?: boolean;
   fullWidth?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ navbarVariant, navbarBoxShadow, fullWidth, children }) => (
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

export default MainLayout;
