'use client';

import React, { useEffect, useState } from 'react';

import { Code } from './code';
import NextImage from './NextImage';

const WithSession = (Component: any) => {
  return function WithSessionComponent({ ...props }) {
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

    useEffect(() => {
      if (isMounted) {
        const code = localStorage.getItem('bq-code');
        setIsConfirmed(code === 'true');
      }
    }, [isMounted]);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    if (!isMounted)
      return (
        <div className='flex h-screen w-full items-center justify-center bg-black'>
          <div className='flex flex-col items-center gap-2'>
            <NextImage
              useSkeleton
              src='/images/logo.png'
              width={231}
              height={51}
              alt='logo'
            />
            <div className='relative h-[2px] w-64 overflow-hidden bg-gray-500'>
              <div className='animate-loading-line absolute inset-0 bg-[#00ECBC]'></div>
            </div>
          </div>
        </div>
      );
    if (!isConfirmed) return <Code onConfirm={() => setIsConfirmed(true)} />;
    return <Component {...props} />;
  };
};

export default WithSession;
