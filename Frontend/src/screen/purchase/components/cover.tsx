import { useRouter } from 'next/navigation';
import React, { useCallback, useContext, useMemo } from 'react';

import Button from '@/components/button/button';

import { CoverType } from '@/screen/purchase/types';
import { ICover } from '@/types/main';
import { CoverContext } from '@/contexts/CoverContext';
import { bnToNumber, getRiskTypeName } from '@/lib/formulat';

export type CoverProps = {
  cover: ICover,
  disabled: boolean;
};

export const Cover: React.FC<CoverProps> = (props): JSX.Element => {
  const { coverName, chains, cost, capacity, id, riskType, maxAmount, CID } =
    props.cover;
  const riskTypeName = getRiskTypeName(riskType);
  const annualCost = useMemo(() => {
    return Number(cost);
  }, [cost]);

  const { setSelectedCover } = useContext(CoverContext)!;
  const router = useRouter();

  const handleLinkDetail = useCallback(
    (cover: ICover) => {
      setSelectedCover(cover);
      router.push(`/cover/${id}`);
    },
    [id, router]
  );

  return (
    <div className='flex w-full flex-col gap-5 rounded-[5px] bg-[#1E1E1E] p-3'>
      <div className='bg-gradient-to-r from-[#3D3D3D] to-[#303030] p-5'>
        <div className='flex items-center gap-[10px]'>
          <div className='h-[60px] w-[60px] overflow-hidden rounded-full'>
            <img src={CID} className='h-full w-full' alt='logo' />
          </div>
          <div className='flex flex-col gap-1'>
            <div className='text-lg font-semibold leading-[22px]'>
              {coverName}
            </div>
            <div className='flex items-center gap-1'>
              {/* <div className='h-5 w-5 rounded-full bg-white' /> */}
              {riskTypeName && (
                <div className='text-sm text-[#AFAFAF]'>{riskTypeName}</div>
              )}
            </div>
          </div>
        </div>
        <div className='my-[20px] mb-20 flex flex-col gap-4'>
          {/* {items.map((item, i) => (
          <div key={i} className='text-base capitalize leading-[20px]'>
            {item}
          </div>
        ))} */}
          <div className='flex items-center justify-between text-base capitalize leading-[20px]'>
            <div>chains</div>
            <div className='font-semibold'>{chains}</div>
          </div>
          <div className='flex items-center justify-between text-base capitalize leading-[20px]'>
            <div>Annual Cost</div>
            <div className='font-semibold'>{annualCost} %</div>
          </div>
          <div className='flex items-center justify-between text-base capitalize leading-[20px]'>
            <div>Max Capacity</div>
            <div className='font-semibold'>{bnToNumber(maxAmount || 0n)}{' '}BTC</div>
          </div>
        </div>
      </div>
      <div className='flex justify-center'>
        <Button
          size='lg'
          className='min-w-[216px] rounded-sm bg-gradient-to-r from-[#00ECBC] to-[#005746]'
          onClick={() => handleLinkDetail(props.cover)}
          disabled={props.disabled}
        >
          Buy Cover
        </Button>
      </div>
    </div>
  );
};
