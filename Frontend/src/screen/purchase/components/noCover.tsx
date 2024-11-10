import React, { useEffect, useRef, useState } from 'react';

import { useAccount } from 'wagmi';
import { useAllUserCovers } from '@/hooks/contracts/useAllUserCovers';
import { useRouter } from 'next/navigation';

import Button from '@/components/button/button';
import Image from "next/image";
import circularImage from '../image/circular.png';
import mImage from '../image/mshape.png';
import hourglassImage from '../image/hourglass.png';
import triangleImage from '../image/triangle.png';
import triangleImage2 from '../image/triangle2.png';


export const NoCoverScreen = (): JSX.Element => {
  const router = useRouter();
  const { address } = useAccount();
  const userCovers = useAllUserCovers(address as string);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const imgRef0 = useRef<HTMLImageElement>(null);
  const imgRef1 = useRef<HTMLImageElement>(null);
  const imgRef2 = useRef<HTMLImageElement>(null);
  const imgRef3 = useRef<HTMLImageElement>(null);
  const imgRef4 = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imgRef0.current || !imgRef1.current ||!imgRef2.current ||!imgRef3.current ||!imgRef4.current) return;
    const windowHeight = window.innerHeight;
    const originalHeight = 1024;
    imgRef0.current.style.height = `${windowHeight * 360 / originalHeight}px`;
    imgRef0.current.style.width = `${windowHeight * 180 / originalHeight}px`;
    imgRef1.current.style.height = `${windowHeight * 148 / originalHeight}px`;
    imgRef1.current.style.width = `${windowHeight * 148 / originalHeight}px`;
    imgRef2.current.style.height = `${windowHeight * 130 / originalHeight}px`;
    imgRef2.current.style.width = `${windowHeight * 130 / originalHeight}px`;
    imgRef3.current.style.height = `${windowHeight * 156 / originalHeight}px`;
    imgRef3.current.style.width = `${windowHeight * 156 / originalHeight}px`;
    imgRef4.current.style.height = `${windowHeight * 400 / originalHeight}px`;
    imgRef4.current.style.width = `${windowHeight * 400 / originalHeight}px`;
  }, [])

  return (
    <section className='flex h-full flex-auto flex-col relative'>
      <div className="w-full h-full absolute">
        <Image ref={imgRef0} src={circularImage} className="fixed top-[145px] right-0" alt='no cover' />
        <Image ref={imgRef1} src={mImage} className="fixed top-[145px] left-[314px]" alt='no cover' />
        <Image ref={imgRef2} src={hourglassImage} className="fixed bottom-[260px] left-[258px]" alt='no cover' />
        <Image ref={imgRef3} src={triangleImage} className="fixed top-[344px] left-[80px]" alt='no cover' />
        <Image ref={imgRef4} src={triangleImage2} className="fixed bottom-[79px] right-[18px]" alt='no cover' />
      </div>
      <div className='mx-auto w-full max-w-[1000px] mt-[215px]'>
        <div className='text-center text-[40px] font-bold'>
          My Covers
        </div>
        <div className='mt-[14px] text-center text-[30px]'>
          No Active Cover
        </div>
        <div className="flex items-center justify-center gap-[20px] my-[54px]">
          <Button
            variant='gradient'
            className="min-w-[180px]"
            isLoading={isLoading}
            size='lg'
            onClick={() => { router.push('/purchase') }}
          >
            Buy Covers
          </Button>
          <Button
            variant='outline'
            className="min-w-[180px]"
            isLoading={isLoading}
            size='lg'
            onClick={() => window.open('https://discord.com/invite/wrFmetGCa7')}
          >
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  )
};
