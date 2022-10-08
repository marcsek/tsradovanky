import { useState } from "react";
import { Stack } from "@mui/system";
import { bClickActions, FiltersTypes, SetFiltersType } from "../../types";
import ListFilters from "../ListFilters";
import NewNotePopup from "../NewNotePupup/NewNotePopup";
import styles from "./ListHeader.module.css";
import AddIcon from "@mui/icons-material/Add";
import ControlButton from "../../../../custom-material-styles/ControlButton";

interface ListHeaderProps {
  dispatch: React.Dispatch<bClickActions>;
  setFilters: SetFiltersType;
  filters: FiltersTypes;
  checkIfCanAdd: (newValue: string) => boolean;
}

const ListHeader: React.FC<ListHeaderProps> = ({ dispatch, setFilters, filters, checkIfCanAdd }) => {
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
        sx={{ backgroundColor: (theme) => theme.palette.background.default, color: (theme) => theme.palette.text.primary }}
        onClick={handleNewNoteClick}
      >
        <AddIcon />
        New Nxte
      </ControlButton>
      {newNoteOpen && <NewNotePopup checkIfCanAdd={checkIfCanAdd} dispatch={dispatch} closeNewNote={closeNewNote} />}
      <ListFilters setFilters={setFilters} filters={filters} />
    </Stack>
  );
};

export default ListHeader;
