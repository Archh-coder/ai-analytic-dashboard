"use client";

import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
  PaginationState,
} from "@tanstack/react-table";
import type { SortingState } from "@tanstack/react-table";

interface DataTableProps<T extends object> {
  columns: ColumnDef<T, any>[];
  data: T[];
}

function DataTable<T extends object>({ columns, data }: DataTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState<string>("");
  const [pagination, setPagination] = React.useState<PaginationState>({ pageIndex: 0, pageSize: 5 });
  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter, pagination },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: Math.ceil(data.length / pagination.pageSize),
  });

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-md p-6 w-full border border-zinc-100 dark:border-zinc-800">
      <input
        className="mb-4 px-3 py-2 border rounded w-full dark:bg-zinc-800 dark:border-zinc-700"
        value={globalFilter ?? ""}
        onChange={e => setGlobalFilter(e.target.value)}
        placeholder="Search..."
      />
      <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
        <thead>
          {table.getHeaderGroups().map((headerGroup: any) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header: any) => (
                <th
                  key={header.id}
                  className="px-4 py-2 text-left text-xs font-medium text-zinc-500 dark:text-zinc-300 uppercase cursor-pointer select-none"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getIsSorted() ? (header.column.getIsSorted() === "asc" ? " ▲" : " ▼") : ""}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {table.getRowModel().rows.map((row: any) => (
            <tr
              key={row.id}
              className="transition-colors duration-150 hover:bg-indigo-50 dark:hover:bg-cyan-950 cursor-pointer"
            >
              {row.getVisibleCells().map((cell: any) => (
                <td
                  key={cell.id}
                  className="px-4 py-2 whitespace-nowrap text-zinc-700 dark:text-zinc-200"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <div>
          <button
            className="px-3 py-1 mr-2 border rounded disabled:opacity-50 dark:bg-zinc-800 dark:border-zinc-700"
            onClick={() => setPagination(p => ({ ...p, pageIndex: Math.max(p.pageIndex - 1, 0) }))}
            disabled={pagination.pageIndex === 0}
          >
            Previous
          </button>
          <button
            className="px-3 py-1 border rounded disabled:opacity-50 dark:bg-zinc-800 dark:border-zinc-700"
            onClick={() => setPagination(p => ({ ...p, pageIndex: Math.min(p.pageIndex + 1, table.getPageCount() - 1) }))}
            disabled={pagination.pageIndex >= table.getPageCount() - 1}
          >
            Next
          </button>
        </div>
        <span className="text-xs text-zinc-500 dark:text-zinc-300">
          Page {pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
      </div>
    </div>
  );
}

export default DataTable;