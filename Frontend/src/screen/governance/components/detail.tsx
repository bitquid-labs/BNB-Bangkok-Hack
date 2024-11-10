import React, { useEffect, useState } from 'react';
import CustomDatePicker from '@/components/DatePicker';
import DownIcon from '~/svg/chav-down.svg';
import { cn } from '@/lib/utils';
import { ProposalType } from '@/types/main';
import { useAccount } from 'wagmi';
import { BQBTC } from '@/constant/config';

type DetailProps = {
  proposal: ProposalType;
  // isOpen: Boolean;
};

export const Detail = ({ proposal }: DetailProps): JSX.Element => {
  const { chain } = useAccount();
  const [lossEventDate, setLossEventDate] = useState<Date>(new Date());
  const [isOpen, setIsOpen] = useState<boolean>(false);
  console.log('Result returns: ', proposal);

  return (
    <div className='px-[15px]'>
      <div className='flex flex-col items-center justify-center gap-5 rounded-b bg-gradient-to-r from-[#3D3D3D] to-[#303030] p-2'>
        {isOpen && (
          <div className='flex flex-col gap-5 pt-[30px]'>
            <div className='flex gap-10'>
              <div className='flex w-full flex-col gap-1'>
                <div>Loss Event Date</div>
                <div className='relative w-full rounded border border-white/5 bg-white/10 px-5 py-2'>
                  <CustomDatePicker
                    selectedDate={lossEventDate}
                    handleDateChange={(e) => e && setLossEventDate(e)}
                  />
                </div>
              </div>
              <div className='relative flex w-full flex-col gap-1'>
                <div>Claim Value</div>
                <div className='relative flex w-full rounded border border-white/5 bg-white/10 px-5 py-2'>
                  <input
                    className='w-full flex-1 border-none bg-transparent p-0 focus:border-none focus:outline-none focus:outline-offset-0 focus:ring-0'
                    placeholder='Claim Value'
                    disabled
                    defaultValue={
                      Number(proposal.proposalParam.claimAmount) / 10 ** 18 + 
                      ` ${BQBTC.symbol}`
                    }
                  />
                </div>
              </div>
            </div>
            <div className='flex w-full gap-10'>
              <div className='relative flex w-full flex-col gap-1'>
                <div>Slashing Tnx Hash</div>
                <div className='relative w-full rounded border border-white/5 bg-white/10 px-5 py-2'>
                  <input
                    className='w-full border-none bg-transparent p-0 focus:border-none focus:outline-none focus:outline-offset-0 focus:ring-0'
                    placeholder='Slashing Tnx Hash'
                    disabled
                    defaultValue={proposal.proposalParam.txHash}
                  />
                </div>
              </div>
            </div>
            <div className='relative flex w-full flex-col gap-1'>
              <div>Description</div>
              <div className='relative w-full rounded border border-white/5 bg-white/10 px-5 py-2'>
                <input
                  className='w-full border-none bg-transparent p-0 focus:border-none focus:outline-none focus:outline-offset-0 focus:ring-0'
                  placeholder='Description'
                  disabled
                  defaultValue={proposal.proposalParam.description}
                />
              </div>
            </div>
          </div>
        )}
        <div className='flex w-full items-center justify-center gap-2'>
          <div className='cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
            More Details
          </div>
          <DownIcon
            className={cn('h-[5px] w-[10px]', isOpen && 'rotate-180')}
          />
        </div>
      </div>
    </div>
  );
};
