export interface ListValue {
  title: string;
  value: string;
  id: string;
  date: Date;
  checked: boolean;
  color: string;
}

export type ListValues = ListValue[];

export interface ListReducerState {
  filteredList: ListValues;
  baseList: ListValues;
}

export interface FiltersTypes {
  sort: SortType;
  reverse?: boolean;
  keyword: string;
}

export enum SortType {
  AtoZ = "ATOZ",
  Date = "DATE",
}

export enum ElementColors {
  GREEN = "#00AB55",
  YELLOW = "#FDA92D",
  BLUE = "#2065D1",
  RED = "#FF3030",
  PURPLE = "#7635DC",
}

export type SetFiltersType = (callback: (prev: FiltersTypes) => FiltersTypes) => void;

export interface ApplyReturn {
  filteredList: ListValues;
  filteredIds: string[];
}

export type bClickActions =
  | { type: "add"; props: { title: string; value: string; color?: string } }
  | { type: "removeSelected"; ids?: string[] }
  | { type: "check"; id?: string; ids?: string[]; value: boolean }
  | { type: "reorder"; reorderedState: ListValues }
  | { type: "edit"; id: string; props: { title: string; value: string; color: string } };

export interface NewNoteFormType extends NewNoteInpuType {
  color: ElementColors;
}

export interface NewNoteInpuType {
  title: { value: string; maxSize: number };
  text: { value: string; maxSize: number };
}

export interface NewNotePopupProps extends DefaultNotePopupProps, CustomNotePopupProps {}

export interface DefaultNotePopupProps {
  doesAlreadyExist: (newValue: string) => boolean;
  dispatch: React.Dispatch<bClickActions>;
  handleClose: any;
}

export interface CustomNotePopupProps {
  initialValues?: NewNoteFormType;
  id?: string;
}
