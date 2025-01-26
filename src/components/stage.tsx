import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Reason, Stage } from "@/lib/types";
import { HoverCard } from "./ui/hover-card";
import { HoverCardContent, HoverCardTrigger } from "@radix-ui/react-hover-card";

const risks = {
  "Central Custody":
    "All or some assets are in custody by a centralized entity.",
  "Missing Docs":
    "All or some protocol components and expected performance is not publicly documented.",
  "Closed-Source":
    "All or some smart contracts are not published with available source code.",
  "Unverified Contracts":
    "All or some smart contracts are not verified with a public blockchain explorer.",
};

const requisites: { [K in Stage]: (reasons?: Reason[]) => React.JSX.Element } =
  {
    O: (reasons?: Reason[]) => (
      <div>
        <p>Project does currently not meet following Stage 0 requirements:</p>
        {reasons!.map((r: Reason) => (
          <p>
            <b>{r}:</b> {risks[r]}
          </p>
        ))}
      </div>
    ),
    R: () => <p>Currently in review</p>,
    V: () => <p>Varies based on chain, expand row for more info</p>,
    "0": () => (
      <p>
        ✅ The financial app is blockchain-based. <br />
        ✅ All assets are not in custody by a centralized entity.
        <br />
        ✅ All protocol components and the expected performance is publicly
        documented.
        <br />
        ✅ All smart contracts are published with available source code.
        <br />
      </p>
    ),
    "1": () => (
      <div>
        <p>
          Risks from critical permissions and dependencies are significantly
          reduced by:
        </p>
        <ul className="list-disc">
          <li>
            <i>either</i> revoking critical permissions{" "}
          </li>
          <li>
            <i>or</i> establishing a Security Council to control such
            permissions
          </li>
          <li>
            <i>or</i> enforcing an exit window of at least 7 days so users can
            withdraw funds in case of an unwanted protocol update.
          </li>
        </ul>
        <p>
          Critical risks from external dependencies are mitigated by the
          implementation of appropriate fallback mechanisms.
        </p>
        <p className="mt-4">
          Furthermore, the underlying chain cannot censor users’ transactions
          and a backup user interface exists guaranteeing access to user funds.
        </p>
      </div>
    ),
    "2": () => (
      <div>
        <p>
          Critical permissions have either been revoked or delegated to an
          on-chain governance system with ample time for users to exit in case
          of an unwanted protocol update. Risks from external dependencies have
          been further reduced such that users’ funds and unclaimed yield remain
          unaffected by a failure.
        </p>
        <p>
          In addition, different independent user interfaces and a fully
          decentralized underlying chain guarantee access to users’ funds at any
          time.
        </p>
      </div>
    ),
  };

const buildStageInfo = (stage: Stage, reasons?: Reason[]) =>
  requisites[stage](reasons);

export interface BadgeProps {
  className?: string;
  stage: Stage;
  reasons?: Reason[];
}

// colors

export function StageBadge({ className, stage, reasons }: BadgeProps) {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Badge
          variant="outline"
          className={cn(
            "border-none text-white rounded mx-auto bg-gray-500 hover:bg-gray-600 flex justify-center",
            stage === "O" && "bg-red-300 hover:bg-red-400",
            stage === 0 && "bg-red-500 hover:bg-red-primary",
            stage === 1 && "bg-yellow-500 hover:bg-yellow-primary",
            stage === 2 && "bg-green-500 hover:bg-green-primary",
            className
          )}
        >
          {stage === "R" && "Review"}
          {stage === "V" && "Variable"}
          {stage === "O" && "Unqualified"}
          {typeof stage === "number" && `Stage ${stage}`}
        </Badge>
      </HoverCardTrigger>
      <HoverCardContent
        className="z-50 p-4 rounded-md bg-white"
        side="top"
        sideOffset={4}
      >
        <div className="prose-sm max-w-md">
          <h3 className="mr-2">Stage of Decentralisation</h3>

          {buildStageInfo(stage, reasons)}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
