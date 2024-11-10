import { parseUnits } from 'ethers';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
  useAccount,
  useBalance,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';

import { cn, convertAmount } from '@/lib/utils';

import { InsurancePoolContract } from '@/constant/contracts';
import { StakeType } from '@/screen/stake/constants';
import Button from '@/components/button/button';
import { ChainType } from '@/lib/wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useGetBalanceOfBQBTC } from '@/hooks/contracts/pool/useGetBalanceOfBQBTC';
import { BQBTC } from '@/constant/config';

type CurrencyProps = {
  pool: StakeType | undefined;
};

export const Currency = ({ pool }: CurrencyProps): JSX.Element => {
  const { openConnectModal } = useConnectModal();

  const [amount, setAmount] = useState<string | undefined>('');
  const [period, setPeriod] = useState<number>(30);
  const bqBTCBalance = Number(useGetBalanceOfBQBTC()) / 10 ** 18;

  const { address, isConnected, chain } = useAccount();
  const { data: balance } = useBalance({ address });

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

  const handleDepositContract = async (
    poolId: string,
    amount: string | undefined
  ) => {
    if (!isConnected) {
      toast.error('Please connect your wallet first!');
      return;
    }
    const realAmount = convertAmount(amount);

    if (amount === undefined) {
      toast.error('Amount should be bigger than 0!');
      return;
    }
    const params = [Number(poolId), parseUnits(amount.toString(), 18)];

    try {
      const tx = await writeContractAsync({
        abi: InsurancePoolContract.abi,
        address:
          InsurancePoolContract.addresses[(chain as ChainType)?.chainNickName],
        functionName: 'deposit',
        args: params,
        // value: parseUnits(amount.toString(), 18),
      });
      toast.success('Deposit Success!');
    } catch (err) {
      let errorMsg = '';
      if (err instanceof Error) {
        if (err.message.includes('User denied transaction signature')) {
          errorMsg = 'User denied transaction signature';
        } else {
          errorMsg = 'Input a valid stake amount!';
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
    <div className='flex flex-1 flex-col gap-4 rounded-sm bg-[#1E1E1E] p-[15px]'>
      <div className='flex items-center gap-[22px]'>
        <div className='w-fit min-w-[200px] text-[30px] font-bold'>
          Deposit Currency - {BQBTC.symbol}
        </div>
        <div className='h-[1px] flex-1 bg-white/50'></div>
      </div>
      <div className='relative flex flex-col gap-4 rounded border border-white/10 bg-[#373737] px-12 py-[34px]'>
        <div className='text-[20px] font-bold'>Pool Details:</div>
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
          {pool?.tenure}
        </div>
      </div>
      <div className='flex justify-center py-[27px]'>
        {!openConnectModal ? (
          <Button
            variant='gradient'
            className='w-fit min-w-[183px] rounded bg-gradient-to-r from-[#00ECBC] to-[#005746] px-5 py-3 text-center'
            onClick={async () =>
              await handleDepositContract(
                pool?.poolId ? pool?.poolId : '1',
                amount
              )
            }
          >
            Deposit {BQBTC.symbol}
          </Button>
        ) : (
          <Button
            variant='gradient'
            className='w-fit min-w-[183px] rounded bg-gradient-to-r from-[#00ECBC] to-[#005746] px-5 py-3 text-center'
            onClick={openConnectModal}
          >
            Connect Wallet
          </Button>
        )}
      </div>
    </div>
  );
};
