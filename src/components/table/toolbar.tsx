"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { DataTableViewOptions } from "@/app/(app)/examples/tasks/components/data-table-view-options"

import { MultiSelectFilter } from "./multi-select-filter";
import { FilterOption } from "./data";
import { DataTableViewOptions } from "./view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  chains: FilterOption[];
  types: FilterOption[];
}

export function DataTableToolbar<TData>({
  table,
  chains,
  types,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-col md:flex-row items-center justify-between border-b">
      <div className="w-full md:w-1/2 grow h-12 flex items-center md:border-r">
        <Input
          placeholder="Filter Protocols..."
          value={
            (table.getColumn("protocol")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("protocol")?.setFilterValue(event.target.value)
          }
          className="w-full h-full border-0"
        />
        {table.getColumn("chain") && (
          <MultiSelectFilter
            className="h-full border-0 border-x"
            column={table.getColumn("chain")}
            title="Chains"
            options={chains}
          />
        )}
        {table.getColumn("type") && (
          <MultiSelectFilter
            className="h-full"
            column={table.getColumn("type")}
            title="Types"
            options={types}
          />
        )}
      </div>
      <div className="hidden md:flex w-1/2 flex justify-between h-12">
        <div className="w-1/4 shrink-0">
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-full border-0 border-r uppercase w-full  justify-between"
            >
              Reset
              <X className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
        <div className="w-full grow md:border-r" />

        <DataTableViewOptions
          className="h-full uppercase text-sm w-1/4 shrink-0"
          table={table}
        />
      </div>
    </div>
  );
}
