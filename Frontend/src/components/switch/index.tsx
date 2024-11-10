import clsx from 'clsx';
import React, { Dispatch, useRef, useState } from 'react';
import LeftArrowIcon from '~/svg/left-arrow.svg';

type Props = {
  options: string[];
  value?: number;
  handleSwitch?: Dispatch<number>;
};

export const Switch = ({ options, value = 0, handleSwitch }: Props) => {
  const [left, setLeft] = useState<number>(0);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const handleArrowClick = (direct: number): void => {
    const moveStep = 50;
    let newLeft = left + moveStep * direct;
    const wrapperWidth = wrapperRef.current?.offsetWidth || 0;
    if (options.length * 320 < wrapperWidth) return;

    if (newLeft > 0) {
      newLeft = 0;
    } else if (newLeft < (options.length * 320 - wrapperWidth) * -1) {
      newLeft = (options.length * 320 - wrapperWidth) * -1;
    }

    setLeft(newLeft);
  };

  return (
    <>
      <div
        className='bg-background-300 flex w-fit cursor-pointer items-center overflow-hidden rounded-[10px] p-1 '
        ref={wrapperRef}
      >
        <div
          className='wrap relative flex cursor-pointer flex-col items-center rounded-lg md:flex-row md:gap-0'
          style={{
            transform: `translateX(${left}px)`,
          }}
        >
          {options.map((opt, index) => (
            <div
              key={index}
              className={clsx(
                'z-10 w-[320px] py-3 text-center text-base capitalize transition-all',
                value === index ? 'text-background-400' : 'text-background-500 '
              )}
              onClick={() => handleSwitch && handleSwitch(index)}
            >
              {opt}
            </div>
          ))}
          <div
            className={clsx(
              'absolute inset-y-0 hidden rounded-lg bg-white transition-all md:block'
            )}
            style={{
              width: '320px',
              transform: `translateX(${value * 100}%)`,
            }}
          />
          <div
            className={clsx(
              'absolute inset-x-0 rounded-lg bg-white transition-all md:hidden'
            )}
            style={{
              height: `${100 / options.length}%`,
              transform: `translateY(${value * 100}%)`,
            }}
          />
        </div>
      </div>
      {/* <div className='my-[10px] flex w-full justify-end'>
        <div className='flex items-center gap-8'>
          <div
            onClick={() => handleArrowClick(1)}
            className='flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-full border border-white bg-transparent hover:bg-white/30 active:scale-95'
          >
            <LeftArrowIcon className='h-[13px] w-[23px]' />
          </div>
          <div
            onClick={() => handleArrowClick(-1)}
            className='flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-full border border-white bg-transparent hover:bg-white/30 active:scale-95'
          >
            <LeftArrowIcon className='h-[13px] w-[23px] rotate-180' />
          </div>
        </div>
      </div> */}
    </>
  );
};
