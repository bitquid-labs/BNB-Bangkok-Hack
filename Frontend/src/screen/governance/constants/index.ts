export enum ProposalDetail {
  type = 'Claim Type',
  incentive = 'Incentive',
  value = 'Claim Value',
  timeleft = 'Proposal Duration',
}

export type TempProposalType = {
  [key in keyof typeof ProposalDetail]?: string | undefined;
};

export const tempProposlas: TempProposalType[] = [
  {
    type: 'Smart Contract',
    incentive: '50 BTCP',
    value: '2 WBTC',
    timeleft: '10 days',
  },
  {
    type: 'Stable Coin',
    incentive: '50 BTCP',
    value: '5000 USDC',
    timeleft: '10 days',
  },
];
