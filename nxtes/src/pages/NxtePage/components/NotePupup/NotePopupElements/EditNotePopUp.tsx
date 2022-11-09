import React from "react";
import { NewNoteFormType, NewNotePopupProps } from "../types";
import NotePopup from "../NotePopUpBuildingEl/NotePopup";
import { toast } from "react-toastify";
import { defaultFormValues } from "./DefaultFormValues";
import NoteBody from "../NotePopUpBuildingEl/NoteBody";
import { useUpdateNxte } from "../../../../../queries/queryHooks/Nxte";

const EditNotePopUp: React.FC<NewNotePopupProps> = ({ doesAlreadyExist, handleClose, initialValues = defaultFormValues, id }) => {
  const { mutate } = useUpdateNxte(handleClose);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>, formValues?: NewNoteFormType) => {
    e.preventDefault();
    if (!formValues) {
      return;
    }
    if (!doesAlreadyExist(formValues.title.value)) {
      toast.warn("Uwaga, toto uz existuje!");
      return;
    }
    if (formValues.text.value && formValues.title.value) {
      mutate({
        id: id ?? "",
        newValues: { value: formValues.text.value, title: formValues.title.value, color: formValues.color as string },
      });
      handleClose();
    }
  };

  return (
    <NotePopup handleClose={handleClose} defaultFormValues={initialValues}>
      <NoteBody handleFormSubmit={handleFormSubmit} type="edit" />
    </NotePopup>
  );
};

export default EditNotePopUp;
