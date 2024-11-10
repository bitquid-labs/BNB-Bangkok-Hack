import { useEffect } from 'react';

import { BQBTCTokenContract } from '@/constant/contracts';

import { useAccount, useBlockNumber, useReadContract } from 'wagmi';
import { InsurancePoolType } from '@/types/main';
import { ChainType } from '@/lib/wagmi';

export const useGetBalanceOfBQBTC = () => {
  const { chain, address } = useAccount();
  console.log("Address: ", address)
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { data: balance, refetch } = useReadContract({
    abi: BQBTCTokenContract.abi,
    address:
      BQBTCTokenContract.addresses[(chain as ChainType)?.chainNickName],
    functionName: 'balanceOf',
    args: [address],
  });

  useEffect(() => {
    refetch();
  }, [blockNumber]);

  if (!balance) return 0;
//   console.log('BQBTC Balance: ', balance);

  try {
    const result = balance;
    if (!result) return 0;

    return result;
  } catch (error) {
    return 0;
  }
};
