import Head from 'next/head';
import { ReactElement, useEffect } from 'react';
import router from 'next/router';
import MainLayout from '@/layouts/mainLayout/MainLayout';

const Home = () => {
   useEffect(() => {
      router.push(`/recipes`);
   }, []);

   return (
      <div>
         <Head>
            <title>GreatMove - app for better lifestyle.</title>
            <meta name="description" content="Recipes, traning plans and many others" />
            <link rel="icon" href="/favicon.ico" />
         </Head>
      </div>
   );
};

export default Home;

Home.getLayout = function getLayout(page: ReactElement) {
   return <MainLayout>{page}</MainLayout>;
};
