import React from 'react';
import { useRouter } from 'next/navigation'
import RectButton from '@/components/button/rectButton'
import { IProduct } from "@/types/main";


type CoversType = {
  products: IProduct[]
}

export const Covers = (props: CoversType): JSX.Element => {
  const { products } = props;
  const router = useRouter();

  return (
    <div className='flex w-full flex-col gap-6'>
      <div className='text-[32px] font-bold leading-[40px]'>My Covers</div>
      <div className='grid grid-cols-3 gap-9'>
        {products.map((product, index) => (
          <RectButton 
            onClick={() => router.push(`/claim/?coverId=${product.coverId}`)}
            variant={product.isSelected ? 'default': 'outline'}
            key={index}
          >
            {product.name || ''}
          </RectButton>
        ))}
        {/* <RectButton>Babylon Slashing</RectButton>
        <RectButton variant='outline'>Palladium Stablecoin</RectButton>
        <RectButton variant='outline'>Stacking DAO Smart Contract</RectButton> */}
      </div>
    </div>
  );
};
