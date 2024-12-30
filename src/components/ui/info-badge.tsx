import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../rosette/tooltip/tooltip";
import { stageToRequisites } from "@/app/protocols/stageToRequisites";
import { Stage } from "@/lib/types";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  stage: Stage;
}

// Badge component
function InfoBadge({ className, variant, stage, ...props }: BadgeProps) {
  return (
    <Tooltip>
      <TooltipTrigger className="flex size-4/5 lg:size-full items-center justify-start">
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
      </TooltipTrigger>
      <TooltipContent fitContent className="border shadow-none">
        <BadgeTooltip stage={stage} />
      </TooltipContent>
    </Tooltip>
  );
}

// BadgeTooltip component
export function BadgeTooltip({ stage }: { stage: Stage }) {
  return (
    <div className="flex flex-col">
      <span className="text-base font-bold">
        <span className="mr-2">Stage of Decentralisation</span>
      </span>
      <div className="relative flex flex-col justify-center py-4 max-w-md font-mono">
        {stageToRequisites[stage].map((item, index) => (
          <div key={index} className="mt-1">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export { InfoBadge, badgeVariants };
