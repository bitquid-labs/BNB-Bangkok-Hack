import { TempProposalType } from '@/screen/governance/constants';
import { covers, filters, riskTypes } from '@/screen/purchase/constants';
import { MyStakeType, StakeType } from '@/screen/stake/constants';
import { InsurancePoolType, PoolCoverType, ProposalType } from '@/types/main';
import clsx, { ClassValue } from 'clsx';
import { Cpu } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { useAccount } from 'wagmi';

const pieChartColors = [
  '#00d4e1',
  '#00a5d4',
  '#00b5e1',
  '#00a2c4',
  '#0096d6',
  '#00b1e6',
  '#0089d6',
];

/** Merge classes with tailwind-merge with clsx full feature */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertTvl = (amount: number) => {
  return amount / 10 ** 18;
};

export const convertAmount = (amount: string | undefined): string => {
  const num = Number(amount) * 10 ** 8;
  return num.toString() + '0000000000';
};

export const convertStakeTypeData = (
  data: InsurancePoolType[],
  symbol: string | undefined,
): StakeType[] => {
  const result: StakeType[] = [];
  for (let i = 0; i < data.length; i++) {
    const tvl = convertTvl(Number(data[i].tvl));
    result.push({
      rating: data[i].poolName,
      apy: `${data[i].apy}%`,
      currency: symbol,
      tenure: `${data[i].minPeriod} days`,
      poolId: (i + 1).toString(),
      tvl: tvl.toString(),
    });
  }
  return result;
};

export const convertTempProposalTypeData = (
  data: ProposalType[],
  symbol: string | undefined
): TempProposalType[] => {
  data.sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
  const result: any[] = [];
  for (let i = 0; i < data.length; i++) {
    const tvl = convertTvl(Number(data[i].proposalParam.claimAmount));
    const timeleft = data[i].timeleft ? data[i].timeleft + ' Mins' : '5 Mins';
    result.push({
      type: `${riskTypes[Number(data[i].proposalParam.riskType)]?.toString()}`,
      incentive: `${tvl} BQ`,
      value: `${tvl} ` + symbol,
      timeleft: timeleft,
    });
  }
  return result;
};

export const convertMyStakeTypeData = (
  data: InsurancePoolType[],
  symbol: string | undefined
): MyStakeType[] => {
  console.log('mystakes size is', data, data.length);
  const result: MyStakeType[] = [];
  for (let i = 0; i < data.length; i++) {
    const tvl = convertTvl(Number(data[i].tvl));
    const dailyPayout = convertTvl(Number(data[i].dailyPayout));
    const depositAmount = convertTvl(Number(data[i].depositAmount));
    const accruedPayout = convertTvl(Number(data[i].accruedPayout));
    result.push({
      rating: data[i].poolName,
      apy: `${data[i].apy}%`,
      currency: symbol,
      tenure: `${data[i].minPeriod} days`,
      dailyPayout: `${dailyPayout.toFixed(5)} ` + symbol,
      accruedPayout: `${accruedPayout.toFixed(5)} ` + symbol,
      depositAmount: `${depositAmount} ` + symbol,
      // claim: `${tvl} BTCP`,
      poolId: data[i].poolId.toString(),
      tvl: tvl.toString(),
    });
  }
  return result;
};

export const convertPoolCoversData = (data: PoolCoverType[]): any[] => {
  const result: any[] = [];
  for (let i = 0; i < data.length; i++) {
    result.push({
      title: data[i].coverName,
      value: Number(data[i].capacity),
      color: pieChartColors[i],
    });
  }
  return result;
};
