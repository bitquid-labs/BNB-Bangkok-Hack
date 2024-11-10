'use client';

import Link from 'next/link';
import React from 'react';

import { Menu } from '@/components/layout/header/components/menu';
import { ConnectWalletButton } from '@/components/layout/header/components/wagmiConnect';
import NextImage from '@/components/NextImage';

const Header = (): JSX.Element => {
  return (
    <nav className='sticky top-0 z-[999]'>
      <div className="w-full from-background-100 border-b bg-gradient-to-br to-[#0C0C0C] h-[100px] border-border-100">
        <div className='flex w-full h-full max-w-[1250px] items-center justify-between gap-0 mx-auto'>
          <Link href='/'>
            <NextImage
              useSkeleton
              src='/images/logo.png'
              width={132}
              height={32.55}
              alt='logo'
            />
          </Link>
          <div className='flex h-full items-center justify-end gap-12'>
            <div className='flex h-full flex-auto'>
              <Menu />
            </div>
            <div>
              <ConnectWalletButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
