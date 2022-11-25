import { Stack } from "@mui/material";
import { ListFilters } from "../index";
import styles from "./ListHeader.module.css";
import AddIcon from "@mui/icons-material/Add";
import ControlButton from "../../../../custom-material-styles/ControlButton";
import NotePopupService from "../NotePupup/NotePopupService";
import NewNotePopUp from "../NotePupup/NotePopupElements/NewNotePopUp";
import { FiltersTypes } from "../../types";

interface ListHeaderProps {
  setFilters: React.Dispatch<React.SetStateAction<FiltersTypes>>;
}

const ListHeader: React.FC<ListHeaderProps> = ({ setFilters }) => {
  const handleNewNoteClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    NotePopupService.open(NewNotePopUp);
  };

  return (
    <Stack className={styles.headerCont}>
      <ControlButton
        className={styles.newButton}
        sx={{
          backgroundColor: theme => theme.palette.background.default,
          color: theme => theme.palette.text.primary,
          transition: "background-color 0.12s ease-in-out",
        }}
        onClick={handleNewNoteClick}
      >
        <AddIcon />
        <span>New Nxte</span>
      </ControlButton>
      <ListFilters setFilters={setFilters} />
    </Stack>
  );
};

export default ListHeader;
