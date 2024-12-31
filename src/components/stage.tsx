import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Stage } from "@/lib/types";
import { stageToRequisites } from "@/app/protocols/stageToRequisites";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./rosette/tooltip/tooltip";

export interface BadgeProps {
  className?: string;
  stage: Stage;
}

export function StageBadge({ className, stage }: BadgeProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="">
          <Badge
            variant="outline"
            className={cn(
              "border-none text-white rounded mx-auto bg-gray-500 hover:bg-gray-600 flex justify-center",
              stage === 0 && "bg-red-500 hover:bg-red-600",
              stage === 1 && "bg-yellow-500 hover:bg-yellow-600",
              stage === 2 && "bg-green-500 hover:bg-green-600",
              className
            )}
          >
            {stage === "R" && "Review"}
            {stage === "V" && "Variable"}
            {typeof stage === "number" && `Stage ${stage}`}
          </Badge>
        </TooltipTrigger>
        <TooltipContent fitContent className="border shadow-none z-50">
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
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
