import Head from 'next/head';
import { ReactElement } from 'react';
import styles from '@/styles/Home.module.scss';
import Layout from '@/components/core/layout/Layout';

export default function Home() {
   return (
      <div className={styles.container}>
         <Head>
            <title>TypeScript starter for Next.js</title>
            <meta
               name="description"
               content="TypeScript starter for Next.js that includes all you need to build amazing apps"
            />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <div>Hello world 123</div>
      </div>
   );
}

Home.getLayout = function getLayout(page: ReactElement) {
   return <Layout>{page}</Layout>;
};
