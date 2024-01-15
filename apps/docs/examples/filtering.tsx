import { Table, useTable } from "@arkejs/table";
import data from "@/examples/mocks/data";
import columns from "@/examples/mocks/columns";

function Filtering() {
  const { tableProps, filters, setFilters, allColumns } = useTable({
    columns,
  });

  return (
    <>
      <div>
        {allColumns
          .filter((c) => c.availableFilterOperators?.length)
          .map((c) => (
            <form
              key={c.id}
              onSubmit={(e) => {
                e.preventDefault();
                // @ts-ignore
                const operator = e.target?.operator?.value;
                // @ts-ignore
                const value = e.target?.value?.value;
                if (operator && value) {
                  setFilters([...filters, { operator, value, key: c.id }]);
                  // @ts-ignore
                  e.target.reset();
                }
              }}
              className="mb-4 grid grid-cols-4 gap-4"
            >
              <span>{c.label}</span>
              <select className="input__container" name="operator">
                {c?.availableFilterOperators?.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              <input className="input__container" name="value" />
              <button className="btn btn--secondary" type="submit">
                Submit
              </button>
            </form>
          ))}
      </div>
      <div style={{ marginTop: 12, marginBottom: 12 }}>
        Selected: {JSON.stringify(filters)}
      </div>
      <Table {...tableProps} data={data} />
    </>
  );
}

export default Filtering;
