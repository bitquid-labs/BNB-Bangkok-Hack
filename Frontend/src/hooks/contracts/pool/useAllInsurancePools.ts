import { useEffect } from 'react';

import { InsurancePoolContract } from '@/constant/contracts';

import { useAccount, useBlockNumber, useReadContract } from 'wagmi';
import { InsurancePoolType } from '@/types/main';
import { ChainType } from '@/lib/wagmi';

export const useAllInsurancePools = () => {
  const { chain } = useAccount();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { data: insurancePools, refetch } = useReadContract({
    abi: InsurancePoolContract.abi,
    address:
      InsurancePoolContract.addresses[(chain as ChainType)?.chainNickName],
    functionName: 'getAllPools',
    args: [],
  });

  useEffect(() => {
    refetch();
  }, [blockNumber]);

  if (!insurancePools) return [];
  console.log('Insurance Pool: ', insurancePools);

  try {
    const result = insurancePools as InsurancePoolType[];
    if (!result) return [];

    return result;
  } catch (error) {
    return [];
  }
};
