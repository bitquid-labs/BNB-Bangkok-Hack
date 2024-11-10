import { useEffect } from 'react';
import { useAccount, useBlockNumber, useReadContract } from 'wagmi';
import { InsurancePoolContract } from '@/constant/contracts';
import { PoolCoverType } from '@/types/main';
import { ChainType } from '@/lib/wagmi';

export const usePoolCovers = (poolId: string) => {
  const { chain } = useAccount();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { data: poolCovers, refetch } = useReadContract({
    abi: InsurancePoolContract.abi,
    address:
      InsurancePoolContract.addresses[(chain as ChainType)?.chainNickName],
    functionName: 'getPoolCovers',
    args: [Number(poolId)],
  });

  useEffect(() => {
    refetch();
  }, [blockNumber]);

  // console.log('poolCovers Hook', poolCovers);
  if (!poolCovers) return [];

  try {
    const result = poolCovers as PoolCoverType[];
    if (!result) return [];

    return result;
  } catch (error) {
    return [];
  }
};
