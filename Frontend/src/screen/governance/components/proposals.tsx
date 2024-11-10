import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAccount, useBalance, useWriteContract } from 'wagmi';

import { cn, convertTempProposalTypeData } from '@/lib/utils';

import Button from '@/components/button/button';
import CustomDatePicker from '@/components/DatePicker';

import { GovContract } from '@/constant/contracts';
import { ProposalDetail } from '@/screen/governance/constants';

import { ProposalType } from '@/types/main';
import DownIcon from '~/svg/chav-down.svg';
import CheckIcon from '~/images/governance/check-mark 2.svg';
import ErrorIcon from '~/images/governance/problem 1.svg';
import { useGetLiveProposals } from '@/hooks/contracts/governance/useGetLiveProposals';
import { useGetPastProposals } from '@/hooks/contracts/governance/useGetPastProposals';
import { Detail } from '@/screen/governance/components/detail';
import LeftArrowIcon from '~/svg/left-arrow.svg';
import { ChainType } from '@/lib/wagmi';
import { BQBTC } from '@/constant/config';

type CurrencyProps = {
  proposals: ProposalType[];
  selectedType: number;
};

export const Proposals = ({
  proposals,
  selectedType,
}: CurrencyProps): JSX.Element => {
  const { address, isConnected, chain } = useAccount();
  const { data: balance } = useBalance({ address });

  const LiveProposals = useGetLiveProposals();
  const PastProposals = useGetPastProposals();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [lossEventDate, setLossEventDate] = useState<Date>(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(
    (selectedType ? LiveProposals : PastProposals).length / itemsPerPage
  );
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = (selectedType ? LiveProposals : PastProposals).slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle previous page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const {
    data: hash,
    isPending,
    writeContractAsync,
  } = useWriteContract({
    mutation: {
      async onSuccess() {
        console.log(1);
      },
      onError(error: any) {
        console.log('Error: ', error);
      },
    },
  });

  const handleAcceptWriteContract = async (proposalId: number) => {
    if (!isConnected) {
      toast.error('Please connect your wallet first!');
      return;
    }
    const params = [proposalId, true];

    console.log('ProposalId: ', proposalId);
    try {
      const tx = await writeContractAsync({
        abi: GovContract.abi,
        address: GovContract.addresses[(chain as ChainType)?.chainNickName],
        functionName: 'vote',
        args: params,
      });
      toast.success('Accept Vote Sucess!');
    } catch (err) {
      let errorMsg = '';
      if (err instanceof Error) {
        if (err.message.includes('User denied transaction signature')) {
          errorMsg = 'User denied transaction signature';
        } else if (err.message.includes('Already voted')) {
          errorMsg = 'Already voted';
        } else if (err.message.includes('Proposal does not exist')) {
          errorMsg = 'Proposal does not exist';
        } else if (err.message.includes('No voting weight')) {
          errorMsg = 'Insufficient BQ tokens for voting';
        } else if (err.message.includes('You cant vote on your own proposal')) {
          errorMsg = 'You cant vote on your own proposal';
        }
      } else {
        errorMsg = 'Unexpected error';
      }
      toast.error(errorMsg);
    }
  };

  const handleDeclineWriteContract = async (proposalId: number) => {
    if (!isConnected) {
      toast.error('Please connect your wallet first!');
      return;
    }
    const params = [proposalId, false];

    console.log('ProposalId: ', proposalId);
    try {
      const tx = await writeContractAsync({
        abi: GovContract.abi,
        address: GovContract.addresses[(chain as ChainType)?.chainNickName],
        functionName: 'vote',
        args: params,
      });
      toast.success('Decline Vote Sucess!');
    } catch (err) {
      let errorMsg = '';
      if (err instanceof Error) {
        if (err.message.includes('User denied transaction signature')) {
          errorMsg = 'User denied transaction signature';
        } else if (err.message.includes('Already voted')) {
          errorMsg = 'Already voted';
        } else if (err.message.includes('Proposal does not exist')) {
          errorMsg = 'Proposal does not exist';
        } else if (err.message.includes('No voting weight')) {
          errorMsg = 'Insufficient BQ tokens for voting';
        } else if (err.message.includes('You cant vote on your own proposal')) {
          errorMsg = 'You cant vote on your own proposal';
        }
      } else {
        errorMsg = 'Unexpected error';
      }
      toast.error(errorMsg);
      console.log('EROOOOOOOOOOOOOOOOOOOOOOOOOOR: ', errorMsg);
    }
  };

  return (
    <div className='relative flex w-full flex-col gap-6'>
      {selectedType
        ? convertTempProposalTypeData(PastProposals ? PastProposals : [], BQBTC.symbol).map(
            (proposal, index) =>
              Number(PastProposals[index].createdAt) ? (
                <div key={index} className='flex flex-col'>
                  <div
                    key={index}
                    className='flex w-full gap-5 rounded bg-[#1E1E1E] px-11 py-[26px]'
                  >
                    {Object.keys(proposal).map((key, i) => (
                      <div
                        key={i}
                        className={cn(
                          'flex w-full flex-col items-center gap-6',
                          key === 'timeleft' && 'hidden'
                        )}
                      >
                        <div className='w-full justify-center rounded border border-white/5 bg-white/10 px-[18px] py-[9px] text-center'>
                          {ProposalDetail[key as keyof typeof ProposalDetail]}
                        </div>
                        <div className='font-semibold'>
                          {key === 'incentive' && <div>100 BQ</div>}
                          {key !== 'incentive' &&
                            proposal[key as keyof typeof proposal]}
                        </div>
                      </div>
                    ))}
                    <div className='ml-[30px] flex w-full flex-col gap-[13px]'>
                      {Number(PastProposals[index].votesFor) >
                      Number(PastProposals[index].votesAgainst) ? (
                        <div className='relative h-full rounded-[4px] border-[1px] border-[#00ECBC]'>
                          <div className='h-full w-full bg-[#00ECBC] bg-opacity-5'>
                            <div className='z-20 h-1/2 w-full pl-[44px] pt-[24px] text-[14px] text-white'>
                              Status:{' '}
                            </div>
                            <div className='pl-[44px] font-semibold'>
                              Approved
                            </div>
                            <CheckIcon className='absolute left-[240px] top-[24px] w-[51px]' />
                          </div>
                        </div>
                      ) : (
                        <div className='relative h-full rounded-[4px] border-[1px] border-[#FF0000]'>
                          <div className='h-full w-full bg-[#FF0000] bg-opacity-5'>
                            <div className='z-20 h-1/2 w-full pl-[44px] pt-[24px] text-[14px] text-white'>
                              Status:{' '}
                            </div>
                            <div className='pl-[44px] font-semibold'>
                              Rejected
                            </div>
                            <ErrorIcon className='absolute left-[240px] top-[24px] w-[51px]' />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <Detail proposal={PastProposals[index]} />
                </div>
              ) : (
                <></>
              )
          )
        : convertTempProposalTypeData(LiveProposals ? LiveProposals : [], BQBTC.symbol).map(
            (proposal, index) =>
              Number(LiveProposals[index].createdAt) ? (
                <div key={index} className='flex flex-col'>
                  <div
                    key={index}
                    className='flex w-full gap-5 rounded bg-[#1E1E1E] px-11 py-[26px]'
                  >
                    {Object.keys(proposal).map((key, i) => (
                      <div
                        key={i}
                        className='flex w-full flex-col items-center gap-6'
                      >
                        <div className='w-full justify-center rounded border border-white/5 bg-white/10 px-[18px] py-[9px] text-center'>
                          {ProposalDetail[key as keyof typeof ProposalDetail]}
                        </div>
                        <div className='font-semibold'>
                          {key === 'incentive' && <div>100 BQ</div>}
                          {key !== 'incentive' &&
                            proposal[key as keyof typeof proposal]}
                        </div>
                      </div>
                    ))}
                    <div className='flex w-full flex-col gap-[13px]'>
                      <Button
                        variant='primary'
                        size='lg'
                        className='w-full min-w-[183px] rounded bg-gradient-to-r from-[#00ECBC] to-[#005746] px-5 py-3 text-center'
                        onClick={() =>
                          handleAcceptWriteContract(
                            Number(LiveProposals[index].id)
                          )
                        }
                      >
                        Accept
                      </Button>
                      <Button
                        size='lg'
                        className='w-full rounded border border-white bg-transparent'
                        onClick={() =>
                          handleDeclineWriteContract(
                            Number(LiveProposals[index].id)
                          )
                        }
                      >
                        Decline
                      </Button>
                    </div>
                  </div>
                  <Detail proposal={LiveProposals[index]} />
                </div>
              ) : (
                <></>
              )
          )}
      <div className='mb-[30px] flex justify-end gap-8 pr-[50px]'>
        <div className='bg-background-100 flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-full hover:bg-white/30 active:scale-95'>
          <LeftArrowIcon
            className='h-[13px] w-[23px]'
            onclick={() => handlePrevPage}
          />
        </div>
        <div className='bg-background-100 flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-full hover:bg-white/30 active:scale-95'>
          <LeftArrowIcon
            className='h-[13px] w-[23px] rotate-180'
            onclick={() => handleNextPage}
          />
        </div>
      </div>
    </div>
  );
};
