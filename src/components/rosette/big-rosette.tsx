"use client";
import { RoundedWarningIcon } from "./icons/rounded-warning";
import { cn } from "./helper/cn";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip/tooltip";
import { SentimentText } from "./sentiment-text";
// import { WarningBar } from "../../warning-bar";
import {
  RosetteTooltipContextProvider,
  useRosetteTooltipContext,
} from "./rosette-tooltip-context";
import { type RosetteValue } from "./types";
import { PizzaRosetteIcon } from "./rosette-icon";
import { PizzaRosetteLabels } from "./rosette-labels";

export interface BigPizzaRosetteProps {
  values: RosetteValue[];
  isUpcoming?: boolean;
  isUnderReview?: boolean;
  className?: string;
}

export interface ContentState {
  risk: RosetteValue;
  side: "top" | "bottom";
  sideOffset: number;
}

export function BigPizzaRosette(props: BigPizzaRosetteProps) {
  const isUnderReview =
    !!props.isUnderReview ||
    Object.values(props.values).some(
      ({ sentiment }) => sentiment === "UnderReview"
    );

  if (isUnderReview || props.isUpcoming) {
    return (
      <div
        className={cn(
          "relative h-[200px] w-[200px] whitespace-pre p-8 text-center text-xs font-medium uppercase leading-tight",
          props.className
        )}
      >
        <PizzaRosetteIcon
          values={props.values}
          isUnderReview={isUnderReview}
          className={cn(props.isUpcoming && "opacity-30")}
        />
        <PizzaRosetteLabels
          values={props.values}
          containerSize={252}
          textRadius={102}
        />
      </div>
    );
  }

  return (
    <RosetteTooltipContextProvider>
      <Tooltip>
        <div
          className={cn("relative w-[272px] p-12", props.className)}
          data-rosette-hover-disabled={isUnderReview || props.isUpcoming}
        >
          <TooltipTrigger>
            <PizzaRosetteIcon
              values={props.values}
              isUnderReview={isUnderReview}
            />
          </TooltipTrigger>
          <PizzaRosetteLabels
            values={props.values}
            containerSize={272}
            textRadius={102}
          />
        </div>
        <RosetteTooltipContent />
      </Tooltip>
    </RosetteTooltipContextProvider>
  );
}

function RosetteTooltipContent() {
  const context = useRosetteTooltipContext();
  const content = context?.content;
  if (!content) return null;

  return (
    <TooltipContent
      side={content.side}
      sideOffset={content.sideOffset}
      onPointerDownOutside={(e) => {
        e.preventDefault();
      }}
      className="w-[300px]"
    >
      <SentimentText
        sentiment={content.risk.sentiment}
        className="flex items-center gap-1 font-medium"
      >
        {content.risk.value || ""}
      </SentimentText>
      {/* {content.risk.warning && (
        <WarningBar
          className="mb-2"
          icon={RoundedWarningIcon}
          text={content.risk.warning.value}
          color={content.risk.warning.sentiment === "low" ? "red" : "yellow"}
        />
      )} */}
      <span className="text-xs">{content.risk.description}</span>
    </TooltipContent>
  );
}
