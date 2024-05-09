import { useTable } from "@arkejs/table";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/table.tsx";
import { columns, invoices } from "../mocks/data.tsx";
import { cn } from "../lib/cn.ts";

export default {
  title: "Column Pinning",
};

export const ColumnPinning = () => {
  const table = useTable({ columns, data: invoices });

  return (
    <>
      <div>
        {table.getAllColumns().map((column) => (
          <label key={column.id}>
            <input
              type="checkbox"
              checked={column.isPinned()}
              onChange={() => column.pin()}
            />
            {column.id}
          </label>
        ))}
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            {[
              ...table.getVisiblePinnedColumns(),
              ...table.getVisibleUnpinnedColumns(),
            ].map((column, index) => (
              <TableHead
                className={cn(
                  "min-w-[250px]",
                  column.isPinned() && "sticky left-0 z-10 bg-white"
                )}
                style={{
                  left: column.isPinned() ? index * 250 : 0,
                }}
                key={column.id}
              >
                {column.id}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {table.getRows().map((row) => (
            <TableRow key={row.id}>
              {[
                ...row.getVisiblePinnedCells(),
                ...row.getVisibleUnpinnedCells(),
              ].map((cell, index) => {
                return (
                  <TableCell
                    className={cn(
                      "min-w-[250px]",
                      cell.column.isPinned() && "sticky z-10 bg-white"
                    )}
                    style={{
                      left: cell.column.isPinned() ? index * 250 : 0,
                    }}
                    key={cell.id}
                  >
                    {cell.getValue()}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};
