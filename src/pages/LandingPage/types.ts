export interface ListValue {
  value: string;
  id: string;
  checked: boolean;
}

export type ListValues = ListValue[];

export interface ListReducerState {
  filteredList: ListValues;
  baseList: ListValues;
}

export interface FiltersTypes {
  sort: "AtoZ" | "date" | string;
  reverse?: boolean;
  keyword: string;
}

export type SetFiltersType = (callback: (prev: FiltersTypes) => FiltersTypes) => void;

export interface ApplyReturn {
  filteredList: ListValues;
  filteredIds: string[];
}

export type bClickActions =
  | { type: "add"; value: string }
  | { type: "removeSelected"; ids?: string[] }
  | { type: "check"; id?: string; ids?: string[]; value: boolean }
  | { type: "reorder"; reorderedState: ListValues };
