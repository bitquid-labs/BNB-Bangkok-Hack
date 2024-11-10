import { useEffect } from 'react';
import { useAccount, useBlockNumber, useReadContract } from 'wagmi';
import { ProposalType } from '@/types/main';
import { GovContract } from '@/constant/contracts';
import { ChainType, chains } from '@/lib/wagmi';

export const useAllLiveProposals = () => {
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
    const result = proposals as any[];
    if (!result) return [];

    return result;
  } catch (error) {
    return [];
  }
};
