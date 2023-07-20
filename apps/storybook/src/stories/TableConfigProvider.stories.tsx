import { ITableProps, Table, TableConfigProvider } from "@arkejs/table";
import mockData from "../mocks/mockData.ts";
import mockColumns from "../mocks/mockColumns.ts";

export default {
  title: "TableConfigProvider",
  component: TableConfigProvider,
};

export const Default = (args: Partial<ITableProps>) => {
  return (
    <TableConfigProvider
      components={{
        string: (value) => <p style={{ background: "red" }}>{value}</p>,
      }}
    >
      <Table data={mockData} columns={mockColumns} {...args} />
    </TableConfigProvider>
  );
};
