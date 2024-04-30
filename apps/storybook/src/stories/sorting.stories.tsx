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
  title: "Sorting",
};
export const Sorting = () => {
  const table = useTable({
    columns,
    data: invoices,
    initialState: {
      sorting: {
        invoice: "asc",
      },
    },
  });

  return (
    <>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            {table.getAllVisibleColumns().map((column) => {
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
              {row.getAllVisibleCells().map((cell) => (
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
