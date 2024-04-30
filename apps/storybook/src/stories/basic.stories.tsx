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
  title: "Basic",
};

export const Basic = () => {
  const table = useTable({ columns, data: invoices });

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          {table.getAllColumns().map((column) => (
            <TableHead key={column.id}>{column.id}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {table.getRows().map((row) => (
          <TableRow key={row.id}>
            {row.getAllCells().map((cell) => (
              <TableCell className="font-medium">{cell.getValue()}</TableCell>
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
  );
};
