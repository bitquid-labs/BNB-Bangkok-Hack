import { BQTokenContract } from '@/constant/contracts';
import { ChainType } from '@/lib/wagmi';
import { useAccount } from 'wagmi';

export const useAddToken = () => {
  const { chain } = useAccount();

  const addTokenToMetaMask = async () => {
    const tokenAddress =
      BQTokenContract.addresses[(chain as ChainType)?.chainNickName]; // Replace with your token contract address
    const tokenSymbol = 'BQ'; // Replace with your token's symbol (e.g., 'SYM')
    const tokenDecimals = 18; // Replace with your token's decimals (commonly 18 for ERC20 tokens)

    try {
      const wasAdded = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
          },
        },
      });

      if (wasAdded) {
        console.log('Token added successfully!');
      } else {
        console.log('Token addition was rejected.');
      }
    } catch (error) {
      console.error('There was an error adding the token:', error);
    }
  };

  return { addTokenToMetaMask };
};
