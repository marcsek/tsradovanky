export interface ListValue {
  value: string;
  id: number;
  checked: boolean;
}

export type ListValues = ListValue[];

export interface ListReducerState {
  filteredList: ListValues;
  baseList: ListValues;
}

export type bClickActions =
  | { type: "add"; value: string }
  | { type: "removeSelected"; idx?: number }
  | { type: "check"; id?: number; ids?: number[]; value: boolean };
