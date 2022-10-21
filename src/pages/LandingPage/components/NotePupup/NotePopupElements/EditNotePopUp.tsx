import React from "react";
import { NewNoteFormType, NewNotePopupProps } from "../../../types";
import NotePopup from "../NotePopUpBuildingEl/NotePopup";
import { toast } from "react-toastify";
import { defaultFormValues } from "./DefaultFormValues";
import NoteBody from "../NotePopUpBuildingEl/NoteBody";

const EditNotePopUp: React.FC<NewNotePopupProps> = ({ dispatch, doesAlreadyExist, handleClose, initialValues = defaultFormValues, id }) => {
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
      handleClose();

      let newId = id ? id : "";
      dispatch({ type: "edit", id: newId, props: { value: formValues.text.value, title: formValues.title.value, color: formValues.color } });
    }
  };

  return (
    <NotePopup handleClose={handleClose} defaultFormValues={initialValues}>
      <NoteBody handleFormSubmit={handleFormSubmit} type="edit" />
    </NotePopup>
  );
};

export default EditNotePopUp;
