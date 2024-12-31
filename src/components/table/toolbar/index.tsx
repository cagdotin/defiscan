"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MultiSelectFilter } from "./multi-select-filter";
import { Search, X } from "lucide-react";
import { Table } from "@tanstack/react-table";
import { chains, types } from "../columns";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

function SearchBar<TData>({ table }: { table: Table<TData> }) {
  return (
    <div className="relative w-full h-full">
      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 z-10" />
      <Input
        placeholder="Filter Protocols..."
        value={(table.getColumn("protocol")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("protocol")?.setFilterValue(event.target.value)
        }
        className="pl-10 pr-3 py-2 text-sm w-full h-full focus:outline-none border-0"
      />
    </div>
  );
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-col md:flex-row items-center justify-between border-b">
      <div className="w-full md:w-1/2 grow h-12 flex items-center md:border-r">
        <SearchBar table={table} />

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
      <div className="hidden md:flex w-1/2 flex h-12">
        {isFiltered && (
          <>
            <div className="w-full grow md:border-r" />
            <div className="ml-auto w-1/4 shrink-0">
              <Button
                variant="ghost"
                onClick={() => table.resetColumnFilters()}
                className="h-full border-0  uppercase w-full justify-between"
              >
                Reset
                <X className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
