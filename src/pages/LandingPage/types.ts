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

export type bClickActions =
  | { type: "add"; value: string }
  | { type: "removeSelected"; ids?: string[] }
  | { type: "check"; id?: string; ids?: string[]; value: boolean }
  | { type: "reorder"; reorderedState: ListValues };
