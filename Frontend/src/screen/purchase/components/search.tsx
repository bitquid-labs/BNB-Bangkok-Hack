import React from 'react';

import { cn } from '@/lib/utils';

import Input from '@/components/input';

import { filters } from '@/screen/purchase/constants';

import { RiskType } from '@/types/main';

import SearchIcon from '~/svg/search.svg';
import SettingIcon from '~/svg/setting.svg';

type SearchType = {
  searchKeyword: string;
  setSearchKeyword: (value: string) => void;
  filterCategory: RiskType | undefined;
  setFilterCategory: (value: RiskType | undefined) => void;
};

export const Search: React.FC<SearchType> = ({
  filterCategory,
  setFilterCategory,
  searchKeyword,
  setSearchKeyword,
}): JSX.Element => {
  console.log('filtered category:', filterCategory)
  return (
    <div className='flex w-full flex-col gap-6'>
      <div className='flex items-center gap-2'>
        <Input
          className='rounded border border-[#6D6D6D] bg-transparent px-4 py-3'
          leftIcon={<SearchIcon className='h-5 w-5' />}
          placeholder='Search Covers'
          value={searchKeyword}
          onChange={(e) => {
            setSearchKeyword(e.target.value);
          }}
        />
        {/* <div className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#6D6D6D]'>
          <SettingIcon className='h-6 w-6' />
        </div> */}
      </div>
      <div className='flex w-full cursor-pointer items-center rounded border border-white/10 bg-white/5 p-[3px]'>
        <div className='relative flex w-full cursor-pointer flex-col items-center rounded md:flex-row md:gap-0'>
          {filters.map((opt, index) => (
            <div
              key={index}
              className={cn(
                'z-10 w-full py-3 text-center text-sm font-medium capitalize transition-all',
                filterCategory === opt.index ? 'text-white' : 'text-white/50 '
              )}
              onClick={() => setFilterCategory(opt.index)}
            >
              <div
                className={cn(
                  'flex justify-center border-r',
                  filterCategory === opt.index ?
                    'border-white/10 '
                    : 'border-transparent'
                )}
              >
                {opt.riskType}
              </div>
            </div>
          ))}
          <div
            className={cn(
              'absolute inset-y-0 hidden rounded bg-white/15 transition-all md:block'
            )}
            style={{
              width: `${100 / filters.length}%`,
              transform: `translateX(${(filterCategory === undefined ? 0 : filterCategory + 1) * 100}%)`,
            }}
          />
          <div
            className={cn(
              'absolute inset-x-0 rounded bg-white/15 transition-all md:hidden'
            )}
            style={{
              height: `${100 / filters.length}%`,
              transform: `translateY(${(filterCategory === undefined ? 0 : filterCategory + 1) * 100}%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
