import React, { useState } from 'react';

import Input from '@/components/input';
import Button from '@/components/button/button';
import CustomDatePicker from '@/components/DatePicker';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ProposalStatus } from '@/types/main';
import { Proposals } from '@/screen/governance/components/proposals';
import { useAccount } from 'wagmi';
import { BQBTC } from '@/constant/config';

type RequirementType = {
  lossEventDate: Date | null;
  claimValueStr: string;
  slashingTx: string;
  description: string;
  error: string;
  status: ProposalStatus | undefined;
  setStatus: React.Dispatch<React.SetStateAction<number>>;
  maxClaimable: number;
  isSlashing: boolean;
  isLoading: boolean;
  handleLossEventDateChange: (date: Date | null) => void;
  handleClaimValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSlashingTxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescriptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmitClaim: () => void;
  handleClaimProposalFunds: () => void;
};

export const Requirement = (props: RequirementType): JSX.Element => {
  const {
    lossEventDate,
    claimValueStr,
    slashingTx,
    description,
    maxClaimable,
    error,
    status,
    setStatus,
    isSlashing,
    isLoading,
    handleLossEventDateChange,
    handleClaimValueChange,
    handleSlashingTxChange,
    handleDescriptionChange,
    handleSubmitClaim,
    handleClaimProposalFunds,
  } = props;
  const { chain } = useAccount();
  const [selectedType, setSelectedType] = useState<number>(0);
  const [resubmit, setResubmit] = useState<boolean>(false);

  return (
    <div className='flex w-full flex-col gap-10'>
      <div className='mt-[27px] flex flex-col gap-[55px] rounded-lg bg-[#131313] px-[57px] py-[34px]'>
        <div className='flex items-center justify-between'>
          <div className='border-b border-[#6D6D6D] pb-[14px] pr-5 text-[35px] font-semibold'>
            Claim Requirements
          </div>
          <div className='flex w-full max-w-[300px] items-center rounded-[10px] border border-white p-[2px]'>
            <div className='relative flex w-full flex-col items-center rounded-lg md:flex-row md:gap-0'>
              {[
                'Max Claimable',
                `${maxClaimable}` + ` ${BQBTC.symbol}`,
              ].map((opt, index) => (
                <div
                  key={index}
                  className={cn(
                    'z-10 w-full py-2 text-center text-base capitalize text-white transition-all'
                  )}
                  // onClick={() => setSelectedType(index)}
                >
                  {opt}
                </div>
              ))}
              <div
                className={cn(
                  'absolute inset-y-0 hidden rounded-lg border border-[#00ECBC] bg-[#00ECBC]/10 transition-all md:block'
                )}
                style={{
                  width: `50%`,
                  transform: `translateX(100%)`,
                }}
              />
              <div
                className={cn(
                  'absolute inset-x-0 rounded-lg border border-[#00ECBC] bg-[#00ECBC]/10 transition-all md:hidden'
                )}
                style={{
                  height: `50%`,
                  transform: `translateY(${selectedType * 100}%)`,
                }}
              />
            </div>
          </div>
        </div>
        {status === undefined && ( // Submit not reuqested yet
          <div className='flex flex-col gap-10'>
            <div className='flex flex-col gap-1'>
              <div>Loss Event Date</div>
              <div className='relative w-full rounded border border-[#6D6D6D] px-5 py-[14px]'>
                <CustomDatePicker
                  selectedDate={lossEventDate}
                  handleDateChange={handleLossEventDateChange}
                />
              </div>
            </div>
            <div className='flex w-full gap-10'>
              <div className='relative flex w-full flex-col gap-1'>
                <div>Claim Value</div>
                <div className='relative flex w-full rounded border border-[#6D6D6D] px-5 py-[7px]'>
                  <input
                    className='flex-1 border-none bg-transparent p-0 focus:border-none focus:outline-none focus:outline-offset-0 focus:ring-0'
                    placeholder='Type here...'
                    value={claimValueStr}
                    onChange={(e) => handleClaimValueChange(e)}
                  />
                  <div className='rounded border border-white/10 bg-[#131313] px-3 py-1.5 text-white'>
                    {BQBTC.symbol}
                  </div>
                </div>
              </div>
              <div className='relative flex w-full flex-col gap-1'>
                <div>Loss event Transaction Hash</div>
                <div className='relative w-full rounded border border-[#6D6D6D] px-5 py-[14px]'>
                  <input
                    className='w-full border-none bg-transparent p-0 focus:border-none focus:outline-none focus:outline-offset-0 focus:ring-0'
                    placeholder='Type here...'
                    value={slashingTx}
                    disabled={isSlashing}
                    onChange={(e) => handleSlashingTxChange(e)}
                  />
                </div>
              </div>
            </div>
            <div className='relative flex w-full flex-col gap-1'>
              <div>Description</div>
              <div className='relative w-full rounded border border-[#6D6D6D] px-5 py-[14px]'>
                <input
                  className='w-full border-none bg-transparent p-0 focus:border-none focus:outline-none focus:outline-offset-0 focus:ring-0'
                  placeholder='Type here...'
                  value={description}
                  onChange={(e) => handleDescriptionChange(e)}
                />
              </div>
            </div>
            <div className='flex w-full justify-center'>
              <Button
                variant='gradient'
                className='min-w-[400px]'
                isLoading={isLoading}
                size='lg'
                onClick={() => handleSubmitClaim()}
                disabled={!!error}
              >
                Claim Request
              </Button>
            </div>
          </div>
        )}
        {(status === ProposalStatus.Submitted ||
          status === ProposalStatus.Pending) && (
          <div className='flex flex-col'>
            <div className='flex min-h-[400px] w-full flex-col items-center justify-center gap-10'>
              <div className='flex items-center gap-4'>
                <Image
                  src='/images/success.png'
                  width={80}
                  height={80}
                  alt='success'
                />
                <div className='flex flex-col'>
                  <div>Your claim request is in voting process.</div>
                  <div>No further action is required.</div>
                </div>
              </div>
            </div>{' '}
            <div className='flex w-full justify-center'>
              <Button
                variant='primary'
                className='min-w-[400px]'
                isLoading={isLoading}
                size='lg'
                onClick={handleClaimProposalFunds}
                disabled={true}
              >
                Request in voting
              </Button>
            </div>
          </div>
        )}
        {status === ProposalStatus.Approved && (
          <div className='flex flex-col'>
            <div className='flex min-h-[400px] w-full flex-col items-center justify-center gap-10'>
              <div className='flex items-center gap-4'>
                <Image
                  src='/images/success.png'
                  width={80}
                  height={80}
                  alt='success'
                />
                <div className='flex flex-col'>
                  <div>Your claim request has been approved successfully.</div>
                  <div>No further action is required.</div>
                </div>
              </div>
            </div>{' '}
            <div className='flex w-full justify-center'>
              <Button
                variant='gradient'
                className='min-w-[400px]'
                isLoading={isLoading}
                size='lg'
                onClick={handleClaimProposalFunds}
                // disabled={!!error}
              >
                Withdraw Claim Value
              </Button>
            </div>
          </div>
        )}
        {status === ProposalStatus.Rejected ? (
          !resubmit ? (
            <div className='flex flex-col'>
              <div className='flex min-h-[400px] w-full flex-col items-center justify-center gap-10'>
                <div className='flex items-center gap-4'>
                  <Image
                    src='/images/alert.png'
                    width={80}
                    height={80}
                    alt='success'
                  />
                  <div className='flex flex-col'>
                    <div>
                      Unfortunately, your claim request has not been approved{' '}
                    </div>
                    <div>at this time. Kindly submit your request again.</div>
                  </div>
                </div>
              </div>{' '}
              <div className='flex w-full justify-center'>
                <Button
                  variant='gradient'
                  className='min-w-[400px]'
                  isLoading={isLoading}
                  size='lg'
                  onClick={() => setResubmit(true)}
                >
                  Resubmit Claim Request
                </Button>
              </div>
            </div>
          ) : (
            // Submit not reuqested yet
            <div className='flex flex-col gap-10'>
              <div className='flex flex-col gap-1'>
                <div>Loss Event Date</div>
                <div className='relative w-full rounded border border-[#6D6D6D] px-5 py-[14px]'>
                  <CustomDatePicker
                    selectedDate={lossEventDate}
                    handleDateChange={handleLossEventDateChange}
                  />
                </div>
              </div>
              <div className='flex w-full gap-10'>
                <div className='relative flex w-full flex-col gap-1'>
                  <div>Claim Value</div>
                  <div className='relative flex w-full rounded border border-[#6D6D6D] px-5 py-[7px]'>
                    <input
                      className='flex-1 border-none bg-transparent p-0 focus:border-none focus:outline-none focus:outline-offset-0 focus:ring-0'
                      placeholder='Type here...'
                      value={claimValueStr}
                      onChange={(e) => handleClaimValueChange(e)}
                    />
                    <div className='rounded border border-white/10 bg-[#131313] px-3 py-1.5 text-white'>
                      {BQBTC.symbol}
                    </div>
                  </div>
                </div>
                <div className='relative flex w-full flex-col gap-1'>
                  <div>Loss event Transaction Hash</div>
                  <div className='relative w-full rounded border border-[#6D6D6D] px-5 py-[14px]'>
                    <input
                      className='w-full border-none bg-transparent p-0 focus:border-none focus:outline-none focus:outline-offset-0 focus:ring-0'
                      placeholder='Type here...'
                      value={slashingTx}
                      disabled={isSlashing}
                      onChange={(e) => handleSlashingTxChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className='relative flex w-full flex-col gap-1'>
                <div>Description</div>
                <div className='relative w-full rounded border border-[#6D6D6D] px-5 py-[14px]'>
                  <input
                    className='w-full border-none bg-transparent p-0 focus:border-none focus:outline-none focus:outline-offset-0 focus:ring-0'
                    placeholder='Type here...'
                    value={description}
                    onChange={(e) => handleDescriptionChange(e)}
                  />
                </div>
              </div>
              <div className='flex w-full justify-center'>
                <Button
                  variant='gradient'
                  className='min-w-[400px]'
                  isLoading={isLoading}
                  size='lg'
                  onClick={() => handleSubmitClaim()}
                  disabled={!!error}
                >
                  Claim Request
                </Button>
              </div>
            </div>
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
