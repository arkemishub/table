import { SortType, Table, useTable } from "@arkejs/table";
import columns from "@/examples/mocks/columns";
import data from "@/examples/mocks/data";

function CustomSort() {
  const { tableProps, sort, setSort } = useTable({
    sorting: {
      sortable: true,
      type: "custom",
    },
    columns,
  });

  return (
    <>
      <div className="flex gap-4">
        <button
          className="btn btn--primary"
          onClick={() => setSort([{ columnId: "id", type: SortType.ASC }])}
        >
          Sort by ID
        </button>
        <button className="btn btn--secondary" onClick={() => setSort([])}>
          Reset
        </button>
      </div>
      <div style={{ marginTop: 12, marginBottom: 12 }}>
        Selected: {JSON.stringify(sort)}
      </div>
      <Table {...tableProps} data={data} />
    </>
  );
}

export default CustomSort;
