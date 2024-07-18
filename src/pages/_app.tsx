
import { AppProps } from 'next/app';
import '../styles/globals.css';
import "@/styles/sign.css"
import '@/styles/loading.css'
import '@/styles/plan.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
