import Basic from "@/examples/basic";
import Pagination from "@/examples/pagination";
import CustomPagination from "@/examples/custom-pagination";
import DefaultSort from "@/examples/sort";
import CustomSort from "@/examples/custom-sort";
import ColumnHiding from "@/examples/column-hiding";
import Filtering from "@/examples/filtering";
import Expandable from "@/examples/expandable";
import TableConfigProvider from "@/examples/table-config-provider";
import ExpandableState from "@/examples/expandable-state";

const examples = [
  {
    id: "basic",
    component: Basic,
  },
  {
    id: "pagination",
    component: Pagination,
  },
  {
    id: "custom-pagination",
    component: CustomPagination,
  },
  {
    id: "sort",
    component: DefaultSort,
  },
  {
    id: "custom-sort",
    component: CustomSort,
  },
  {
    id: "column-hiding",
    component: ColumnHiding,
  },
  {
    id: "filtering",
    component: Filtering,
  },
  {
    id: "expandable",
    component: Expandable,
  },
  {
    id: "expandable-state",
    component: ExpandableState,
  },
  {
    id: "table-config-provider",
    component: TableConfigProvider,
  },
];

export default examples;
