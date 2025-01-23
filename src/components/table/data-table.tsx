"use client";

import React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedUniqueValues,
  getSortedRowModel,
  SortingState,
  useReactTable,
  Table as TableType,
  getFacetedRowModel,
  getPaginationRowModel,
  VisibilityState,
  getExpandedRowModel,
  ExpandedState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { DataTableToolbar } from "./toolbar";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const openProtocolReview = (slug: string) => (window.location.href = slug);

const useResponsiveColumns = (
  table: TableType<any>,
  mobileBreakpoint = 800
) => {
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < mobileBreakpoint;

      // Get all columns that should be responsive
      const responsiveColumns = table
        .getAllColumns()
        .filter((column: any) => column.columnDef.meta?.responsiveHidden);

      // Toggle visibility for all responsive columns
      responsiveColumns.forEach((column: any) => {
        column.toggleVisibility(!isMobile);
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [table, mobileBreakpoint]);
};

const renderTableBody = <TData, TValue>(
  table: TableType<TData>,
  columns: ColumnDef<TData, TValue>[]
) => {
  if (table.getRowModel().rows?.length) {
    // console.log(table.getRowModel().rows);
    return table.getRowModel().rows.map((row) => {
      const handleClick = () => {
        // Expand the row if it is expandable.
        if (row.getCanExpand()) {
          row.getToggleExpandedHandler()();
          return;
        }

        // Go to protocol review page if not.
        openProtocolReview((row as any).original.slug);
      };

      const expanded = row.getIsExpanded();
      console.log("exp", expanded);

      return (
        // <div className="w-full border rounded-md flex mb-2">
        <TableRow
          key={row.id}
          onClick={handleClick}
          className={cn(
            "rounded-md border-b-0 border mt-2",
            expanded && "bg-muted",
            row.depth > 0 && "bg-gray-100 hover:bg-gray-200 py-4"
          )}
        >
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id} className={cell.column.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
        // </div>
      );
    });
  }

  // TODO: add loading state.

  // No Rows found.
  return (
    <TableRow>
      <TableCell colSpan={columns.length} className="h-24 text-center">
        No results.
      </TableCell>
    </TableRow>
  );
};

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      expanded,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getExpandedRowModel: getExpandedRowModel(),
    // @ts-expect-error
    getSubRows: (row) => row.children,
    // @ts-expect-error
    getRowCanExpand: (row) => row?.children,
    onExpandedChange: setExpanded,
    manualPagination: true,

    initialState: {
      sorting: [
        {
          id: "tvl",
          desc: true,
        },
      ],
    },
  });

  useResponsiveColumns(table);

  // console.log(expanded);

  return (
    <div className="min-h-[600px] mx-4">
      <DataTableToolbar table={table} />
      <Table className="protocols table-auto border-separate border-spacing-y-1">
        <TableHeader className="mb-2 font-mono">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="p-0">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>{renderTableBody(table, columns)}</TableBody>
      </Table>
    </div>
  );
}
