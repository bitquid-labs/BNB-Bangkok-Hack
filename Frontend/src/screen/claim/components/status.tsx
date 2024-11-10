import React from 'react';
import Button from '@/components/button/button';
import { ProposalStatus } from '@/types/main';

type StatusType = {
  status: ProposalStatus | undefined;
};

const StatusText = ['Submitted', 'Pending', 'Approved', 'Withdrawn'];

export const Status: React.FC<StatusType> = ({ status }): JSX.Element => {
  console.log('proposal status:', status)
  const StatusStep: React.FC<{ active: boolean; text: string; position: string }> = ({ active, text, position }) => {
    return (
      <div className={`absolute ${position} top-1/2 h-6 w-6 -translate-y-1/2 -translate-x-1/2 rounded-full ${active ? 'bg-[#00ECBC]' : 'bg-[#D9D9D9]'}`}>
        <div className='absolute left-1/2 mt-8 -translate-x-1/2'>
          {text}
        </div>
      </div>
    );
  };

  const StatusBar: React.FC<{ step: number }> = ({ step }) => {
    const widthPercentage = ((step + 1) * 100) / 4;
    return (
      <>
        <div className='h-[13px] w-full rounded-full bg-[#D9D9D9]'></div>
        <div
          className='absolute bottom-0 left-0 top-0 h-[13px] rounded-full bg-[#00ECBC]'
          style={{ width: `${widthPercentage}%` }}
        ></div>
      </>
    );
  };

  return (
    <div className='mt-8 flex flex-col gap-12 pb-10'>
      <div className='border-b border-[#6D6D6D] pb-[14px] pr-20 text-[35px] font-semibold'>
        Claim Status
      </div>
      <div className='relative'>
        <StatusBar step={status !== undefined ? status : -1} />
        <StatusStep active={status !== undefined ? (status >= ProposalStatus.Submitted) : false} text={StatusText[0]} position="left-1/4" />
        <StatusStep active={status !== undefined  ? (status >= ProposalStatus.Pending) : false} text={StatusText[1]} position="left-2/4" />
        <StatusStep active={status !== undefined  ? (status >= ProposalStatus.Approved) : false} text={StatusText[2]} position="left-3/4" />
        <StatusStep active={status === ProposalStatus.Claimed} text={StatusText[3]} position="left-full" />
      </div>
      {/* Uncomment to render buttons for each status */}
      {/* {StatusText.map((text, index) => (
        <Button key={index} className='w-full' variant={status === index ? 'primary' : 'gradient-outline'} size='xl'>
          {text}
        </Button>
      ))} */}
    </div>
  );
};