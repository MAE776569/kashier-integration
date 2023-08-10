'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';

const ChakraAppProvider = ({ children }: { children: React.ReactNode }) => (
  <CacheProvider>
    <ChakraProvider resetCSS>{children}</ChakraProvider>
  </CacheProvider>
);

export default ChakraAppProvider;
