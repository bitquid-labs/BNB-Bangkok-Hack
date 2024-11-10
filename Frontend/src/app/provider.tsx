'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';
import { WagmiProvider } from 'wagmi';

import { config } from '@/lib/config';
import { metadata, projectId } from '@/lib/wagmi';

import WithSession from '@/components/withSession';

import { ClaimProvider } from '@/contexts/ClaimContext';
import { CoverProvider } from '@/contexts/CoverContext';

import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';

const queryClient = new QueryClient();

if (!projectId) throw new Error('Project ID is not defined');

function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiProvider config={config}>
      <CoverProvider>
        <ClaimProvider>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider theme={darkTheme()}>
              {/* Your App */}
              {mounted && children}
            </RainbowKitProvider>
          </QueryClientProvider>
        </ClaimProvider>
      </CoverProvider>
    </WagmiProvider>
  );
}

export default WithSession(Providers);
