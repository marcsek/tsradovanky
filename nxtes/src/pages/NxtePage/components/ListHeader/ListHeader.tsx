import { Stack } from "@mui/material";
import { SetFiltersType } from "../../types";
import { ListFilters } from "../index";
import styles from "./ListHeader.module.css";
import AddIcon from "@mui/icons-material/Add";
import ControlButton from "../../../../custom-material-styles/ControlButton";
import NotePopupService from "../NotePupup/NotePopupService";
import NewNotePopUp from "../NotePupup/NotePopupElements/NewNotePopUp";

interface ListHeaderProps {
  setFilters: SetFiltersType;
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
      <ListFilters setFilters={setFilters} />
    </Stack>
  );
};

export default ListHeader;
