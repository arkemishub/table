import { TableColumn } from "@arkejs/table";

const columns: TableColumn[] = [
  { label: "ID", id: "id" },
  { label: "Name", id: "first_name", type: "string" },
  {
    label: "Surname",
    id: "last_name",
    type: "string",
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
