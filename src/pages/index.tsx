import Head from 'next/head';
import { ReactElement } from 'react';
import MainLayout from '@/layouts/mainLayout/MainLayout';

export default function Home() {
   return (
      <div>
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
   return <MainLayout>{page}</MainLayout>;
};
