import React from "react";
import { cn } from "../../utils/cn";
import { TableProps } from "./Table.types";
import Spinner from "../Spinner";

export function Table<T extends Record<string, any>>({
  columns,
  data,
  loading = false,
  emptyMessage = "No records found.",
  className,
  onRowClick,
}: TableProps<T>) {
  return (
    <div className={cn("w-full overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm", className)}>
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-6 py-4">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-12 text-center">
                <div className="flex items-center justify-center gap-3 text-slate-500">
                  <Spinner size="sm" />
                  <span>Loading data...</span>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-12 text-center text-slate-400 font-medium">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr
                key={idx}
                onClick={() => onRowClick && onRowClick(row)}
                className={cn(
                  "transition-colors hover:bg-slate-50/80",
                  onRowClick && "cursor-pointer"
                )}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
