import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Stage } from "@/lib/types";
import { stageToRequisites } from "@/app/protocols/stageToRequisites";
import { HoverCard } from "./ui/hover-card";
import { HoverCardContent, HoverCardTrigger } from "@radix-ui/react-hover-card";
export interface BadgeProps {
  className?: string;
  stage: Stage;
}

export function StageBadge({ className, stage }: BadgeProps) {
  return (
    <HoverCard>
      <HoverCardTrigger>
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
      </HoverCardTrigger>
      <HoverCardContent
        className="bg-background z-50 border p-4"
        side="top"
        sideOffset={4}
      >
        <div className="flex flex-col">
          <span className="text-base font-bold">
            <span className="mr-2">Stage of Decentralisation</span>
          </span>

          <div className="relative flex flex-col justify-center py-4 max-w-md font-mono text-xs">
            {stageToRequisites[stage].map((item, index) => (
              <div key={index} className="mt-1">
                {item}
              </div>
            ))}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
