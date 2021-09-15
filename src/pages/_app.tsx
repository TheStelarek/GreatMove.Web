import { AppProps } from 'next/app';
import { useState } from 'react';
import Layout from '../components/core/layout/Layout';
import '../styles/global.scss';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return isAuthenticated ? (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  ) : (
    <Component {...pageProps} />
  );
}
