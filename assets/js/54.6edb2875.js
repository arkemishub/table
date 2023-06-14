"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[54],{5054:e=>{e.exports=JSON.parse('{"../src/components/Pagination/Pagination.tsx":[{"description":"","methods":[],"displayName":"Pagination","props":{"pageCount":{"required":true,"tsType":{"name":"number"},"description":""},"pages":{"required":true,"tsType":{"name":"Array","elements":[{"name":"number"}],"raw":"number[]"},"description":""},"currentPage":{"required":true,"tsType":{"name":"number"},"description":""},"onChange":{"required":true,"tsType":{"name":"signature","type":"function","raw":"(page: number) => void","signature":{"arguments":[{"type":{"name":"number"},"name":"page"}],"return":{"name":"void"}}},"description":""}}}],"../src/components/Table/Table.tsx":[{"description":"","methods":[],"displayName":"Table","props":{"columns":{"required":true,"tsType":{"name":"Array","elements":[{"name":"Omit","elements":[{"name":"signature","type":"object","raw":"{\\n  id: string;\\n  label: string;\\n  render?: (data: Record<string, unknown>) => string | number | ReactNode;\\n  className?: string;\\n  style?: CSSProperties;\\n  type?: ColumnType;\\n  availableFilterOperators?: Array<FilterOperator>;\\n  sortable?: boolean;\\n  hidden?: boolean;\\n}","signature":{"properties":[{"key":"id","value":{"name":"string","required":true}},{"key":"label","value":{"name":"string","required":true}},{"key":"render","value":{"name":"signature","type":"function","raw":"(data: Record<string, unknown>) => string | number | ReactNode","signature":{"arguments":[{"type":{"name":"Record","elements":[{"name":"string"},{"name":"unknown"}],"raw":"Record<string, unknown>"},"name":"data"}],"return":{"name":"union","raw":"string | number | ReactNode","elements":[{"name":"string"},{"name":"number"},{"name":"ReactNode"}]}},"required":false}},{"key":"className","value":{"name":"string","required":false}},{"key":"style","value":{"name":"CSSProperties","required":false}},{"key":"type","value":{"name":"ColumnType","required":false}},{"key":"availableFilterOperators","value":{"name":"Array","elements":[{"name":"FilterOperator"}],"raw":"Array<FilterOperator>","required":false}},{"key":"sortable","value":{"name":"boolean","required":false}},{"key":"hidden","value":{"name":"boolean","required":false}}]}},{"name":"literal","value":"\\"availableFilterOperators\\""}],"raw":"Omit<Column, \\"availableFilterOperators\\">"}],"raw":"Omit<Column, \\"availableFilterOperators\\">[]"},"description":"Table Columns"},"data":{"required":true,"tsType":{"name":"Array","elements":[{"name":"Record","elements":[{"name":"string"},{"name":"unknown"}],"raw":"Record<string, unknown>"}],"raw":"Record<string, unknown>[]"},"description":""},"actions":{"required":false,"tsType":{"name":"ActionsConfig"},"description":""},"noResult":{"required":false,"tsType":{"name":"ReactNode"},"description":"","defaultValue":{"value":"\\"No Result\\"","computed":false}},"currentPage":{"defaultValue":{"value":"0","computed":false},"required":false}}}],"../src/components/TableConfigProvider/TableConfigProvider.stories.tsx":[{"description":"","methods":[],"displayName":"Default"}],"../src/components/TableConfigProvider/TableConfigProvider.tsx":[{"description":"","methods":[],"displayName":"TableConfigProvider","props":{"components":{"required":false,"tsType":{"name":"Partial","elements":[{"name":"Record","elements":[{"name":"ColumnType"},{"name":"signature","type":"function","raw":"(value: any, rowData: Record<string, any>, column: Column) => ReactElement","signature":{"arguments":[{"type":{"name":"any"},"name":"value"},{"type":{"name":"Record","elements":[{"name":"string"},{"name":"any"}],"raw":"Record<string, any>"},"name":"rowData"},{"type":{"name":"signature","type":"object","raw":"{\\n  id: string;\\n  label: string;\\n  render?: (data: Record<string, unknown>) => string | number | ReactNode;\\n  className?: string;\\n  style?: CSSProperties;\\n  type?: ColumnType;\\n  availableFilterOperators?: Array<FilterOperator>;\\n  sortable?: boolean;\\n  hidden?: boolean;\\n}","signature":{"properties":[{"key":"id","value":{"name":"string","required":true}},{"key":"label","value":{"name":"string","required":true}},{"key":"render","value":{"name":"signature","type":"function","raw":"(data: Record<string, unknown>) => string | number | ReactNode","signature":{"arguments":[{"type":{"name":"Record","elements":[{"name":"string"},{"name":"unknown"}],"raw":"Record<string, unknown>"},"name":"data"}],"return":{"name":"union","raw":"string | number | ReactNode","elements":[{"name":"string"},{"name":"number"},{"name":"ReactNode"}]}},"required":false}},{"key":"className","value":{"name":"string","required":false}},{"key":"style","value":{"name":"CSSProperties","required":false}},{"key":"type","value":{"name":"ColumnType","required":false}},{"key":"availableFilterOperators","value":{"name":"Array","elements":[{"name":"FilterOperator"}],"raw":"Array<FilterOperator>","required":false}},{"key":"sortable","value":{"name":"boolean","required":false}},{"key":"hidden","value":{"name":"boolean","required":false}}]}},"name":"column"}],"return":{"name":"ReactElement"}}}],"raw":"Record<\\n  ColumnType,\\n  (value: any, rowData: Record<string, any>, column: Column) => ReactElement\\n>"}],"raw":"Partial<\\n  Record<\\n    ColumnType,\\n    (value: any, rowData: Record<string, any>, column: Column) => ReactElement\\n  >\\n>"},"description":""}}}],"../src/components/TableHeadCell/TableHeadCell.tsx":[{"description":"","methods":[],"displayName":"TableHeadCell","props":{"id":{"required":true,"tsType":{"name":"string"},"description":""},"label":{"required":true,"tsType":{"name":"string"},"description":""},"render":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(data: Record<string, unknown>) => string | number | ReactNode","signature":{"arguments":[{"type":{"name":"Record","elements":[{"name":"string"},{"name":"unknown"}],"raw":"Record<string, unknown>"},"name":"data"}],"return":{"name":"union","raw":"string | number | ReactNode","elements":[{"name":"string"},{"name":"number"},{"name":"ReactNode"}]}}},"description":""},"className":{"required":false,"tsType":{"name":"string"},"description":""},"style":{"required":false,"tsType":{"name":"CSSProperties"},"description":""},"type":{"required":false,"tsType":{"name":"ColumnType"},"description":""},"availableFilterOperators":{"required":false,"tsType":{"name":"Array","elements":[{"name":"FilterOperator"}],"raw":"Array<FilterOperator>"},"description":""},"sortable":{"required":false,"tsType":{"name":"boolean"},"description":""},"hidden":{"required":false,"tsType":{"name":"boolean"},"description":""}}}]}')}}]);