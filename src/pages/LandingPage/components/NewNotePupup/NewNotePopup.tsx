import { useState } from "react";
import styles from "./NotePopup.module.css";
import { Typography, Stack, Box } from "@mui/material";
import FilterTextField from "../../../../custom-material-styles/FilterTextField";
import ControlButton from "../../../../custom-material-styles/ControlButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { bClickActions, ElementColors } from "../../types";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import { windowAnimation, backgroundAnimation } from "./NotePopupAnimations";
import ColorPicker from "./ColorPicker";

interface NewNotePopupProps {
  checkIfCanAdd: (newValue: string) => boolean;
  dispatch: React.Dispatch<bClickActions>;
  closeNewNote: () => void;
}

interface NewNoteFormType extends NewNoteInpuType {
  color: ElementColors;
}

interface NewNoteInpuType {
  title: { value: string; maxSize: number };
  text: { value: string; maxSize: number };
}

const defaultFormValues = {
  text: { value: "", maxSize: 230 },
  title: { value: "", maxSize: 50 },
  color: ElementColors.GREEN,
};

const NewNotePopup: React.FC<NewNotePopupProps> = ({ checkIfCanAdd, dispatch, closeNewNote }) => {
  const [formValues, setFormValues] = useState<NewNoteFormType>(defaultFormValues);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { color, ...onlyTextValues } = formValues;

    if (onlyTextValues[event.target.name as keyof NewNoteInpuType].maxSize >= event.target.value.length) {
      setFormValues({
        ...formValues,
        [event.target.name]: { ...onlyTextValues[event.target.name as keyof NewNoteInpuType], value: event.target.value },
      });
    }
  };

  const handleColorChange = (color: ElementColors) => {
    setFormValues({ ...formValues, color });
  };

  const handleInputReset = () => {
    closeNewNote();
    setFormValues(defaultFormValues);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!checkIfCanAdd(formValues.title.value)) {
      toast.warn("Uwaga, toto uz existuje!");
      return;
    }
    if (formValues.text.value && formValues.title.value) {
      handleInputReset();
      dispatch({ type: "add", props: { value: formValues.text.value, title: formValues.title.value, color: formValues.color } });
    }
  };

  return (
    <>
      <Box className={styles.popupBackground} onClick={closeNewNote} component={motion.div} {...backgroundAnimation} />
      <Stack
        className={styles.pupupCont}
        sx={{ backgroundColor: (theme) => theme.palette.background.default }}
        component={motion.div}
        {...windowAnimation}
      >
        <Stack className={styles.titleCont}>
          <Typography variant="h4" sx={{ color: (theme) => theme.palette.text.primary }}>
            New&nbsp;<strong>Nxte</strong>
          </Typography>
          <ControlButton
            onClick={closeNewNote}
            sx={{ color: (theme) => theme.palette.text.primary, p: 0.5, minWidth: "fit-content", borderRadius: "50%" }}
          >
            <CloseIcon></CloseIcon>
          </ControlButton>
        </Stack>
        <form onSubmit={handleFormSubmit}>
          <Stack className={styles.inputCont}>
            <Stack className={styles.textInputTitle}>
              <FilterTextField
                onChange={handleInputChange}
                value={formValues.title.value}
                className={styles.input}
                label="Title"
                variant="outlined"
                name="title"
                autoComplete="off"
                height="42px"
                InputLabelProps={{ shrink: true }}
              />
              <Typography
                sx={{ color: (theme) => theme.palette.text.secondary, fontSize: "0.75rem" }}
              >{`${formValues.title.value.length} / ${formValues.title.maxSize}`}</Typography>
            </Stack>
            <Stack className={styles.textInputCont}>
              <FilterTextField
                onChange={handleInputChange}
                value={formValues.text.value}
                className={styles.input}
                label="Text"
                name="text"
                variant="outlined"
                autoComplete="off"
                multiline
                rows={5}
                height="42px"
                InputLabelProps={{ shrink: true }}
              />
              <Typography
                sx={{ color: (theme) => theme.palette.text.secondary, fontSize: "0.75rem" }}
              >{`${formValues.text.value.length} / ${formValues.text.maxSize}`}</Typography>
            </Stack>
            <Stack>
              <Typography sx={{ color: (theme) => theme.palette.text.secondary, width: "fit-content", mb: "5px", fontSize: "0.75rem" }}>
                Color
              </Typography>
              <ColorPicker selectedColor={formValues.color} setSelectedColor={handleColorChange} />
            </Stack>
            <ControlButton
              className={styles.inputButton}
              shouldDisable={formValues.title.value === "" || formValues.text.value === ""}
              sx={{ outlineColor: (theme) => theme.palette.divider }}
              backgroundcolor="rgba(54, 95, 255, 1)"
              type="submit"
            >
              <AddCircleOutlineIcon />
              Create
            </ControlButton>
          </Stack>
        </form>
      </Stack>
    </>
  );
};

export default NewNotePopup;
