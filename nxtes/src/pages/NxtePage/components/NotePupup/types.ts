import { ElementColors } from "../../types";

export type PopupComponentType = React.FC<NewNotePopupProps> | null;

export interface EventDataType {
  component: PopupComponentType;
  customProps?: CustomNotePopupProps;
}

export interface PopupChildProps {
  handleColorChange?: (color: ElementColors) => void;
  handleInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>, formValues?: NewNoteFormType) => void;
  handleClose?: () => void;
  initialValues?: NewNoteFormType;
  formValues?: NewNoteFormType;
  type: "create" | "edit";
}

export interface NewNotePopupProps extends DefaultNotePopupProps, CustomNotePopupProps {}

export interface DefaultNotePopupProps {
  doesAlreadyExist: (newValue: string) => boolean;
  handleClose: () => void;
}

export interface CustomNotePopupProps {
  initialValues?: NewNoteFormType;
  id?: string;
}

export interface NewNoteFormType extends NewNoteInpuType {
  color: ElementColors;
}

export interface NewNoteInpuType {
  title: { value: string; maxSize?: number };
  text: { value: string; maxSize?: number };
}

export { ElementColors };
