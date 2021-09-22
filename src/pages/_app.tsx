import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { NextPage } from 'next';
import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/index';
import Layout from '@/components/core/layout/Layout';
import AuthGuard from '@/components/authGuard/AuthGuard';
import '@/styles/global.scss';

export type NextApplicationPage<P = any, IP = P> = NextPage<P, IP> & {
  requireAuth?: boolean;
};

export default function MyApp(props: AppProps) {
  const {
    Component,
    pageProps,
  }: { Component: NextApplicationPage; pageProps: any } = props;

  return (
    <>
      {Component.requireAuth ? (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AuthGuard>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </AuthGuard>
          </PersistGate>
        </Provider>
      ) : (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
      )}
    </>
  );
}
