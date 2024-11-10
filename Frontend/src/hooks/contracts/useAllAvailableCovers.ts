import { useEffect } from 'react';

import { ICoverContract } from '@/constant/contracts';

import { useAccount, useBlockNumber, useReadContract } from 'wagmi';
import { ICover } from '@/types/main';
import { ChainType } from '@/lib/wagmi';

export const useAllAvailableCovers = () => {
  const { chain } = useAccount();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { data: availableCovers, refetch } = useReadContract({
    abi: ICoverContract.abi,
    address: ICoverContract.addresses[(chain as ChainType)?.chainNickName],
    functionName: 'getAllAvailableCovers',
    args: [],
  });

  // useEffect(() => {
  //   refetch();
  // }, [blockNumber]);

  if (!availableCovers) return [];

  try {
    const result = availableCovers as ICover[];
    if (!result) return [];

    return result;
  } catch (error) {
    return [];
  }
};
