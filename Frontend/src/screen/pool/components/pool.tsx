import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';

import { convertPoolCoversData } from '@/lib/utils';
import { usePoolCovers } from '@/hooks/contracts/pool/usePoolCovers';

import { Currency } from '@/screen/pool/components/currency';
import { Detail } from '@/screen/pool/components/detail';
import { StakeType } from '@/screen/stake/constants';
import PieRadius from './chart';

export const PoolScreen = ({
  symbol,
  pools,
  poolId,
}: {
  symbol: string;
  poolId: string;
  pools: StakeType[];
}): JSX.Element => {
  const pool = pools.find((stake) => stake.poolId === poolId);
  const [data, setData] = useState<any[]>([]);
  // const data = [
  //   { title: 'Merlin', value: 20, color: '#c94047' },
  //   { title: 'Babylon', value: 15, color: '#dcde8a' },
  //   { title: 'PWR', value: 60, color: '#519e60' },
  // ];

  const poolCovers = usePoolCovers(poolId);
  useEffect(() => {
    if (poolCovers) {
      console.log('poolCovers', poolCovers);
      setData(convertPoolCoversData(poolCovers));
      // setMyStacks(convertStakeTypeData(insurancePools as InsurancePoolType[]));
    }
  }, [poolCovers]);

  // console.log("pool is ", pool);
  return (
    <section className='flex h-full flex-auto flex-col'>
      <div className='layout flex flex-auto gap-10 p-10 pt-12'>
        <div className='flex w-full flex-col gap-10'>
          <Detail pool={pool} />
          <Currency pool={pool} />
        </div>
        <div className='flex h-auto w-full flex-col gap-4 rounded-sm bg-[#1E1E1E] p-[15px]'>
          <div className='flex items-center gap-[22px]'>
            <div className='w-fit min-w-[200px] text-[30px] font-bold'>
              Risk Covered:
            </div>
            <div className='h-[1px] flex-1 bg-white/50'></div>
          </div>

          <div className='flex w-full items-center justify-center'>
            <div className='flex w-full flex-col items-center gap-6'>
              <div className='p-10'>
                <PieRadius pool={pool} poolCovers={poolCovers} />
              </div>
              <div className='mt-[40px] relative flex w-full flex-col gap-4 rounded border border-white/10 bg-[#373737] px-12 py-[34px]'>
                <div className='grid w-full grid-cols-2 justify-between gap-[50px]'>
                  {data.map((key, i) => (
                    <div key={key} className='relative flex flex-col items-start pl-8 text-[20px]'>
                      <div
                        className='absolute left-0 top-1/2 h-[15px] w-[15px] -translate-y-1/2 rounded'
                        style={{ background: data[i].color }}
                      ></div>
                      <div>{data[i].title}</div>
                      <div className='font-bold'>{data[i].value}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
