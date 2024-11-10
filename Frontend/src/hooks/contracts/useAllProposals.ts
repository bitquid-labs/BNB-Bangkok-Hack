import { useEffect } from 'react';

import { GovContract } from '@/constant/contracts';

import { useAccount, useBlockNumber, useReadContract } from 'wagmi';
import { ICover } from '@/types/main';
import { ChainType } from '@/lib/wagmi';

export const useAllProposals = () => {
  const { chain } = useAccount();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { data: proposals, refetch } = useReadContract({
    abi: GovContract.abi,
    address: GovContract.addresses[(chain as ChainType)?.chainNickName],
    functionName: 'getAllProposals',
    args: [],
  });

  useEffect(() => {
    refetch();
  }, [blockNumber]);

  if (!proposals) return [];

  try {
    const result = proposals as ICover[];
    if (!result) return [];

    return result;
  } catch (error) {
    return [];
  }
};
