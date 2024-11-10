import Image from 'next/image';
import React from 'react';
import { useAccount, useDisconnect, useSwitchChain } from 'wagmi';

import { chains } from '@/lib/wagmi';

import Button from '@/components/button/button';

import PlusIcon from '~/svg/plus.svg';

import {
  ConnectButton,
  useAccountModal,
  useChainModal,
  useConnectModal,
} from '@rainbow-me/rainbowkit';

export const ConnectWalletButton = (): JSX.Element => {
  const { openChainModal } = useChainModal();
  const { openAccountModal } = useAccountModal();
  const { openConnectModal } = useConnectModal();

  const { chain, address, isConnected } = useAccount();
  const { disconnectAsync } = useDisconnect();

  const handleDisconnect = async () => {
    try {
      await disconnectAsync();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error disconnecting:', error);
    }
  };

  // Function to truncate Ethereum address
  const truncateAddress = (address: string) => {
    return address.slice(0, 6) + '...' + address.slice(-4);
  };

  return (
    <div>
      {isConnected && address ? (
        <div className='flex items-center gap-2'>
          <button
            className='bg-primary-200 flex h-[46px] w-[46px] items-center justify-center rounded-md p-1'
            onClick={openChainModal}
          >
            <Image
              src={chains.find((c) => c.id === chain?.id)?.logo ?? ''}
              alt='chain'
              width={24}
              height={24}
            />
          </button>
          <Button variant='gradient' size='lg' onClick={openAccountModal}>
            {truncateAddress(address)}
          </Button>
          {/* <ConnectButton /> */}
        </div>
      ) : (
        <Button
          variant='gradient'
          leftIcon={<PlusIcon />}
          classNames={{
            leftIcon:
              'w-[18px] h-[18px] bg-white rounded-full flex items-center justify-center',
          }}
          size='lg'
          onClick={openConnectModal}
        >
          Connect Wallet
        </Button>
      )}
    </div>
  );
};
