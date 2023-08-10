'use client';

import { Box } from '@chakra-ui/react';

interface IMainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: IMainLayoutProps) => (
  <Box as='main' minH='100vh' bg='#f6f9fc'>
    {children}
  </Box>
);

export default MainLayout;
