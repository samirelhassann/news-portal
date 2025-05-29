import { LucideIconData } from "node_modules/lucide-angular/icons/types";

import { FilterType } from "../enums/filter-types.enum";

export interface Filter {
  type: FilterType;
  title: string;
  icon: LucideIconData;
  q: string;
  isHeadline?: boolean;
}
