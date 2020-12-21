import dynamic from 'next/dynamic';
import 'nprogress/nprogress.css';
import { AuthProvider } from '../context/auth';
import { ChakraProvider } from '@chakra-ui/react';

const Progress = dynamic(
  () => {
    return import('../components/Progress');
  },
  { ssr: false }
);

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Progress />
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
