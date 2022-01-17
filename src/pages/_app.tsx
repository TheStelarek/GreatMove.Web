import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import Router from 'next/router';
import React from 'react';
import NProgress from 'nprogress';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/index';
import AuthGuard from '@/components/authGuard/AuthGuard';
import { NextApplicationPage } from '@/utils/types/NextApplicationPage';
import setupInterceptors from '@/api/setup';
import '@/styles/global.scss';
import '@/styles/nprogress.scss';

NProgress.configure({ showSpinner: false });
Router.events.on(`routeChangeStart`, NProgress.start);
Router.events.on(`routeChangeError`, NProgress.done);
Router.events.on(`routeChangeComplete`, NProgress.done);

type AppPropsWithLayout = AppProps & {
   Component: NextApplicationPage;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
   const getLayout = Component.getLayout ?? ((page) => page);

   return (
      <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
            {Component.requireAuth ? (
               <AuthGuard>{getLayout(<Component {...pageProps} />)}</AuthGuard>
            ) : (
               getLayout(<Component {...pageProps} />)
            )}
         </PersistGate>
      </Provider>
   );
}

setupInterceptors(store);
