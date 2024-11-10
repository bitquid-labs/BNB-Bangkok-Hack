import React, { useState } from 'react';

import { useAllLiveProposals } from '@/hooks/contracts/governance/useAllLiveProposals';

import { Proposals } from '@/screen/governance/components/proposals';
import { SwitchProposal } from '@/screen/governance/components/SwitchProposal';

import LightIcon from '~/svg/light.svg';
import {
  useAccount,
  useBalance,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { parseUnits } from 'viem';
import { BQTokenContract } from '@/constant/contracts';
import { toast } from 'react-toastify';
import { useAddToken } from '@/hooks/contracts/governance/useAddBQToken';
import { ChainType } from '@/lib/wagmi';

export const GovernanceScreen = (): JSX.Element => {
  const liveProposals = useAllLiveProposals();
  const [selectedType, setSelectedType] = useState<number>(0);

  const { address, isConnected, chain } = useAccount();
  const { data: balance } = useBalance({ address });

  const { addTokenToMetaMask } = useAddToken();

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

  const handleWriteContract = async (amount: number) => {
    if (!isConnected) {
      toast.error('Please connect your wallet first!');
      return;
    }
    console.log('wallet address is: ', `${address}`);
    const params = [`${address}`, parseUnits(amount.toString(), 18)];

    try {
      await writeContractAsync({
        abi: BQTokenContract.abi,
        address:
          BQTokenContract.addresses[(chain as ChainType)?.chainNickName],
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
      await addTokenToMetaMask(); // Then add the token
      handleWriteContract(10);
      toast.success('BQ Token Added on Metamask!');
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

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return (
    <section className='flex h-full flex-auto flex-col'>
      <div className='container mx-auto flex flex-auto flex-col items-center gap-12 p-10 pt-12'>
        <div className='flex max-w-[755px] flex-col items-center justify-center gap-9 text-[50px] font-bold leading-[50px]'>
          <div className='w-[1005px] text-center'>
            Become a Risk Assessment Governance Member by Holding BQ Tokens
          </div>
          <div className='text-[22px] font-normal'>
            Assess Risks - Vote on Proposals - Earn BQ
          </div>
          <div
            className='border-primary-200 relative flex h-[46px] w-[256px] cursor-pointer items-center justify-center rounded-lg border bg-[#0C0C0C] [box-shadow:0px_4px_9px_#00ECBC]'
            onClick={handleAddNetworkAndToken}
          >
            <div className='absolute inset-x-2 top-1'>
              <LightIcon />
            </div>
            <div className='text-primary-200 text-[15px] font-semibold'>
              {isConnected ? 'Claim Now' : 'Connect Wallet'}
            </div>
          </div>
          <div className='mt-10 h-[1px] w-[200px] bg-white/50'></div>
          <div className='flex w-full justify-between gap-[90px]'>
            <SwitchProposal
              selectedType={selectedType}
              onSelectProposalType={setSelectedType}
            />
          </div>
        </div>
        <Proposals proposals={liveProposals} selectedType={selectedType} />
      </div>
      {/* <div className='mb-[30px] flex justify-end gap-8 pr-[150px]'>
        <div className='bg-background-100 flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-full hover:bg-white/30 active:scale-95'>
          <LeftArrowIcon className='h-[13px] w-[23px]' />
        </div>
        <div className='bg-background-100 flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-full hover:bg-white/30 active:scale-95'>
          <LeftArrowIcon className='h-[13px] w-[23px] rotate-180' />
        </div>
      </div> */}
    </section>
  );
};
