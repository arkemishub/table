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
  title: "Column Visibility",
};

export const ColumnVisibility = () => {
  const table = useTable({ columns, data: invoices });

  return (
    <>
      <div>
        {table.getAllColumns().map((column) => (
          <label key={column.id}>
            <input
              type="checkbox"
              checked={column.isVisible()}
              onChange={() => column.toggleVisibility()}
            />
            {column.id}
          </label>
        ))}
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            {table.getVisibleColumns().map((column) => (
              <TableHead key={column.id}>{column.id}</TableHead>
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
