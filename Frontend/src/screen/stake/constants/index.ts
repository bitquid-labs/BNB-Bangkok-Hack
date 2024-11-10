export enum StackDetail {
  rating = 'Pool Rating',
  apy = 'APY',
  currency = 'Currency',
  tenure = 'Min Tenure',
  poolId = '1',
  tvl = '10000',
}
export enum MyStackDetail {
  rating = 'Pool Rating',
  dailyPayout = 'Daily Payout',
  apy = 'APY',
  currency = 'Currency',
  accruedPayout = 'Accrued Yield',
  // claim = 'Total Staked Value',
  depositAmount = 'Staked Value',
  tenure = 'Min Tenure',
  poolId = '1',
  tvl = '10000',
}

export type StakeType = {
  [key in keyof typeof StackDetail]: string | undefined;
};

export type MyStakeType = {
  [key in keyof typeof MyStackDetail]: string | undefined;
};
