'use client';

import { writeContract } from '@wagmi/core';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useContext, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { parseUnits } from 'viem';
import { useAccount } from 'wagmi';
import { useBalance } from 'wagmi';

import { config } from '@/lib/config';
import { bnToNumber, calculateCoverFee, numberToBN } from '@/lib/formulat';

import { MIN_COVER_PERIOD } from '@/constant/config';
import { ICoverContract } from '@/constant/contracts';
import { CoverContext } from '@/contexts/CoverContext';
import { Detail } from '@/screen/cover/components/detail';
import { Overview } from '@/screen/cover/components/overview';

import { CoverDueTo } from '@/types/main';

import LeftArrowIcon from '~/svg/left-arrow.svg';
import { Explore } from './explore';
import { ChainType } from '@/lib/wagmi';
import { useGetBalanceOfBQBTC } from '@/hooks/contracts/pool/useGetBalanceOfBQBTC';

export const CoverScreen = ({ id }: { id: number }): JSX.Element => {
  const router = useRouter();

  const { selectedCover } = useContext(CoverContext)!;
  const { address, chain } = useAccount();
  const bqBTCBalance = Number(useGetBalanceOfBQBTC()) / 10 ** 18;

  const [coverAmount, setCoverAmount] = useState<string>('');
  const [coverPeriod, setCoverPeriod] = useState<number>(MIN_COVER_PERIOD);
  const [coverDueTo, setCoverDueTo] = useState<CoverDueTo>(
    CoverDueTo.NoneSelected
  );

  console.log('bqBTCBalance:', bqBTCBalance)
  const coverFee = useMemo(
    () =>
      calculateCoverFee(
        parseFloat(coverAmount),
        Number(selectedCover?.cost) || 0,
        coverPeriod
      ),
    [coverAmount, coverPeriod, selectedCover?.cost]
  );
  const { data: balanceData } = useBalance({
    address: address as `0x${string}`,
    unit: 'ether',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const maxBalanceAmount = useMemo(() => {
    if (!balanceData) return 0;
    return bnToNumber(balanceData.value);
  }, [balanceData]);

  const maxCoverAmount = useMemo(() => {
    return bnToNumber(selectedCover?.maxAmount);
  }, [selectedCover?.maxAmount]);

  // useEffect(() => {
  //   if (!selectedCover) {
  //     // Redirect to the list page if no card is selected
  //     router.push('/purchase');
  //   }
  // }, [selectedCover, router]);

  if (!selectedCover) return <div>Loading...</div>;

  const handleBuyCover = async () => {
    const coverAmountNumber = parseFloat(coverAmount);

    console.log('cover amount', coverAmountNumber, 'max:', maxCoverAmount);
    console.log('Cover Fee: ', coverFee);
    
    if (Number(coverAmount) > bqBTCBalance) {
      toast.error('Insufficient funds for purchasing cover!');
      return;
    }

    if (coverAmountNumber > maxCoverAmount) {
      toast.error('Maximum Cover Available limit Exceeded');
      return;
    }

    setIsLoading(true);
    const params = [
      // selectedCover?.riskType,
      Number(selectedCover?.id),
      // selectedCover.coverName,
      numberToBN(coverAmount),
      coverPeriod,
      parseUnits(coverFee.toString(), 18),
    ];

    try {
      await writeContract(config, {
        abi: ICoverContract.abi,
        address: ICoverContract.addresses[(chain as ChainType)?.chainNickName],
        functionName: 'purchaseCover',
        args: params,
        // value: parseUnits(coverFee.toString(), 18),
        // chainId: 21000001,
      });

      setTimeout(() => {
        toast.success('Cover purchased!');
      }, 3000);
    } catch (err) {
      let errorMsg = '';
      if (err instanceof Error) {
        if (err.message.includes('InsufficientPoolBalance')) {
          errorMsg = 'Insufficient Pool Balance.';
        } else if (err.message.includes('User denied transaction signature')) {
          errorMsg = 'User denied transaction signature';
        } else {
          errorMsg = err.message;
        }
      } else {
        errorMsg = 'Unexpected error.';
      }
      toast.error(errorMsg);
    }
    setIsLoading(false);
  };

  const handleCoverAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCoverAmount(e.target.value);
  };

  const handleCoverPeriodChange = (val: number) => {
    setCoverPeriod(val);
  };

  const error = useMemo(() => {
    if (coverAmount === '') return 'Input Cover Amount';
    return '';
  }, [address, coverAmount]);

  return (
    <section className='flex h-full flex-auto flex-col'>
      <div className='layout flex flex-auto flex-col items-center gap-10 p-10'>
        <div className='flex w-full items-center justify-start gap-6'>
          <div
            className='bg-background-100 flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-full hover:bg-white/30 active:scale-95'
            onClick={() => router.push('/purchase')}
          >
            <LeftArrowIcon className='h-[13px] w-[23px]' />
          </div>
          <div className='text-[24px] font-bold leading-[50px]'>Buy Cover</div>
        </div>
        <div className='flex w-full items-start gap-10'>
          <div className='flex min-w-[630px] flex-1 flex-col gap-20 rounded-sm bg-[#1E1E1E] px-8 py-[23px]'>
            <Detail
              id={id}
              coverAmount={coverAmount}
              coverPeriod={coverPeriod}
              handleCoverAmountChange={handleCoverAmountChange}
              handleCoverPeriodChange={handleCoverPeriodChange}
              dueTo={coverDueTo}
              maxCoverAmount={maxCoverAmount}
              riskType={selectedCover?.riskType}
            />
            <Overview
              productName={selectedCover?.coverName || ''}
              coverAmount={coverAmount}
              annualCost={Number(selectedCover?.cost)}
              coverFee={coverFee}
              handleBuyCover={handleBuyCover}
              error={error}
              coverPeriod={coverPeriod}
              logo={selectedCover?.CID || ''}
              isLoading={isLoading}
            />
          </div>
          <Explore
            selectedCoverId={selectedCover.id}
            riskType={selectedCover?.riskType}
          />
        </div>
      </div>
    </section>
  );
};
