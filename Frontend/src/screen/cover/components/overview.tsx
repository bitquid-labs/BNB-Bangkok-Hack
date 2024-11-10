import React, { useMemo, useState } from 'react';

import Button from '@/components/button/button';
import Dropdown from '@/components/dropdown';
import { useAccount } from 'wagmi';
import { useAllAvailableCovers } from '@/hooks/contracts/useAllAvailableCovers';
import { formatDate } from '@/lib/formulat';
import { ConnectWalletButton } from '@/components/layout/header/components/wagmiConnect';
import { BQBTC } from '@/constant/config';

type OverViewProps = {
  handleBuyCover: () => void;
  error: string;
  productName: string;
  coverAmount: string;
  annualCost: number;
  coverFee: number;
  coverPeriod: number;
  logo: string;
  isLoading: boolean;
};

export const Overview = (props: OverViewProps): JSX.Element => {
  const {
    handleBuyCover,
    error,
    productName,
    coverAmount,
    annualCost,
    coverFee,
    coverPeriod,
    logo,
    isLoading,
  } = props;

  // const {slashingCovers: slasing} = useAllAvailableCovers();

  const [selectedToken, setSelectedToken] = useState<number>(0);
  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setDate((startDate.getDate() + coverPeriod) | 0);
  const { address, chain } = useAccount();

  return (
    <div className='flex flex-col gap-4'>
      <div className='border-border-100 w-fit min-w-[200px] border-b-[0.5px] pb-2 text-[20px] font-bold'>
        Cover Overview
      </div>
      <div className='relative flex flex-col gap-4 rounded border border-white/10 bg-[#373737] px-12 py-[34px]'>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <div>Product</div>
            <div className='flex items-center gap-[10px]'>
              <div className='h-[32px] w-[32px] overflow-hidden'>
                <img
                  className='h-full w-full rounded-full'
                  src={logo}
                  alt='logo'
                />
              </div>
              {/* <div className='bg-background-200 h-5 w-5 rounded-full' /> */}
              <div>{productName}</div>
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex gap-[10px]'>
              <div>Cover amount</div>
              {/* <div className='bg-background-200 h-5 w-5 rounded-full' /> */}
            </div>
            <div className='flex gap-[10px]'>
              <div className='font-semibold'>
                {coverAmount} {BQBTC.symbol}
              </div>
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex gap-[10px]'>
              <div>Cover period</div>
              {/* <div className='bg-background-200 h-5 w-5 rounded-full' /> */}
            </div>
            <div className='font-semibold'>
              {formatDate(startDate)} - {formatDate(endDate)}
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex gap-[10px]'>
              <div>Yearly Cost</div>
              {/* <div className='bg-background-200 h-5 w-5 rounded-full' /> */}
            </div>
            <div className='font-semibold'>{annualCost}%</div>
          </div>
          <div className='bg-border-100 h-[0.5px] w-full'></div>
        </div>
        <div className='flex items-center justify-between'>
          <div className=''>Cover fee</div>
          <div className='flex items-center gap-2'>
            {!!coverFee && <div>{coverFee.toFixed(coverFee ? Math.max(Math.round(Math.log10(1 / Math.abs(coverFee))), 5) : 5)}</div>}
            {/* <Dropdown
              value={selectedToken}
              setValue={setSelectedToken}
              options={['WBTC', 'WETH', 'USDC']}
            /> */}
            <div className='rounded-full bg-[#d9d9d933] px-[25px] py-[5px]'>
              {BQBTC.symbol}
            </div>
          </div>
        </div>
      </div>
      <div className='mb-2 mt-4 flex justify-center'>
        {address && (
          <Button
            isLoading={isLoading}
            className='w-fit min-w-[216px] rounded bg-gradient-to-r from-[#00ECBC] to-[#005746] px-5 py-3 text-center'
            onClick={handleBuyCover}
            disabled={!!error}
          >
            {error || 'Buy Cover'}
          </Button>
        )}
        {!address && <ConnectWalletButton />}
      </div>
    </div>
  );
};
