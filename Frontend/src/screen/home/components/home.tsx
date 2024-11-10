import React from 'react';
import { useAccount, useDisconnect, useWriteContract } from 'wagmi';

import Button from '@/components/button/button';

import Grid from '~/svg/grid.svg';
import AboutSectionImage from '~/images/home/locker-dynamic-premium.svg';
import BQTokenSectionImage from '~/images/home/star.svg';
import BTCPSectionImage from '~/images/home/shield.svg';
import { useRouter } from 'next/navigation';
import { ChainType } from '@/lib/wagmi';
import { toast } from 'react-toastify';
import { parseUnits } from 'viem';
import { BQBTCTokenContract } from '@/constant/contracts';
import { useAddToken } from '@/hooks/contracts/governance/useAddBQBTCToken';
import { useConnectModal } from '@rainbow-me/rainbowkit';

export const HomeScreen = (): JSX.Element => {
  const { openConnectModal } = useConnectModal();
  const { address, isConnecting, isConnected, isDisconnected, chain } =
    useAccount();
  const { disconnectAsync } = useDisconnect();
  const router = useRouter();
  const handleDisconnect = () => {
    try {
      disconnectAsync();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error disconnecting:', error);
    }
  };

  const {checkAndAddToken} = useAddToken();

  const {
    data: hash,
    isPending,
    writeContractAsync,
  } = useWriteContract({
    mutation: {
      async onSuccess() {
        console.log(1);
      },
      onError(error: any) {
        console.log(1, error);
      },
    },
  });

  const requestMintBQBTC = async (amount: number) => {
    if (!isConnected) {
      toast.error('Please connect your wallet first!');
      return;
    }
    const params = [`${address}`, parseUnits(amount.toString(), 18)];

    try {
      await writeContractAsync({
        abi: BQBTCTokenContract.abi,
        address:
          BQBTCTokenContract.addresses[(chain as ChainType)?.chainNickName],
        functionName: 'mint',
        args: params,
      });
      toast.success('Faucet Sent!');
    } catch (err) {
      let errorMsg = '';
      if (err instanceof Error) {
        if (err.message.includes('User denied transaction signature')) {
          errorMsg = 'User denied transaction signature';
        }
      }
      toast.error(errorMsg);
    }
  };

  const handleAddNetworkAndToken = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first!');
      return;
    }
    try {
      await checkAndAddToken(); // Then add the token
      requestMintBQBTC(100);
    } catch (err) {
      let errorMsg = '';
      if (err instanceof Error) {
        if (err.message.includes('User denied transaction signature')) {
          errorMsg = 'User denied transaction signature';
        }
      }
      toast.error(errorMsg);
    }
  };

  return (
    <section className='flex h-full flex-auto flex-col'>
      <div className='layout mb-[100px] flex flex-auto flex-col items-center justify-center gap-[70px]'>
        <div className='z-100 mt-[50px] flex w-full max-w-[742px] flex-col items-center gap-10'>
          <div className='flex flex-col items-center text-[60px] font-bold leading-[80px]'>
            <div>Bitcoin Risk</div>
            <div>Management Layer</div>
          </div>

          {openConnectModal ? (
            <div className='z-50' onClick={openConnectModal}>
              <Button
                variant='primary'
                size='lg'
                className=' min-w-[216px] rounded-sm bg-gradient-to-r from-[#00ECBC] to-[#005746]'
              >
                Connect Wallet
              </Button>
            </div>
          ) : (
          <div className='z-50' onClick={handleDisconnect}>
              <Button
                variant='primary'
                size='lg'
                className=' min-w-[216px] rounded-sm bg-gradient-to-r from-[#00ECBC] to-[#005746]'
              >
                Disconnect
              </Button>
            </div>
          )}
        </div>
        <div className='mt-12 flex gap-9'>
          <div className='relative'>
            <div className='h-[345px] w-[388px] overflow-hidden rounded-t-[8px]  border-[1px] border-b-[0px] border-white/30 bg-gradient-to-br from-[#494949] to-[#494949]/10 px-12 py-6'>
              <div className='flex justify-center'>
                <AboutSectionImage className='absolute -top-36 z-40 h-[340px] w-[340px]' />
              </div>
              <div className='to-[#4FFF4C]/52 absolute bg-gradient-to-br from-[#12EF0E]'></div>
              {/* <Grid className='absolute inset-0' /> */}
              <div className='relative z-10 flex h-full w-full flex-col items-center justify-center'>
                <div className='mt-40 text-center text-[32px] font-bold leading-[50px] text-white'>
                  About BQ Labs
                  <div className='text-[14px] font-normal text-[#FFFFFF]/50'>
                    <div>Learn more about</div>
                    <div className='mt-[-2.3em]'>BQ Labs</div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex justify-center'>
              <Button
                size='lg'
                className='h-[61px] w-[388px] rounded-b-[8px]  border-[1px] border-t-[0px] border-white/30 bg-gradient-to-br from-[#00ECBC] to-[#005746]'
              >
                <a href='https://www.bqlabs.xyz/' target='blank'>
                  LEARN
                </a>
              </Button>
            </div>
          </div>

          <div className='relative'>
            <div className='h-[345px] w-[388px] overflow-hidden rounded-t-[8px]  border-[1px] border-b-[0px] border-white/30 bg-gradient-to-br from-[#494949] to-[#494949]/10 px-12 py-6'>
              <div className='flex justify-center'>
                <BQTokenSectionImage className='absolute -top-36 z-20 h-[380px] w-[380px]' />
              </div>
              <div className='to-[#4FFF4C]/52 absolute bg-gradient-to-br from-[#12EF0E]'></div>
              <div className='relative z-10 flex h-full w-full flex-col items-center justify-center'>
                <div className='mt-40 text-center text-[32px] font-bold leading-[50px] text-white'>
                  BQ Token Faucet
                  <div className='text-[14px] font-normal text-[#FFFFFF]/50'>
                    <div>Participate in governance</div>
                    <div className='mt-[-2.3em]'>and earn more BQ.</div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex justify-center'>
              <Button
                size='lg'
                className='h-[61px] w-[388px] rounded-b-[8px]  border-[1px] border-t-[0px] border-white/30 bg-gradient-to-br from-[#00ECBC] to-[#005746]'
                onClick={() => router.push('/governance')}
              >
                CLAIM NOW
              </Button>
            </div>
          </div>

          <div className='relative'>
            <div className='h-[345px] w-[388px] overflow-hidden rounded-t-[8px]  border-[1px] border-b-[0px] border-white/30 bg-gradient-to-br from-[#494949] to-[#494949]/10 px-12 py-6'>
              <div className='flex justify-center'>
                <BTCPSectionImage className='absolute -top-12 z-40 h-[188px] w-[188px]' />
              </div>
              <div className='to-[#4FFF4C]/52 absolute bg-gradient-to-br from-[#12EF0E]'></div>
              <div className='relative z-10 flex h-full w-full flex-col items-center justify-center'>
                <div className='mt-40 text-center text-[32px] font-bold leading-[50px] text-white'>
                  bqBTC Token Facuet
                  <div className='text-[14px] font-normal text-[#FFFFFF]/50'>
                    <div>Participate in staking</div>
                    <div className='mt-[-2.3em]'>and purchase cover.</div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex justify-center'>
              <Button
                size='lg'
                className='h-[61px] w-[388px] rounded-b-[8px]  border-[1px] border-t-[0px] border-white/30 bg-gradient-to-br from-[#00ECBC] to-[#005746]'
              >
                <a onClick={handleAddNetworkAndToken} target='blank'>
                  CLAIM NOW
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
