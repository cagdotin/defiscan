"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MultiSelectFilter } from "./multi-select-filter";
import { Search, X } from "lucide-react";
import { Table } from "@tanstack/react-table";
import { chains, types } from "../columns";
import { Separator } from "@/components/ui/separator";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

function SearchBar<TData>({ table }: { table: Table<TData> }) {
  return (
    <div className="relative max-w-80 w-full h-9">
      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 z-10" />
      <Input
        placeholder="Filter Protocols..."
        value={(table.getColumn("protocol")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("protocol")?.setFilterValue(event.target.value)
        }
        className="pl-10 pr-3 py-2 text-sm w-full h-full border-border focus:outline-none "
      />
    </div>
  );
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-col md:flex-row items-center justify-between h-16">
      <div className="w-full md:w-1/2 grow h-full flex items-center gap-2">
        <SearchBar table={table} />

        {table.getColumn("chain") && (
          <MultiSelectFilter
            column={table.getColumn("chain")}
            title="Chains"
            options={chains}
          />
        )}

        {table.getColumn("type") && (
          <MultiSelectFilter
            column={table.getColumn("type")}
            title="Types"
            options={types}
          />
        )}

        {/* <div className="grow-1" /> */}

        {isFiltered && (
          <>
            <Separator orientation="vertical" className="h-9" />
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.resetColumnFilters()}
              className="text-xs uppercase justify-between border-border px-2"
            >
              Reset
              <X className="w-4 h-4 ml-2" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
