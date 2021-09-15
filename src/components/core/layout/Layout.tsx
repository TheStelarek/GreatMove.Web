import Head from 'next/head';
import Navbar from '../navbar/Navbar';
import styles from './Layout.module.scss';

export default function Layout({ children }: any) {
  return (
    <div className={styles.container}>
      <Head>
        <title>GreatMove - make a better lifestyle</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <Navbar />
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
