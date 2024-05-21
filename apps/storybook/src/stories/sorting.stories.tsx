import { ColumnDef, useTable } from "@arkejs/table";
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
import { Invoice, invoices } from "../mocks/data.tsx";
import { useState } from "react";

export default {
  title: "Sorting",
};

const columns: ColumnDef<Invoice>[] = [
  {
    id: "invoice",
  },
  {
    id: "paymentStatus",
    enableSorting: false,
  },
  {
    id: "paymentMethod",
  },
  {
    id: "totalAmount",
  },
];

export const Sorting = () => {
  const [enableSorting, setEnableSorting] = useState(true);

  const table = useTable({
    columns,
    data: invoices,
    enableSorting,
    initialState: {
      sorting: {
        invoice: "asc",
      },
    },
  });

  return (
    <>
      <div>
        <input
          id="enable-sorting"
          type="checkbox"
          checked={enableSorting}
          onChange={() => setEnableSorting((prevState) => !prevState)}
        />
        <label htmlFor="enable-sorting">Enable Sorting</label>
      </div>
      {JSON.stringify(table.getState().sorting)}
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            {table.getVisibleColumns().map((column) => {
              const sorting = column.getSortingValue();
              return (
                <TableHead
                  onClick={() =>
                    column.setSort(sorting === "asc" ? "desc" : "asc")
                  }
                  key={column.id}
                >
                  {column.id}
                  {sorting === "asc" ? "🔼" : sorting === "desc" ? "🔽" : ""}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {table.getRows().map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>{cell.getValue()}</TableCell>
              ))}
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
