"use client";

import { cn, formatUsd } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { TooltipProvider } from "../rosette/tooltip/tooltip";
import { PizzaRosetteCell } from "../rosette/rosette-cell";
import { getRiskDescriptions } from "../rosette/data-converter/data-converter";
import { Button } from "../ui/button";
import {
  ArrowUpDown,
  ChevronDown,
  ChevronRight,
  ChevronsUpDown,
  ChevronUp,
} from "lucide-react";
import { Project, RiskArray, Stage } from "@/lib/types";
import { InfoBadge } from "../ui/info-badge";
import { Avatar } from "../ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Chain, ChainNames } from "../ui/chain";

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "protocol",
    header: ({ column }) => {
      return (
        <Button
          className="text-left justify-start text-xs md:text-sm  h-16 !w-full"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Protocol
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { logo, protocol } = row.original;

      if (row.depth > 0) return null;

      return (
        <div className="flex gap-2 items-center">
          {row.depth === 0 && (
            <Avatar className="border">
              <AvatarImage src={logo} alt={protocol || ""} />
            </Avatar>
          )}
          <span>{protocol}</span>
        </div>
      );
    },
    sortingFn: "alphanumeric", // use built-in sorting function by name
  },
  {
    accessorKey: "chain",
    header: ({ column }) => {
      return (
        <Button
          // Remove hidden class to prevent layout shift
          className="md:flex hidden w-0 md:w-auto overflow-hidden h-16 !w-full"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="hidden md:inline">Chain</span>
          <ArrowUpDown className="ml-2 h-4 w-4 hidden md:inline" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const chain = row.getValue("chain");

      if (Array.isArray(chain)) {
        const chevron = row.getIsExpanded() ? (
          <ChevronDown className="w-4 h-4 ml-2" />
        ) : (
          <ChevronRight className="w-4 h-4 ml-2" />
        );

        return (
          <div className="flex items-center justify-center">
            {chain.map((c, i) => (
              <Chain
                key={`chain-${i}`}
                name={c as ChainNames}
                className={cn(i > 0 && "-ml-3")}
              />
            ))}
            {/* {chevron} */}
          </div>
        );
      }

      if (!chain) return;

      return (
        <div className="flex items-center justify-center">
          <Chain name={chain as ChainNames} />
        </div>
      );
    },
    sortingFn: "alphanumeric",
    meta: {
      responsiveHidden: true, // This column will hide on mobile
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "stage",
    header: ({ column }) => {
      return (
        <Button
          className="text-xs md:text-sm  h-16 !w-full"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stage
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const stage = row.getValue("stage") as Stage;

      if (stage === undefined) {
        return <div className="w-full flex justify-center">-</div>;
      }

      return (
        <div className="w-full flex">
          <TooltipProvider>
            <InfoBadge
              stage={stage}
              className={cn(
                "text-white py-1 rounded mx-auto bg-gray-500",
                stage === 0 && "bg-red-500",
                stage === 1 && "bg-yellow-500",
                stage === 2 && "bg-green-500"
              )}
            >
              {stage === "R" && "Review"}
              {stage === "V" && "Variable"}
              {typeof stage === "number" && "Stage" + stage}
            </InfoBadge>
          </TooltipProvider>
        </div>
      );
    },
    sortingFn: "alphanumeric", // use built-in sorting function by name
  },
  {
    accessorKey: "risks",
    header: ({ column }) => {
      return <p className="text-xs md:text-sm">Risks</p>;
    },
    cell: ({ row }) => {
      const risks = row.getValue("risks") as RiskArray;
      // console.log("here", risks);

      if (!risks) {
        return <div className="w-full flex justify-center">-</div>;
      }

      return (
        <TooltipProvider>
          <div className="flex w-full justify-center">
            <PizzaRosetteCell
              values={getRiskDescriptions(risks)}
              isUnderReview={false}
            />
          </div>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          // Remove hidden class to prevent layout shift
          className="md:flex hidden w-0 md:w-auto overflow-hidden h-16 !w-full"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="hidden md:inline">Type</span>
          <ArrowUpDown className="ml-2 h-4 w-4 hidden md:inline" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="w-0 md:w-auto overflow-hidden whitespace-nowrap text-center">
          <span className="hidden md:inline">{row.getValue("type")}</span>
        </div>
      );
    },
    sortingFn: "alphanumeric",
    meta: {
      responsiveHidden: true, // This column will hide on mobile
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "tvl",
    header: ({ column }) => {
      return (
        <Button
          // Remove hidden class to prevent layout shift
          className="md:flex hidden w-0 md:w-auto overflow-hidden h-16 !w-full"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="hidden md:inline">TVL</span>
          <ArrowUpDown className="ml-2 h-4 w-4 hidden md:inline" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="w-0 md:w-auto overflow-hidden whitespace-nowrap">
          <span className="hidden md:inline">
            {formatUsd(row.getValue("tvl"))}
          </span>
        </div>
      );
    },
    sortingFn: "alphanumeric",
    meta: {
      responsiveHidden: true, // This column will hide on mobile
    },
  },
];
