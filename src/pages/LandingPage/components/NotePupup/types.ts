import { CustomNotePopupProps, ElementColors, NewNotePopupProps, NewNoteFormType } from "../../types";

export type PopupComponentType = React.FC<NewNotePopupProps> | null;

export interface EventDataType {
  component: PopupComponentType;
  customProps?: CustomNotePopupProps;
}

export interface PopupChildProps {
  handleColorChange?: (color: ElementColors) => void;
  handleInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFormSubmit?: (e: React.FormEvent<HTMLFormElement>, formValues?: NewNoteFormType) => void;
  handleClose?: () => void;
  initialValues?: NewNoteFormType;
  formValues?: NewNoteFormType;
}
