import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { NextPage } from 'next';
import React, { ReactElement, ReactNode } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/index';
import AuthGuard from '@/components/authGuard/AuthGuard';
import '@/styles/global.scss';

export type NextApplicationPage<P = any, IP = P> = NextPage<P, IP> & {
  requireAuth?: boolean;
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextApplicationPage;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      {Component.requireAuth ? (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AuthGuard>{getLayout(<Component {...pageProps} />)}</AuthGuard>
          </PersistGate>
        </Provider>
      ) : (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {getLayout(<Component {...pageProps} />)}
          </PersistGate>
        </Provider>
      )}
    </>
  );
}
