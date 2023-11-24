import columns from "@/examples/mocks/columns";
import { Table, useTable } from "@arkejs/table";
import data from "@/examples/mocks/data";

function DefaultSort() {
  const { tableProps, sort } = useTable({
    sorting: {
      sortable: true,
    },
    columns,
  });

  return (
    <>
      <div style={{ marginBottom: 12 }}>Selected: {JSON.stringify(sort)}</div>
      <Table {...tableProps} data={data} />
    </>
  );
}

export default DefaultSort;
