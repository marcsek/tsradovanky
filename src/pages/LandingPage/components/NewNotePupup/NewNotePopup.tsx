import { useState } from "react";
import styles from "./NotePopup.module.css";
import { Typography, Stack, Box } from "@mui/material";
import FilterTextField from "../../../../custom-material-styles/FilterTextField";
import ControlButton from "../../../../custom-material-styles/ControlButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { bClickActions } from "../../types";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";

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
      dispatch({ type: "add", props: { value: textValue.text.value, title: textValue.title.value } });
    }
  };

  return (
    <>
      <Box className={styles.popupBackground} onClick={closeNewNote} />
      <Stack className={styles.pupupCont} sx={{ backgroundColor: (theme) => theme.palette.background.default }}>
        <Stack className={styles.titleCont}>
          <Typography variant="h4" sx={{ color: (theme) => theme.palette.text.primary }}>
            New Nxte
          </Typography>
          <ControlButton
            onClick={closeNewNote}
            sx={{ color: (theme) => theme.palette.text.primary, p: 0.5, minWidth: "fit-content", borderRadius: "50%" }}
          >
            <CloseIcon></CloseIcon>
          </ControlButton>
          {/* <Typography variant="h6" onClick={closeNewNote} sx={{ color: (theme) => theme.palette.text.primary }}>
            <CloseIcon></CloseIcon>
          </Typography> */}
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
            <ControlButton
              className={styles.inputButton}
              shouldDisable={textValue.title.value === "" || textValue.text.value === ""}
              sx={{ outlineColor: (theme) => theme.palette.divider }}
              backgroundcolor="linear-gradient(90deg, rgba(71, 108, 250, 1) 0%, rgba(54, 95, 255, 1) 100%)"
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
