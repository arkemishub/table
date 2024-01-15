import {
  TableColumn,
  ExpandedState,
  ITableProps,
  Table,
  useTable,
} from "@arkejs/table";
import mockData from "../mocks/mockData";
import mockColumns from "../mocks/mockColumns";
import { useEffect, useState } from "react";

export default {
  title: "Table",
  component: Table,
};

export const Default = (args: Partial<ITableProps>) => {
  return <Table data={mockData} columns={mockColumns} {...args} />;
};

export const WithPagination = (args: Partial<ITableProps>) => {
  const data = mockData;
  const pageSize = 10;

  const { tableProps, currentPage } = useTable({
    pagination: {
      totalCount: 100,
    },
    columns: mockColumns,
  });

  const pagedData = data.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  return <Table {...tableProps} data={pagedData} {...args} />;
};

export const WithCustomHeader = (args: Partial<ITableProps>) => {
  const data = mockData;
  const pageSize = 10;

  const { tableProps, currentPage } = useTable({
    pagination: {
      totalCount: 100,
    },
    columns: mockColumns,
  });

  const pagedData = data.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  return (
    <Table
      {...tableProps}
      renderHeader={(column) => column.id}
      data={pagedData}
      {...args}
    />
  );
};

export const WithLoadingConfiguration = (args: Partial<ITableProps>) => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const { tableProps, currentPage } = useTable(
    hasLoaded
      ? {
          pagination: {
            totalCount: 100,
          },
          columns: mockColumns,
        }
      : null
  );

  const data = mockData;
  const pageSize = 10;

  useEffect(() => {
    setTimeout(() => {
      setHasLoaded(true);
    }, 3000);
  }, []);

  const pagedData = data.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  return (
    <>
      table will load after 3 seconds ...
      {hasLoaded && <Table {...tableProps} data={pagedData} {...args} />}
    </>
  );
};

export const WithCustomPagination = (args: Partial<ITableProps>) => {
  const data = mockData;
  const pageSize = 25;

  const { tableProps, goToPage, currentPage, pageCount } = useTable({
    pagination: {
      totalCount: 100,
      pageSize,
      type: "custom",
    },
    columns: mockColumns,
  });

  const pagedData = data.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  return (
    <>
      <Table {...tableProps} data={pagedData} {...args} />
      <button
        disabled={currentPage == 0}
        onClick={() => {
          goToPage(currentPage - 1);
        }}
      >
        {"<"}
      </button>
      <button
        disabled={currentPage == pageCount - 1}
        onClick={() => {
          goToPage(currentPage + 1);
        }}
      >
        {">"}
      </button>
    </>
  );
};

export const WithDefaultSorting = (args: Partial<ITableProps>) => {
  const { tableProps, sort } = useTable({
    sorting: {
      sortable: true,
    },
    columns: mockColumns,
  });

  return (
    <>
      <div style={{ marginBottom: 12 }}>Selected: {JSON.stringify(sort)}</div>
      <Table {...tableProps} data={mockData} {...args} />
    </>
  );
};

export const WithCustomSorting = (args: Partial<ITableProps>) => {
  const { tableProps, sort, setSort } = useTable({
    sorting: {
      sortable: true,
      type: "custom",
    },
    columns: mockColumns,
  });

  return (
    <>
      <button onClick={() => setSort([{ columnId: "id", type: "asc" }])}>
        Sort by ID
      </button>
      <button onClick={() => setSort([])}>Reset</button>
      <div style={{ marginTop: 12, marginBottom: 12 }}>
        Selected: {JSON.stringify(sort)}
      </div>
      <Table {...tableProps} data={mockData} {...args} />
    </>
  );
};

export const WithColumnHiding = (args: Partial<ITableProps>) => {
  const data = mockData;

  const { tableProps, allColumns, toggleHideAll } = useTable({
    columns: mockColumns,
  });

  return (
    <>
      <div>
        <input
          checked={allColumns.every((c) => !c.hidden)}
          onClick={toggleHideAll}
          type="checkbox"
          id="all"
        />
        <label htmlFor="all">All</label>
        {allColumns.map(({ id, label, toggleHide, hidden }) => (
          <div key={id}>
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
      <Table {...tableProps} data={data} {...args} />
    </>
  );
};

export const WithMultipleColumnHiding = (args: Partial<ITableProps>) => {
  const data = mockData;

  const { tableProps, allColumns, toggleHide } = useTable({
    columns: mockColumns,
  });
  const [tempColumns, setTempColumns] = useState<TableColumn[]>(allColumns);

  const handleChange = (column: TableColumn) => {
    setTempColumns((prevState) =>
      prevState.map((c) =>
        c.id === column.id ? { ...c, hidden: !c.hidden } : c
      )
    );
  };

  return (
    <>
      <div>
        {allColumns.map((col) => (
          <div key={col.id}>
            <input
              checked={!tempColumns.find((c) => c.id === col.id)?.hidden}
              onClick={() => handleChange(col)}
              type="checkbox"
              id={col.id}
            />
            <label htmlFor={col.id}>{col.label}</label>
          </div>
        ))}
        <button onClick={() => setTempColumns([])}>Reset</button>
        <button onClick={() => toggleHide(tempColumns)}>Confirm</button>
      </div>
      <Table {...tableProps} data={data} {...args} />
    </>
  );
};

export const WithFilter = (args: Partial<ITableProps>) => {
  const data = mockData;

  const { tableProps, filters, setFilters, allColumns } = useTable({
    columns: mockColumns,
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
                  setFilters([...filters, { operator, value, columnId: c.id }]);
                  // @ts-ignore
                  e.target.reset();
                }
              }}
              style={{
                display: "grid",
                gridTemplateColumns: "100px 1fr 1fr 1fr",
                columnGap: 12,
              }}
            >
              <span>{c.label}</span>
              <select name="operator">
                {c?.availableFilterOperators?.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              <input name="value" />
              <button type="submit">Submit</button>
            </form>
          ))}
      </div>
      <div style={{ marginTop: 12, marginBottom: 12 }}>
        Selected: {JSON.stringify(filters)}
      </div>
      <Table {...tableProps} data={data} {...args} />
    </>
  );
};

export const WithActions = (args: Partial<ITableProps>) => {
  return (
    <Table
      data={mockData}
      columns={mockColumns}
      actions={{
        label: "Actions",
        actions: [
          {
            content: "Action 1",
            onClick: () => alert("Action 1"),
          },
          {
            content: () => "Action 2",
            onClick: () => alert("Action 2"),
          },
        ],
      }}
      {...args}
    />
  );
};

export const ExpandableState = (args: Partial<ITableProps>) => {
  const [expandedRows, setExpandedRows] = useState<ExpandedState>({});
  const data = mockData;
  const pageSize = 10;

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

  const { tableProps, currentPage } = useTable({
    pagination: {
      totalCount: 100,
    },
    columns,
  });

  const pagedData = data.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  const handleExpandRow = (index: number) => {
    setExpandedRows((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <Table
      {...tableProps}
      data={pagedData}
      {...args}
      onExpandRow={handleExpandRow}
      expandedRows={expandedRows}
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
};

export const ExpandableUseTable = (args: Partial<ITableProps>) => {
  const data = mockData;
  const pageSize = 10;

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

  const { tableProps, currentPage } = useTable({
    pagination: {
      totalCount: 100,
    },
    expandable: true,
    columns,
  });

  const pagedData = data.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  return (
    <Table
      {...tableProps}
      data={pagedData}
      {...args}
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
};

export const NoResult = (args: Partial<ITableProps>) => {
  return (
    <Table
      data={[]}
      columns={mockColumns}
      actions={{
        label: "Actions",
        actions: [
          {
            content: "Action 1",
            onClick: () => alert("Action 1"),
          },
          {
            content: () => "Action 2",
            onClick: () => alert("Action 2"),
          },
        ],
      }}
      noResult="No result"
      {...args}
    />
  );
};
