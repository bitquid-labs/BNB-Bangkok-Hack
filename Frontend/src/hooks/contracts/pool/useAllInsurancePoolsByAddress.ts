import { useEffect } from 'react';
import { useAccount, useBlockNumber, useReadContract } from 'wagmi';
import { InsurancePoolContract } from '@/constant/contracts';
import { InsurancePoolType } from '@/types/main';
import { ChainType } from '@/lib/wagmi';

export const useAllInsurancePoolsByAddress = (address: string) => {
  const { chain } = useAccount();
  const { data: blockNumber } = useBlockNumber();
  const { data: insurancePools, refetch } = useReadContract({
    abi: InsurancePoolContract.abi,
    address:
      InsurancePoolContract.addresses[(chain as ChainType)?.chainNickName],
    functionName: 'getPoolsByAddress',
    args: [address],
  });

  useEffect(() => {
    refetch();
  }, [blockNumber]);

  console.log('insurancePools for mystake : ', insurancePools);
  if (!insurancePools) return [];

  try {
    const result = insurancePools as InsurancePoolType[];
    if (!result) return [];

    return result;
  } catch (error) {
    return [];
  }
};
