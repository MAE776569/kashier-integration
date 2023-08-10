import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ChakraAppProvider from './providers/chakra.provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'online store',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={inter.className}>
        <ChakraAppProvider>{children}</ChakraAppProvider>
      </body>
    </html>
  );
}
