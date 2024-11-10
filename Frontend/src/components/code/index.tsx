'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from 'react-device-detect';

import CodeGridcon from '~/images/logo.svg';
import DiscordIcon from '~/svg/discord.svg';
import LayersIcon from '~/svg/layers.svg';
import RightArrowIcon from '~/svg/right-arrow.svg';

export const Code = ({ onConfirm }: { onConfirm: () => void }): JSX.Element => {
  const router = useRouter();
  const [code, setCode] = useState<string>();
  const [isError, setIsError] = useState<boolean>(false);

  const handleConfirm = useCallback(() => {
    if (code === process.env.NEXT_PUBLIC_PASS_CODE) {
      localStorage.setItem('bq-code', 'true');
      onConfirm();
    } else {
      setIsError(true);
    }
  }, [code, onConfirm]);

  useEffect(() => {
    if (!code) setIsError(false);
  }, [code]);

  const handleKeyPress = (event: { key: string }) => {
    console.log('OK');
    if (event.key === 'Enter') {
      console.log('Enter key pressed');
      // Add any additional action you want when Enter is pressed
      handleConfirm();
    }
  };

  return !isMobile ? (
    <div className='relative flex h-screen w-full items-center justify-center overflow-hidden bg-black'>
      <div className='absolute bottom-0 right-0'>
        <LayersIcon className='h-[648px] w-[648px]' />
      </div>
      <div className='flex w-[350px] flex-col items-center gap-5'>
        <div>
          <CodeGridcon className='w-[150px]' />
        </div>
        <div className='relative w-full rounded border border-[#6D6D6D] px-5 py-[14px]'>
          <input
            type='password'
            className='border-none bg-transparent p-0 focus:border-none focus:outline-none focus:outline-offset-0 focus:ring-0'
            placeholder='Access Code'
            value={code || ''}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button
            className='absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer disabled:cursor-not-allowed'
            disabled={!code}
            onClick={handleConfirm}
          >
            <RightArrowIcon className='h-[18px] w-[28px]' />
          </button>
        </div>
        {isError && (
          <div className='text-xs text-red-600'>Incorrect passcode</div>
        )}
        <Link
          className='flex w-full items-center justify-between rounded bg-gradient-to-r from-[#2A2F6B] to-[#5866FF] px-5 py-[14px]'
          href='https://discord.gg/QU4YUgJMJJ'
        >
          <div>Get access through Discord</div>
          <DiscordIcon className='h-[24px] w-[32px]' />
        </Link>
      </div>
    </div>
  ) : (
    <>
      <div className='relative flex h-screen w-full items-center justify-center overflow-hidden bg-black'>
        <div className='absolute bottom-0 right-0'>
          <LayersIcon className='h-[648px] w-[648px] z-0' />
        </div>
        <div className='text-[16px] font-bold z-50'>
          Current devnet version supported only in desktop
        </div>
      </div>
    </>
  );
};
