'use client';

import React, { useCallback, useState } from 'react';

import { cn, convertAmount } from '@/lib/utils';

import Button from '@/components/button/button';
import Modal from '@/components/modal';
import { useAccount, useBalance, useWriteContract } from 'wagmi';
import { InsurancePoolContract } from '@/constant/contracts';
import { toast } from 'react-toastify';
import { parseUnits } from 'viem';
import { ChainType } from '@/lib/wagmi';
import { useGetBalanceOfBQBTC } from '@/hooks/contracts/pool/useGetBalanceOfBQBTC';

const DepositModal = ({
  index,
  currency,
  tenure,
}: {
  index: number;
  currency: string | undefined;
  tenure: string | undefined;
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [amount, setAmount] = useState<string | undefined>('');
  const { address, isConnected, chain } = useAccount();
  const bqBTCBalance = Number(useGetBalanceOfBQBTC()) / 10 ** 18;
  const { data: balanceData } = useBalance({
    address: address as `0x${string}`,
    unit: 'ether',
  });

  const { data: hash, writeContractAsync } = useWriteContract({
    mutation: {
      async onSuccess() {
        console.log(1);
      },
      onError(error: any) {
        console.log(1, error);
      },
    },
  });

  const handleDepositContract = async (
    poolId: Number,
    amount: string | undefined
  ) => {

    console.log('amount', amount, bqBTCBalance)

    if(!isConnected) {
      toast.error('Please connect your wallet first!');
      return;
    }
    console.log('Deposit is ', InsurancePoolContract, poolId);
    const realAmount = convertAmount(amount);
    // const period = day.match(/\d+/);
    
    if (amount === undefined) {
      toast.error('Input a valid stake amount!');
      return;
    }

    if (Number(amount) > bqBTCBalance) {
      toast.error('Input a valid stake amount!');
      return;
    }

    const params = [poolId, parseUnits(amount.toString(), 18)];
    console.log('params ', params);

    try {
      const tx = await writeContractAsync({
        abi: InsurancePoolContract.abi,
        address: InsurancePoolContract.addresses[(chain as ChainType)?.chainNickName],
        functionName: 'deposit',
        args: params,
        // value: parseUnits(amount.toString(), 18),
      });
      setAmount('')
      toast.success('Deposit Success!');
    } catch (err) {
      let errorMsg = '';
      if (err instanceof Error) {
        if (err.message.includes('User denied transaction signature')) {
          errorMsg = 'User denied transaction signature';
        }
        else if(err.message.includes('Amount must be greater than 0')) {
          errorMsg = 'Input a valid stake amount!';
        }
      }
      toast.error(errorMsg);
    }
  };

  return (
    <>
      <div className='h-full w-full'>
        <Button
          variant='gradient'
          className='h-10 w-full px-5 py-[11px]'
          onClick={() => setIsOpen(true)}
        >
          Stake Now
        </Button>
      </div>
      <Modal maxWidth='lg' isOpen={isOpen} onDismiss={() => setIsOpen(false)}>
        <div className='flex min-h-[398px] w-full flex-col items-center rounded bg-gradient-to-r from-[#1E1E1E] to-[#1E1E1E] p-3'>
          <div className='flex w-full flex-1 flex-col gap-[25px] rounded bg-gradient-to-r from-[#3D3D3D] to-[#303030] px-[39px] py-[27px]'>
            <div className='text-[20px] font-bold'>{`Deposit Currency ${currency}`}</div>
            <div className='flex h-auto rounded border border-[#6D6D6D] px-1 py-[5px]'>
              <input
                className={cn(
                  'placeholder:text-light/50 min-w-0 flex-auto border-none bg-transparent p-0 focus:border-none focus:outline-none focus:outline-offset-0 focus:ring-0'
                )}
                value={amount || ''}
                onChange={(e) => setAmount(e.target.value)}
              />
              <div
                className='h-[36px] min-w-[86px] cursor-pointer rounded-[10px] bg-[#131313] px-[13px] py-[6px] text-center text-[15px] leading-[24px] text-white'
                onClick={() => setAmount(String(bqBTCBalance))}
              >
                Max
              </div>
            </div>
            <div className='w-fit rounded bg-gradient-to-r from-[#00ECBC] to-[#005746] px-[18px] py-[9px]'>
              {tenure}
            </div>
          </div>
          <div className='flex justify-center py-[27px]'>
            <Button
              variant='gradient'
              className='w-fit min-w-[183px] rounded bg-gradient-to-r from-[#00ECBC] to-[#005746] px-5 py-3 text-center'
              onClick={() => handleDepositContract(index, amount)}
            >
              Stake
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DepositModal;
