import { http, createConfig } from 'wagmi';
import { pwrlabs } from '@/constant/chains/pwrLabs';
import { bob } from '@/constant/chains/BOB';
import { merlin } from '@/constant/chains/Merlin';
import { bevm } from '@/constant/chains/BEVM';
import { rsk } from '@/constant/chains/RSK';
import { core } from '@/constant/chains/Core';
import { bitlayer } from '@/constant/chains/Bitlayer';

import '@rainbow-me/rainbowkit/styles.css';

import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  rainbowWallet,
  walletConnectWallet,
  coinbaseWallet,
  gateWallet,
  metaMaskWallet,
  okxWallet,
  bitgetWallet,
  binanceWallet 
} from '@rainbow-me/rainbowkit/wallets';

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error('Project ID is not defined');

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [
        metaMaskWallet,
        gateWallet,
        okxWallet,
        binanceWallet,
        bitgetWallet,
        rainbowWallet,
        walletConnectWallet,
        coinbaseWallet,
      ],
    },
  ],
  {
    appName: 'My RainbowKit App',
    projectId: 'YOUR_PROJECT_ID',
  }
);

export const config = createConfig({
  connectors,
  chains: [merlin, core, bitlayer],
  transports: {
    [merlin.id]: http(),
    [core.id]: http(),
    [bitlayer.id]: http(),
  },
  ssr: true,
});

export const metadata = {
  name: 'BQ Labs',
  description: 'AppKit Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};
