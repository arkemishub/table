import columns from "@/examples/mocks/columns";
import { Table, useTable } from "@arkejs/table";
import data from "@/examples/mocks/data";

function ColumnHiding() {
  const { tableProps, allColumns, toggleHideAll } = useTable({
    columns,
  });

  return (
    <>
      <div className="mb-8">
        <div className="flex gap-2">
          <input
            checked={allColumns.every((c) => !c.hidden)}
            onClick={toggleHideAll}
            type="checkbox"
            id="all"
          />
          <label htmlFor="all">All</label>
        </div>
        <div className="flex gap-8">
          {allColumns.map(({ id, label, toggleHide, hidden }) => (
            <div key={id} className="flex gap-2">
              <input
                checked={!hidden}
                onClick={toggleHide}
                type="checkbox"
                id={id}
              />
              <label htmlFor={id}>{label}</label>
            </div>
          ))}
        </div>
      </div>
      <Table {...tableProps} data={data} />
    </>
  );
}

export default ColumnHiding;
