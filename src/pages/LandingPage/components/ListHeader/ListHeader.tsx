import { useState } from "react";
import { Stack } from "@mui/material";
import { bClickActions, SetFiltersType } from "../../types";
import ListFilters from "../ListFilters/ListFilters";
import NewNotePopup from "../NewNotePupup/NewNotePopup";
import styles from "./ListHeader.module.css";
import AddIcon from "@mui/icons-material/Add";
import ControlButton from "../../../../custom-material-styles/ControlButton";
import { AnimatePresence } from "framer-motion";

interface ListHeaderProps {
  dispatch: React.Dispatch<bClickActions>;
  setFilters: SetFiltersType;
  checkIfCanAdd: (newValue: string) => boolean;
}

const ListHeader: React.FC<ListHeaderProps> = ({ dispatch, setFilters, checkIfCanAdd }) => {
  const [newNoteOpen, setNewNoteOpen] = useState(false);

  const handleNewNoteClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setNewNoteOpen(!newNoteOpen);
  };

  const closeNewNote = () => {
    setNewNoteOpen(false);
  };

  return (
    <Stack className={styles.headerCont}>
      <ControlButton
        className={styles.newButton}
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
          color: (theme) => theme.palette.text.primary,
          transition: "background-color 0.12s ease-in-out",
          "&:hover": {
            backgroundColor: (theme) => (theme.palette.mode === "dark" ? "rgba(234, 235, 241, 0.16);" : "rgba(33, 43, 54, 0.08);"),
          },
        }}
        onClick={handleNewNoteClick}
      >
        <AddIcon />
        New Nxte
      </ControlButton>
      <AnimatePresence initial={true} mode="wait">
        {newNoteOpen && <NewNotePopup checkIfCanAdd={checkIfCanAdd} dispatch={dispatch} closeNewNote={closeNewNote} />}
      </AnimatePresence>
      <ListFilters setFilters={setFilters} />
    </Stack>
  );
};

export default ListHeader;
