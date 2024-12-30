export interface FilterOption {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export const types: FilterOption[] = [
  {
    value: "Dexes",
    label: "Dexes",
    // icon: Circle,
  },
  {
    value: "CDP",
    label: "CDP",
  },
  {
    value: "Yield Lottery",
    label: "Yield Lottery",
  },
  {
    value: "Yield",
    label: "Yield",
  },
  {
    value: "Lending",
    label: "Lending",
  },
];

export const chains: FilterOption[] = [
  {
    value: "Ethereum",
    label: "Ethereum",
    // icon: Ethereum,
  },
  {
    value: "Arbitrum",
    label: "Arbitrum",
  },
  {
    value: "Base",
    label: "Base",
  },
  {
    value: "Optimism",
    label: "Optimism",
  },
];
