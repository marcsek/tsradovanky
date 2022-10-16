import styles from "./NotePopup.module.css";
import { Typography, Stack, Box } from "@mui/material";
import FilterTextField from "../../../../../custom-material-styles/FilterTextField";
import ControlButton from "../../../../../custom-material-styles/ControlButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { ElementColors } from "../../../types";
import { PopupChildProps } from "../types";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import { windowAnimation, backgroundAnimation } from "../NotePopupAnimations";
import ColorPicker from "./ColorPicker";

const CreateNoteBody: React.FC<PopupChildProps> = ({ handleColorChange, handleInputChange, handleFormSubmit, handleClose, formValues }) => {
  return (
    <>
      <Box className={styles.popupBackground} onClick={handleClose} component={motion.div} {...backgroundAnimation} />
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
            onClick={handleClose}
            sx={{ color: (theme) => theme.palette.text.primary, p: 0.5, minWidth: "fit-content", borderRadius: "50%" }}
          >
            <CloseIcon></CloseIcon>
          </ControlButton>
        </Stack>
        <form onSubmit={(e) => (handleFormSubmit ? handleFormSubmit(e, formValues) : null)}>
          <Stack className={styles.inputCont}>
            <Stack className={styles.textInputTitle}>
              <FilterTextField
                onChange={handleInputChange}
                value={formValues?.title.value}
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
              >{`${formValues?.title.value.length} / ${formValues?.title.maxSize}`}</Typography>
            </Stack>
            <Stack className={styles.textInputCont}>
              <FilterTextField
                onChange={handleInputChange}
                value={formValues?.text.value}
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
              >{`${formValues?.text.value.length} / ${formValues?.text.maxSize}`}</Typography>
            </Stack>
            <Stack>
              <Typography sx={{ color: (theme) => theme.palette.text.secondary, width: "fit-content", mb: "5px", fontSize: "0.75rem" }}>
                Color
              </Typography>
              <ColorPicker
                selectedColor={formValues?.color ? formValues.color : ElementColors.GREEN}
                setSelectedColor={handleColorChange ? handleColorChange : () => {}}
              />
            </Stack>
            <ControlButton
              className={styles.inputButton}
              shouldDisable={formValues?.title.value === "" || formValues?.text.value === ""}
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

export default CreateNoteBody;
