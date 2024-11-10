import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { cn, convertStakeTypeData } from '@/lib/utils';
import Button from '@/components/button/button';
import LeftArrowIcon from '~/svg/left-arrow.svg';

import { useAccount } from 'wagmi';
import { MyStackDetail, StakeType } from '@/screen/stake/constants';
import { useAllInsurancePools } from '@/hooks/contracts/pool/useAllInsurancePools';
import DepositModal from './deposit';
import { BQBTC } from '@/constant/config';

export type InsurancePoolType = {
  poolName: string;
  poolId: Number;
  dailyPayout: string;
  depositAmount: string;
  accruedPayout: string;
  apy: number;
  minPeriod: number;
  acceptedToken: string;
  tvl: number;
  tcp: number;
  isActive: boolean;
};

export const StakeScreen = (): JSX.Element => {
  const { chain } = useAccount();
  const insurancePools = useAllInsurancePools();
  const [myStacks, setMyStacks] = useState<StakeType[]>([]);

  useEffect(() => {
    if (insurancePools) {
      setMyStacks(
        convertStakeTypeData(
          insurancePools as InsurancePoolType[],
          BQBTC.symbol
        )
      );
    }
  }, [insurancePools]);

  return (
    <section className='flex h-full flex-auto flex-col'>
      <div className='layout flex flex-auto flex-col items-center gap-10 p-10 pt-12'>
        <div className='text-[40px] font-bold leading-[50px]'>
          Stake Idle Assets To Secure And Earn
        </div>
        <div className='flex w-full flex-col gap-5'>
          {myStacks.map((stack, index) => (
            <div
              key={index}
              className='flex w-full gap-[30px] rounded bg-[#1E1E1E] px-[60px] py-[25px]'
            >
              {Object.keys(stack).map((key, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex w-full flex-col items-center gap-6',
                    (key === 'poolId' || key === 'tvl') && 'hidden'
                  )}
                >
                  <div
                    className={cn(
                      'flex h-10 w-full items-center justify-center rounded border border-white/10 bg-white/5 px-5 text-sm'
                    )}
                  >
                    {MyStackDetail[key as keyof typeof MyStackDetail]}
                  </div>
                  <div className='font-semibold'>
                    {stack[key as keyof typeof stack]}
                  </div>
                </div>
              ))}
              <div className='flex w-full flex-col items-center gap-[15px]'>
                <DepositModal
                  index={index + 1}
                  currency={stack.currency}
                  tenure={stack.tenure}
                />
                <div className='flex h-10 w-full items-center justify-center rounded bg-white px-5 py-[11px]'>
                  <Link
                    href={`/pool/${stack.currency}/${index + 1}`}
                    className='font-semibold text-[black]'
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='flex w-full items-center justify-between'>
          <div className='flex items-center gap-6'>
            <div className='text-2xl font-semibold'>
              Looking for custom solutions for your business
            </div>
            <a href='https://discord.gg/QU4YUgJMJJ'>
              <Button
                variant='primary'
                size='lg'
                className='rounded-[10px] bg-none text-[#00ECBC] outline outline-[#00ECBC]'
              >
                Reach out to us
              </Button>
            </a>
          </div>
          <div className='flex items-center gap-8'>
            <div className='flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-full border border-white bg-transparent hover:bg-white/30 active:scale-95'>
              <LeftArrowIcon className='h-[13px] w-[23px]' />
            </div>
            <div className='flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-full border border-white bg-transparent hover:bg-white/30 active:scale-95'>
              <LeftArrowIcon className='h-[13px] w-[23px] rotate-180' />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
