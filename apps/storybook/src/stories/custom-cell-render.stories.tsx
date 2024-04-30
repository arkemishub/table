import { ColumnDef, useTable } from "@arkejs/table";
import { Invoice, invoices } from "../mocks/data.tsx";
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

export default {
  title: "Custom Cell Render",
};

const columns: ColumnDef<Invoice>[] = [
  {
    id: "invoice",
    header: "Invoice",
    cell: {
      renderValue: (value) => (
        <div className="flex items-center gap-2">
          <span className="bg-blue-400 rounded-full size-3" />
          {value.invoice}
        </div>
      ),
    },
  },
  {
    id: "paymentStatus",
  },
  {
    id: "paymentMethod",
  },
  {
    id: "totalAmount",
  },
];

export const CustomCellRender = () => {
  const table = useTable({ columns, data: invoices });

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          {table.getAllColumns().map((column) => (
            <TableHead key={column.id}>{column.header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {table.getRows().map((row) => (
          <TableRow key={row.id}>
            {row.getAllCells().map((cell) => (
              <TableCell className="font-medium">
                {cell.renderValue()}
              </TableCell>
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
