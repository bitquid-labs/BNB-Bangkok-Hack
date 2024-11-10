export const TERMSANDCONDITIONS = [
  [
    {
      title: "Inclusions:",
      content: [
        "Losses due to validator slashing events in BTCFi staking protocols, where the member’s stake is partially or fully forfeited due to:",
        "Double-signing or equivocation.",
        "Downtime or failure to maintain node availability as per the network’s rules.",
        "Participating in malicious or invalid transactions.",
      ]
    },
    {
      title: "Exclusions:",
      content: [
        "Losses resulting from voluntary unbonding or unstaking of tokens.",
        "Slashing penalties due to personal negligence in node maintenance or security.",
        "Manual or deliberate network misbehavior by the member."
      ]
    },  
  ],
  [
    {
      title: "Inclusions:",
      content: [
        "Losses resulting from:",
        "Exploits or vulnerabilities in the BTCFi protocol’s smart contract code that result in the loss or theft of funds.",
        "Misexecution of smart contract logic that leads to unexpected asset liquidation, withdrawal issues, or misallocation of funds.",
      ]
    },
    {
      title: "Exclusions:",
      content: [
        "Losses from personal misuse or errors when interacting with smart contracts (e.g., entering incorrect data, wrong transaction IDs).",
        "Failures related to network issues or congestion that cause delays but do not result in direct financial losses.",
        "Losses from non-audited or experimental protocols that have not undergone a formal security audit."
      ]
    },  
  ],
  [
    {
      title: "Inclusions:",
      content: [
        "Losses incurred due to stablecoin de-pegging when:",
        "The stablecoin’s price deviates by more than 10%-20% (TBD for different SCs) from its intended peg for over 48 hours.",
        "The stablecoin fails to maintain collateralization due to a smart contract bug or failure in the underlying protocol.",
      ]
    },
    {
      title: "Exclusions:",
      content: [
        "Losses from stablecoins backed by collateral that becomes illiquid but still operational.",
        "Losses from stablecoins explicitly labeled as algorithmic and subject to volatility.",
        "Losses related to stablecoins issued by centralized entities that experience bank runs or government sanctions.",
      ]
    },
  ],
  
  [
    {
      title: "Inclusions:",
      content: [
        "Losses caused by the complete or partial failure of the BTCFi protocol due to:",
        "Governance attacks (e.g., a malicious proposal resulting in the protocol behaving against its intended design).",
        "Misconfigurations in the protocol leading to unintentional liquidation of funds.",
        "Total shutdown or inability to function as designed due to internal protocol errors.",
      ]
    },
    {
      title: "Exclusions:",
      content: [
        "Losses due to protocol forks or upgrades that are not followed by the member.",
        "Regulatory or legal shutdowns that cause a protocol to halt operations.",
        "Market-related losses (e.g., the price of protocol tokens falling due to non-operational reasons).",
      ]
    },
  ],
]