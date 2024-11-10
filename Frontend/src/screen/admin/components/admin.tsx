import Button from '@/components/button/button';
import { GovContract } from '@/constant/contracts';
import { ChainType } from '@/lib/wagmi';
import React from 'react';
import { toast } from 'react-toastify';
import { useAccount, useWriteContract } from 'wagmi';

export const AdminScreen = () => {
  const { address, isConnected, chain } = useAccount();

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

  const handleExecuteProposalContract = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first!');
      return;
    }
    console.log('Deposit is ', GovContract);

    try {
      const tx = await writeContractAsync({
        abi: GovContract.abi,
        address: GovContract.addresses[(chain as ChainType)?.chainNickName],
        functionName: 'executeProposal',
      });
      toast.success('Deposit Success!');
    } catch (err) {
      let errorMsg = '';
      if (err instanceof Error) {
        if (err.message.includes('User denied transaction signature')) {
          errorMsg = 'User denied transaction signature';
        } else if (err.message.includes('Amount must be greater than 0')) {
          errorMsg = 'Input a valid stake amount!';
        }
      }
      toast.error(errorMsg);
    }
  };

  return (
    // <section className='relative flex h-full w-full flex-auto flex-col items-center justify-center'>
      <div className='text-[40px] relative flex h-screen w-full flex-auto flex-col items-center justify-center'>
        <Button
          variant='gradient'
          className='h-10 w-full px-5 py-[11px] text-[40px]'
          onClick={handleExecuteProposalContract}
        >
          Execute Proposals
        </Button>
      </div>
    // </section>
  );
};
