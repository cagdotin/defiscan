import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const chains = {
  Ethereum: {
    logo: "images/chains/ethereum.webp",
    fallback: "ETH",
    alt: "Ethereum Logo",
  },
  Base: {
    logo: "images/chains/base.webp",
    fallback: "BS",
    alt: "Base Logo",
  },
  Optimism: {
    logo: "images/chains/optimism.webp",
    fallback: "OP",
    alt: "Optimism Logo",
  },
  Arbitrum: {
    logo: "images/chains/arbitrum.webp",
    fallback: "ARB",
    alt: "Arbitrum Logo",
  },
};

export type ChainNames = keyof typeof chains;

export const Chain = ({
  name,
  className,
}: {
  name: ChainNames;
  className?: string;
}) => {
  const chain = chains[name];

  return (
    <Avatar
      className={cn(
        "w-6 h-6 border flex items-center justify-center bg-white",
        className
      )}
    >
      <AvatarImage className="w-4 h-4" src={chain.logo} alt={chain.alt} />
      <AvatarFallback>{chain.fallback}</AvatarFallback>
    </Avatar>
  );
};
