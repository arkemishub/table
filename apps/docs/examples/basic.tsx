import { Table } from "@arkejs/table";
import columns from "@/examples/mocks/columns";
import data from "@/examples/mocks/data";

function BasicTable() {
  return <Table columns={columns} data={data} />;
}

export default BasicTable;
