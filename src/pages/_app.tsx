import { AppProps } from 'next/app';
import Layout from '../components/core/layout/Layout';
import '../styles/global.scss';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
