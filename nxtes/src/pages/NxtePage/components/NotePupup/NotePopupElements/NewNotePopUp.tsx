import React from "react";
import { NewNoteFormType, NewNotePopupProps } from "../types";
import NotePopup from "../NotePopUpBuildingEl/NotePopup";
import { toast } from "react-toastify";
import { defaultFormValues } from "./DefaultFormValues";
import NoteBody from "../NotePopUpBuildingEl/NoteBody";
import { useCreateNxte } from "../../../../../queries/queryHooks/Nxte";
import { v4 as uuidv4 } from "uuid";

const NewNotePopUp: React.FC<NewNotePopupProps> = ({ doesAlreadyExist, handleClose }) => {
  const { mutate } = useCreateNxte();

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
      mutate({ value: formValues.text.value, title: formValues.title.value, color: formValues.color, id: uuidv4() });
      handleClose();
    }
  };

  return (
    <NotePopup defaultFormValues={defaultFormValues} handleClose={handleClose}>
      <NoteBody handleFormSubmit={handleFormSubmit} type="create" />
    </NotePopup>
  );
};

export default NewNotePopUp;
