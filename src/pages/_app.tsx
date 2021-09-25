import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/index';
import AuthGuard from '@/components/authGuard/AuthGuard';
import '@/styles/global.scss';
import { NextApplicationPage } from '@/utils/types/NextApplicationPage';

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
