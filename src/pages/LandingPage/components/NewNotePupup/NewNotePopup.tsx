import { useState } from "react";
import styles from "./NotePopup.module.css";
import { Typography, Stack, Box } from "@mui/material";
import Button from "@mui/material/Button";
import FilterTextField from "../../../../custom-material-styles/FilterTextField";
import ControlButton from "../../../../custom-material-styles/ControlButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { bClickActions } from "../../types";
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

interface NewNoteFormType {
  title: { value: string; maxSize: number };
  text: { value: string; maxSize: number };
}

const defaultFormValues = { text: { value: "", maxSize: 230 }, title: { value: "", maxSize: 50 } };

const NewNotePopup: React.FC<NewNotePopupProps> = ({ checkIfCanAdd, dispatch, closeNewNote }) => {
  const [textValue, setTextValue] = useState<NewNoteFormType>(defaultFormValues);
  const [color, setColor] = useState("#00AB55");

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (textValue[event.target.name as keyof NewNoteFormType].maxSize - event.target.value.length >= 0) {
      setTextValue({ ...textValue, [event.target.name]: { ...textValue[event.target.name as keyof NewNoteFormType], value: event.target.value } });
    }
  };

  const handleInputReset = () => {
    closeNewNote();
    setTextValue(defaultFormValues);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!checkIfCanAdd(textValue.title.value)) {
      toast.warn("Uwaga, toto uz existuje!");
      return;
    }
    if (textValue.text.value && textValue.title.value) {
      handleInputReset();
      dispatch({ type: "add", props: { value: textValue.text.value, title: textValue.title.value, color } });
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
                value={textValue.title.value}
                className={styles.input}
                label="Title"
                variant="outlined"
                name="title"
                autoComplete="off"
                height="42px"
                InputLabelProps={{ shrink: true }}
              />
              <Typography
                sx={{ color: (theme) => theme.palette.text.secondary, fontSize: "0.9rem" }}
              >{`${textValue.title.value.length} / ${textValue.title.maxSize}`}</Typography>
            </Stack>
            <Stack className={styles.textInputCont}>
              <FilterTextField
                onChange={handleInputChange}
                value={textValue.text.value}
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
                sx={{ color: (theme) => theme.palette.text.secondary, fontSize: "0.9rem" }}
              >{`${textValue.text.value.length} / ${textValue.text.maxSize}`}</Typography>
            </Stack>
            <Stack>
              <Typography sx={{ color: (theme) => theme.palette.text.secondary, width: "fit-content", mb: "5px", fontSize: "0.8rem" }}>
                Color
              </Typography>
              <ColorPicker selectedColor={color} setSelectedColor={setColor} />
            </Stack>
            <ControlButton
              className={styles.inputButton}
              shouldDisable={textValue.title.value === "" || textValue.text.value === ""}
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
