import React, { useContext } from 'react';

import { Cover } from '@/screen/purchase/components/cover';
import { useAccount } from "wagmi";
import { ICover } from "@/types/main";

type ListType = {
  covers: ICover[];
  userCoverIds: (bigint | undefined)[];
}

export const List: React.FC<ListType> = ({covers, userCoverIds}): JSX.Element => {
  return (
    <div className='grid w-full grid-cols-3 gap-[38px]'>
      {covers.map((cover: ICover, index) => (
        <Cover key={index} cover={cover} disabled={userCoverIds.includes(cover.id!)} />
      ))}
    </div>
  );
};
