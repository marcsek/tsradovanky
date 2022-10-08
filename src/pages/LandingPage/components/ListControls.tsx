import { useRef } from "react";
import { bClickActions } from "../types";
import styles from "../StyleLandingPage.module.css";
import ControlButton from "../../../custom-material-styles/ControlButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { Stack } from "@mui/material";
import { toast } from "react-toastify";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

interface ListControlProps {
  dispatch: React.Dispatch<bClickActions>;
  isOneSelected: boolean;
  filteredSelectedIds: string[];
  filteredIds: string[];
  shouldBeChecked: boolean;
}

const ListControls: React.FC<ListControlProps> = ({ dispatch, isOneSelected, filteredSelectedIds, filteredIds, shouldBeChecked }) => {
  const selectAllRef = useRef<HTMLInputElement>(null);

  const handleRemoveReset = () => {
    if (selectAllRef.current !== null) selectAllRef.current.checked = false;
  };

  return (
    <Stack flexDirection="row" className={styles.formControl}>
      <FormControlLabel
        sx={{
          "&	.MuiFormControlLabel-label": {
            color: (theme) => theme.palette.text.primary,
            whiteSpace: "nowrap",
          },
          flex: "0 0 40%",
          m: 0,
        }}
        control={
          <Checkbox
            checked={shouldBeChecked}
            onChange={(e) => {
              dispatch({ type: "check", value: e.target.checked, ids: filteredIds });
            }}
            sx={{
              color: "#FE7349",
              "&.Mui-checked": {
                color: "#FE7349",
              },
            }}
          />
        }
        labelPlacement="end"
        label="Select All"
      />
      <ControlButton
        className={styles.inputButton}
        shouldDisable={!isOneSelected}
        sx={{ outlineColor: (theme) => theme.palette.divider }}
        backgroundcolor="linear-gradient(90deg, rgba(71, 108, 250, 1) 0%, rgba(54, 95, 255, 1) 100%)"
        type="submit"
      >
        <DoneAllIcon />
        Finish Selected
      </ControlButton>
      <ControlButton
        className={styles.inputButton}
        shouldDisable={!isOneSelected}
        backgroundcolor="linear-gradient(90deg, rgba(234, 57, 67, 1) 0%, rgba(255, 49, 61, 1) 100%)"
        sx={{ outlineColor: (theme) => theme.palette.divider }}
        onClick={(e) => {
          e.preventDefault();
          handleRemoveReset();
          toast.success(`${filteredSelectedIds.length} reminders were deleted!`);
          dispatch({ type: "removeSelected", ids: filteredSelectedIds });
        }}
      >
        <DeleteOutlineIcon />
        Remove Selected
      </ControlButton>
    </Stack>
  );
};

export default ListControls;
