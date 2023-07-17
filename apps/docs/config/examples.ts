import Basic from "@/examples/basic";
import Pagination from "@/examples/pagination";
import CustomPagination from "@/examples/custom-pagination";
import DefaultSort from "@/examples/sort";
import CustomSort from "@/examples/custom-sort";

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
];

export default examples;
