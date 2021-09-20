import { AppProps } from 'next/app';
import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/index';
import Layout from '../components/core/layout/Layout';
import '../styles/global.scss';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return isAuthenticated ? (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  ) : (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
