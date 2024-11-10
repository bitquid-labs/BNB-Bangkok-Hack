import { useEffect } from 'react';

import { ICoverContract } from '@/constant/contracts';

import { useAccount, useBlockNumber, useReadContract } from 'wagmi';
import { IUserCover } from '@/types/main';
import { ChainType } from '@/lib/wagmi';

export const useUserCoverInfo = (address: string, coverId: number) => {
  const { chain } = useAccount();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { data: userCover, refetch } = useReadContract({
    abi: ICoverContract.abi,
    address: ICoverContract.addresses[(chain as ChainType)?.chainNickName],
    functionName: 'getUserCoverInfo',
    args: [address, coverId],
  });

  useEffect(() => {
    refetch();
  }, [blockNumber]);

  if (!userCover) return undefined;

  try {
    const result = userCover as IUserCover;
    if (!result) return undefined;

    return result;
  } catch (error) {
    return undefined;
  }
};
