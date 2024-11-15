# BQ Labs - Bitcoin Risk Economy Layer

## Overview

BQ Labs is pioneering the first Bitcoin Risk Management Layer, aiming to secure the Bitcoin ecosystem through a decentralized insurance infrastructure. The BQ Protocol provides a robust technical, operational, and legal framework that enables members to underwrite and trade risk as a liquid asset, purchase coverage, and efficiently assess claims. This protocol is designed to bring transparency, trust, and efficiency to the Bitcoin financial landscape.

## System Architecture

### Key Actors and Processes

The BQ Protocol is structured around three primary user roles, each interacting with the protocol’s layered architecture to facilitate decentralized risk management:

- **Proposers (Cover Buyers/Clients):**  
   Proposers utilize the platform to secure their Bitcoin-related financial activities, such as staking and smart contracts, by purchasing tailored insurance coverage. After connecting their non-custodial wallet, proposers can select from various coverage options based on their specific risk profiles. The claims process is managed through a decentralized governance model, involving risk assessors, validators, and underwriters, particularly for complex risk scenarios.

- **Stakers (Liquidity Providers):**  
   Stakers provide liquidity to insurance pools, earning returns on their investments. The protocol ensures full transparency of risk and yield details, allowing Stakers to make informed decisions. The capital provided by Stakers is deployed to cover risks during adverse events, ensuring a resilient insurance framework.

- **Governance Participants (BQ Token Holders):**  
   Governance participants hold BQ Tokens, enabling them to vote on proposals and participate in the decision-making process. The protocol incentivizes active participation by rewarding governance activities with BQ Tokens, fostering an engaged and informed community.

### Risk Infrastructure Layer

- **Governance and Pool Infrastructure:**  
   BQ Labs has established a series of credit-rated pools, categorized based on the various risks within the BTCFi space. All claim assessments are executed transparently and on-chain via a governance-based voting mechanism. Only BQ Token holders are authorized to vote on claims, ensuring that decision-making remains decentralized and secure.

## Core Features

**Users need to deposit tBNB or BTC from BSC testnet in order to get bqBTC ( native version of BTC on BSC testnet ) which is utilized as a unified asset for Cover purchase, Depositing into underwriting pools and claim payout.**

1. **Purchase Cover:**  
   Users can browse through a selection of risks, select a coverage tenure and amount, and secure their BTCFi position. This feature is fully integrated with non-custodial wallets, enabling seamless transactions.

2. **Stake:**  
   The staking module allows users to contribute assets to various credit-rated pools. The module provides real-time visibility into pool fund utilization, daily yield claims, and asset withdrawal upon the completion of the staking period.

3. **Claim Module:**  
   In the event of a risk occurrence, cover buyers can initiate a claim process to recover lost assets up to the value of their coverage. The module is designed to operate within the governance framework, ensuring that claims are assessed fairly and efficiently.

4. **Governance:**  
   This module facilitates the decentralized assessment of cover claims. BQ Token holders participate in voting on claims proposals, and those who make sound decisions are rewarded with additional BQ Tokens.

5. **Dynamic Pricing:**  
   The platform employs dynamic pricing algorithms to calculate cover capacity, pool ratios, and claim-based price discovery. This ensures that pricing remains fair and reflective of real-time risk assessments.

## Technical Details

- **Smart Contracts:** Developed using Solidity, with a focus on security, efficiency, and scalability.
- **Frontend:** Built using React.js, providing a responsive and user-friendly interface.
- **Wallet Integration:** Implemented using the Wagmi library, supporting various non-custodial wallets.
- **Blockchain:** The application is powered by the BSC testchain, ensuring high transaction throughput and minimal latency.
- **Storage:** All logos, images, and related assets are securely stored on IPFS, ensuring decentralized and immutable storage.

## Demo Link - https://www.youtube.com/watch?v=9bq0HZK90OY

## Deployed Contracts

Below is a list of the smart contracts deployed within the BQ Protocol:

1. **Cover Contract:** 0x52516dc76813a4f907fA6bAdD5d58bcB4D1E4511
2. **Governance Contract:** 0x976F240Efcd059df3c28E23f9CEb5DDF7a4cDdC5
3. **BQ Token:** 0x290946a5f508530023e08260B67957f408D6dB75
4. **BQBTC:** 0xFDf473d5F84182d58CD6008edF0DF97D8bd113e4
5. **Insurance Pool Contract:** 0xD80690394aAC140E8B42CE2eC42de51c8a7a0e39

## Conclusion

BQ Labs represents a significant advancement in the Bitcoin ecosystem by introducing a decentralized and robust risk management layer. By addressing the gaps in trust, transparency, and on-chain risk management, BQ Labs aims to become the go-to solution for insurance and risk mitigation in the BTCFi space. With its comprehensive technical framework and community-driven governance model, BQ Labs is poised to enhance the security and resilience of Bitcoin financial operations.
