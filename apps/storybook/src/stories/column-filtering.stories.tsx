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

export default {
  title: "Column Filtering",
};
export const ColumnFiltering = () => {
  const table = useTable({
    columns,
    data: invoices,
    initialState: {
      columnFilters: {
        invoice: { test: true },
      },
    },
  });

  const columnFilters = table.getState().columnFilters;

  return (
    <>
      <div className="mb-4">
        Active fitlers: {JSON.stringify(columnFilters)}
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            {table.getVisibleColumns().map((column) => (
              <TableHead key={column.id}>
                {column.id}
                <input
                  className="border"
                  onChange={(event) =>
                    column.setFilter({
                      value: event.target.value,
                      any: "",
                      key: "",
                      allowed: "",
                    })
                  }
                />
              </TableHead>
            ))}
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
