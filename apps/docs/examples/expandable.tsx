import { TableColumn, Table, useTable } from "@arkejs/table";
import { default as mockColumns } from "@/examples/mocks/columns";
import data from "@/examples/mocks/data";

function Expandable() {
  const columns: TableColumn[] = [
    {
      id: "toggle",
      label: "toggle",
      render: (_, { handleExpandRow }) => (
        <button onClick={handleExpandRow}>{`->`}</button>
      ),
    },
    ...mockColumns,
  ];

  const { tableProps } = useTable({
    expandable: true,
    columns,
  });

  return (
    <Table
      {...tableProps}
      data={data}
      components={{
        ExpandedRow: (rowData) => (
          <div>
            <div>Expanded row</div>
            <div>{JSON.stringify(rowData)}</div>
          </div>
        ),
      }}
    />
  );
}

export default Expandable;
