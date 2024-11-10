import { useAllAvailableCovers } from "@/hooks/contracts/useAllAvailableCovers";
import { bnToNumber, getRiskTypeName } from "@/lib/formulat";
import { RiskType } from "@/types/main";
import React, { useContext, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { CoverContext } from "@/contexts/CoverContext";

type ExploreType = {
  selectedCoverId: bigint | undefined;
  riskType: RiskType | undefined;
}

export const Explore: React.FC<ExploreType> = ({ selectedCoverId, riskType }): JSX.Element => {
  const availableCovers = useAllAvailableCovers();
  const router = useRouter();
  const { setSelectedCover } = useContext(CoverContext)!;

  const moreCovers = useMemo(() => {
    if (riskType === undefined) return;

    return availableCovers.filter((cover) => cover.riskType === riskType && cover.id !== selectedCoverId);
  }, [
    availableCovers,
    riskType
  ])

  return (
    <div className='flex min-w-[210px] flex-col gap-4 rounded-sm border border-white/10 bg-[#1E1E1E] px-8 py-[23px]'>
      <div className='border-border-100 w-fit min-w-[200px] border-b-[0.5px] pb-2 text-[20px] font-bold'>
        Explore More Covers
      </div>

      {moreCovers && moreCovers.slice(0, 3).map((cover, index) => {
        return (
          <div className='relative flex flex-col gap-[33px] rounded bg-[#373737] px-12 py-[34px] cursor-pointer' key={index} onClick={() => {
            setSelectedCover(cover);
            router.push(`/cover/${Number(cover.id)}`)
          }}>
            <div className='flex items-center gap-[14px]'>
              <div className='h-[47px] w-[47px] overflow-hidden rounded-full'>
                <img src={cover.CID} className='h-full w-full' alt='logo' />
              </div>
              <div className='flex flex-col gap-[5px]'>
                <div className='text-[18px] font-bold text-white'>{cover.coverName}</div>
                <div className='text-[#AFAFAF]'>{getRiskTypeName(cover.riskType)}</div>
              </div>
            </div>
            <div className='flex flex-col gap-4'>
              <div className='flex items-center justify-between'>
                <div>Annual Cost</div>
                <div className='font-bold'>{Number(cover.cost)} %</div>
              </div>
              <div className='flex items-center justify-between'>
                <div>Max Capacity</div>
                <div className='font-bold'>{bnToNumber(cover.maxAmount || 0n)}</div>
              </div>
            </div>
          </div>
        )
      })}

      {/* <div className='relative flex flex-col gap-[33px] rounded bg-[#373737] px-12 py-[34px]'>
        <div className='flex items-center gap-[14px]'>
          <div className='h-[47px] w-[47px] rounded-full bg-white'></div>
          <div className='flex flex-col gap-[5px]'>
            <div className='text-[18px] font-bold text-white'>Aave V2</div>
            <div className='text-[#AFAFAF]'>Smart Contract Vulnerability</div>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <div>Cover Value</div>
            <div className='font-bold'>2WBTC</div>
          </div>
          <div className='flex items-center justify-between'>
            <div>Cover Expiry</div>
            <div className='font-bold'>12.12.2024</div>
          </div>
        </div>
      </div>
      <div className='relative flex flex-col gap-[33px] rounded bg-[#373737] px-12 py-[34px]'>
        <div className='flex items-center gap-[14px]'>
          <div className='h-[47px] w-[47px] rounded-full bg-white'></div>
          <div className='flex flex-col gap-[5px]'>
            <div className='text-[18px] font-bold text-white'>Aave V2</div>
            <div className='text-[#AFAFAF]'>Smart Contract Vulnerability</div>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <div>Cover Value</div>
            <div className='font-bold'>2WBTC</div>
          </div>
          <div className='flex items-center justify-between'>
            <div>Cover Expiry</div>
            <div className='font-bold'>12.12.2024</div>
          </div>
        </div>
      </div>
      <div className='relative flex flex-col gap-[33px] rounded bg-[#373737] px-12 py-[34px]'>
        <div className='flex items-center gap-[14px]'>
          <div className='h-[47px] w-[47px] rounded-full bg-white'></div>
          <div className='flex flex-col gap-[5px]'>
            <div className='text-[18px] font-bold text-white'>Aave V2</div>
            <div className='text-[#AFAFAF]'>Smart Contract Vulnerability</div>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <div>Cover Value</div>
            <div className='font-bold'>2WBTC</div>
          </div>
          <div className='flex items-center justify-between'>
            <div>Cover Expiry</div>
            <div className='font-bold'>12.12.2024</div>
          </div>
        </div>
      </div> */}

      <div className='mt-5 flex w-full justify-center'>
        <div className='flex w-[180px] justify-center rounded border border-white py-[10px] text-center cursor-pointer'
          onClick={() => router.push('/purchase')}
        >
          View More
        </div>
      </div>
    </div>
  );
};
