import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { cookieStorage, createStorage } from 'wagmi';

import { bob } from '@/constant/chains/BOB';
import { merlin } from '@/constant/chains/Merlin';
import { pwrlabs } from '@/constant/chains/pwrLabs';
import { Chain } from 'viem';
import { bevm } from '@/constant/chains/BEVM';
import { rsk } from '@/constant/chains/RSK';
import { core } from '@/constant/chains/Core';
import { bitlayer } from '@/constant/chains/Bitlayer';

export type ChainType = Chain & {
  logo: string;
  chainNickName: string;
  faucet: string;
};

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error('Project ID is not defined');

export const metadata = {
  name: 'BQ Labs',
  description: 'AppKit Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

export const chains = [merlin, core, bitlayer] as const;
