import React from 'react';

import { Link } from '@/components/layout/footer/components/link';

import Copy from '~/svg/copyright.svg';

const Footer = (): JSX.Element => {
  return (
    <footer className='w-full z-[99]'>
      <div className='layout border-border-100 flex w-[1250px] items-center justify-between border-t-[0.5px] h-[100px]'>
        <div className='flex items-center gap-2'>
          <Copy className='h-5 w-5' />
          <div>2024 BitQuid Labs. all Right Reserved</div>
        </div>
        {/* <div className='flex items-center gap-7'>
          <div>Contact Us</div>
          <div>Terms of Use</div>
          <div>Help Center</div>
        </div> */}
        <Link />
      </div>
    </footer>
  );
};

export default Footer;
