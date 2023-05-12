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

import { ColumnType, FilterOperator } from "../types";

const numericFilters = [
  FilterOperator.EQ,
  FilterOperator.GE,
  FilterOperator.GT,
  FilterOperator.LT,
  FilterOperator.LE,
];

const filters = {
  [ColumnType.String]: [
    FilterOperator.ICONTAINS,
    FilterOperator.ISTARTSWITH,
    FilterOperator.IENDSWITH,
    FilterOperator.EQ,
  ],
  [ColumnType.Bool]: [FilterOperator.EQ],
  [ColumnType.Integer]: numericFilters,
  [ColumnType.Float]: numericFilters,
  [ColumnType.Date]: numericFilters,
  [ColumnType.Datetime]: numericFilters,
  [ColumnType.Time]: numericFilters,
};

export default filters;
