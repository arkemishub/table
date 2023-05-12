/**
 * Copyright 2023 Arkemis S.r.l.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ColumnType } from "../types";

const mockColumns = [
  { label: "ID", id: "id" },
  { label: "Name", id: "first_name", type: ColumnType.String },
  {
    label: "Surname",
    id: "last_name",
    type: ColumnType.String,
    render: (data: Record<string, unknown>) => `Mr. ${data.last_name}`,
  },
  { label: "Email", id: "email" },
  { label: "Gender", id: "gender" },
  { label: "IP Address", id: "ip_address", sortable: false },
];

export default mockColumns;
