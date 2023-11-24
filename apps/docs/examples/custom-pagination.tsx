import { Table, useTable } from "@arkejs/table";
import data from "@/examples/mocks/data";
import columns from "@/examples/mocks/columns";

const pageSize = 10;

function CustomPagination() {
  const { tableProps, goToPage, currentPage, pageCount } = useTable({
    pagination: {
      totalCount: 100,
      pageSize,
      type: "custom",
    },
    columns,
  });

  const pagedData = data.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  return (
    <>
      <Table {...tableProps} data={pagedData} />
      <div style={{ display: "flex", gap: 48, marginTop: 20 }}>
        <button
          disabled={currentPage == 0}
          onClick={() => {
            goToPage(currentPage - 1);
          }}
        >
          {"< Previous"}
        </button>
        <button
          disabled={currentPage == pageCount - 1}
          onClick={() => {
            goToPage(currentPage + 1);
          }}
        >
          {"Next >"}
        </button>
      </div>
    </>
  );
}

export default CustomPagination;
