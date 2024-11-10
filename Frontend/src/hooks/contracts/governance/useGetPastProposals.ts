import { useEffect } from 'react';
import { useBlockNumber, useReadContract, useAccount } from 'wagmi';
import { ProposalType } from '@/types/main';
import { GovContract } from '@/constant/contracts';
import { ChainType } from '@/lib/wagmi';

export const useGetPastProposals = () => {
  const { chain } = useAccount();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { data: proposals, refetch } = useReadContract({
    abi: GovContract.abi,
    address: GovContract.addresses[(chain as ChainType)?.chainNickName],
    functionName: 'getPastProposals',
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
