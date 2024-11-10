import React from 'react';

import { Switch } from '@/components/switch';

type CurrencyProps = {
  selectedType: number;
  onSelectProposalType: (index: number) => void;
};

export const SwitchProposal = ({
  onSelectProposalType,
  selectedType,
}: CurrencyProps): JSX.Element => {
  return (
    <div className='flex w-full flex-col items-center'>
      <Switch
        value={selectedType}
        handleSwitch={(e) => onSelectProposalType(e)}
        options={['Live Proposals', 'Past Proposals']}
      />
    </div>
  );
};
