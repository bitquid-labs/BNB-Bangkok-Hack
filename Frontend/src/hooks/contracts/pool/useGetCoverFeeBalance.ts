import { useEffect } from 'react';

import { ICoverContract } from '@/constant/contracts';

import { useAccount, useBlockNumber, useReadContract } from 'wagmi';
import { ChainType } from '@/lib/wagmi';

export const useGetCoverFeeBalance = () => {
  const { chain } = useAccount();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { data: coverFeeBalance, refetch } = useReadContract({
    abi: ICoverContract.abi,
    address: ICoverContract.addresses[(chain as ChainType)?.chainNickName],
    functionName: 'getCoverFeeBalance',
    args: [],
  });

  useEffect(() => {
    refetch();
  }, [blockNumber]);

  if (!coverFeeBalance) return [];

  const result = (Number(coverFeeBalance) / 10 ** 18).toFixed(5);
  //   console.log('CoverFeeBalance: ', result)

  return result;
};
