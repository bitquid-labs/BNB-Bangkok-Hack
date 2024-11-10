import { useEffect, useMemo, useState } from 'react';
import { GovContract } from '@/constant/contracts';
import { useAccount, useBlockNumber, useReadContract } from 'wagmi';
import { ICover, ProposalStatus, ProposalType } from '@/types/main';
import { ChainType } from '@/lib/wagmi';

export const useProposalByCoverId = (address: string, coverId?: string) => {
  const { chain } = useAccount();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { data: proposals, refetch } = useReadContract({
    abi: GovContract.abi,
    address: GovContract.addresses[(chain as ChainType)?.chainNickName],
    functionName: 'getAllProposals',
    args: [], // Modify this if your contract function requires arguments
  });

  const [userProposals, setUserProposals] = useState<ProposalType[]>([]);

  const filteredProposals = useMemo(() => {
    if (userProposals.length !== 0) {
      return userProposals[userProposals.length - 1];
    } else return undefined;
  }, [userProposals]);

  // const [filteredProposals, setFilteredProposals] = useState<ProposalType | undefined>(undefined);

  useEffect(() => {
    if (proposals) {
      const result = proposals as ProposalType[];
      if (coverId) {
        const uProposals = result.filter((proposal) => {
          return (
            proposal.status !== ProposalStatus.Claimed &&
            Number(proposal.proposalParam.coverId).toString() === coverId &&
            proposal.proposalParam.user === address
          );
        });
        setUserProposals(uProposals);
      } else {
        // If coverId is undefined, return all proposals
        setUserProposals([]);
      }
    }
  }, [proposals, coverId]);

  console.log('raw user proposals:', userProposals);

  useEffect(() => {
    if (blockNumber) {
      refetch();
    }
  }, [blockNumber]); // Only refetch when blockNumber changes

  return filteredProposals;
};
