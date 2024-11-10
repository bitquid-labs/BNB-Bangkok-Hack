'use client';

import React, { useEffect, useState } from 'react';

import { PoolScreen } from '@/screen/pool';
import { convertStakeTypeData, convertTvl } from '@/lib/utils';
import { useAllInsurancePools } from '@/hooks/contracts/pool/useAllInsurancePools';
import { useAccount } from 'wagmi';

export const DefaultClientPage = ({
  params: { currency, poolid },
}: {
  params: { currency: string, poolid: string };
}): JSX.Element => {
  const {chain} = useAccount();
  const pools = useAllInsurancePools();
  return <PoolScreen symbol={currency} pools={convertStakeTypeData(pools, chain?.nativeCurrency.name)} poolId={poolid} />;
};
