import { ColumnType } from "@arkejs/table";

const columns = [
  { label: "ID", id: "id" },
  { label: "Name", id: "first_name", type: ColumnType.String },
  {
    label: "Surname",
    id: "last_name",
    type: ColumnType.String,
    render: (data: Record<string, unknown>) => `Mr. ${data.last_name}`,
  },
  { label: "Email", id: "email" },
  {
    label: "Gender",
    id: "gender",
    hidden: true,
    renderHeader: () => "Gender (M/F)",
  },
  { label: "IP Address", id: "ip_address", sortable: false },
];

export default columns;
