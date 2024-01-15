import React, { useState } from "react";
import { TableColumn, TableExpandedState, Table } from "@arkejs/table";
import { default as mockColumns } from "@/examples/mocks/columns";
import data from "@/examples/mocks/data";

function ExpandableState() {
  const [expandedRows, setExpandedRows] = useState<TableExpandedState>({});

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

  const handleExpandRow = (index: number) => {
    setExpandedRows((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <Table
      columns={columns}
      data={data}
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
}

export default ExpandableState;
