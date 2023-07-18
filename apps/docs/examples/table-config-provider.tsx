import { Table, TableConfigProvider } from "@arkejs/table";
import data from "@/examples/mocks/data";
import columns from "@/examples/mocks/columns";
import { Chip } from "@arkejs/ui";

function MyTableConfigProvider() {
  return (
    <TableConfigProvider
      components={{
        string: (value) => <Chip color="primary">{value}</Chip>,
      }}
    >
      <Table data={data} columns={columns} />
    </TableConfigProvider>
  );
}

export default MyTableConfigProvider;
