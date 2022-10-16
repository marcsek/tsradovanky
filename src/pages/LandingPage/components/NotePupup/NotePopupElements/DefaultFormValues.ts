import { ElementColors, NewNoteFormType } from "../../../types";

export const defaultFormValues: NewNoteFormType = {
  text: { value: "", maxSize: 230 },
  title: { value: "", maxSize: 50 },
  color: ElementColors.GREEN,
};
