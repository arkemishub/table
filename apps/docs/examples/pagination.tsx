import { useTable, Table } from "@arkejs/table";
import data from "@/examples/mocks/data";
import columns from "@/examples/mocks/columns";

const pageSize = 10;

function App() {
  const { tableProps, goToPage, currentPage, pageCount } = useTable({
    pagination: {
      totalCount: 100,
      pageSize,
    },
    columns,
  });

  const pagedData = data.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  return (
    <>
      <style>
        {`
        .arke__table__pagination__button {
            padding: 12px
        `}
      </style>
      <Table {...tableProps} data={pagedData} />
    </>
  );
}

export default App;
