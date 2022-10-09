import { useRef } from "react";
import { bClickActions } from "../types";
import styles from "../StyleLandingPage.module.css";
import ControlButton from "../../../custom-material-styles/ControlButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { Stack, Typography } from "@mui/material";
import { toast } from "react-toastify";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

interface ListControlProps {
  dispatch: React.Dispatch<bClickActions>;
  selectedCount: number;
  filteredSelectedIds: string[];
  filteredIds: string[];
  shouldBeChecked: boolean;
}

const ListControls: React.FC<ListControlProps> = ({ dispatch, selectedCount, filteredSelectedIds, filteredIds, shouldBeChecked }) => {
  const selectAllRef = useRef<HTMLInputElement>(null);

  const handleRemoveReset = () => {
    if (selectAllRef.current !== null) selectAllRef.current.checked = false;
  };

  return (
    <Stack flexDirection="row" className={styles.formControl}>
      <Stack
        sx={{
          backgroundColor: (theme) => (selectedCount !== 0 ? "#FE734911" : theme.palette.action.active),
          borderRadius: "1rem",
          flex: "0 0 40%",
          m: 0,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          pr: "50px",
          boxSizing: "border-box",
        }}
      >
        <FormControlLabel
          sx={{
            "&	.MuiFormControlLabel-label": {
              color: (theme) => (selectedCount === 0 ? theme.palette.text.primary : "#FE7349"),
              whiteSpace: "nowrap",
            },
            m: 0,
          }}
          control={
            <Checkbox
              icon={selectedCount === 0 ? <CheckBoxOutlineBlankIcon /> : <IndeterminateCheckBoxIcon />}
              checked={shouldBeChecked}
              onChange={(e) => {
                dispatch({ type: "check", value: e.target.checked, ids: filteredIds });
              }}
              sx={{
                color: selectedCount !== 0 ? "#FE7349" : "gray",
                borderRadius: "20px",
                "&.Mui-checked": {
                  color: "#FE7349",
                },
              }}
            />
          }
          labelPlacement="end"
          label={"Select All"}
        />
        <Typography sx={{ color: "#FE7349" }}>{selectedCount !== 0 ? `${selectedCount} selected` : ""}</Typography>
      </Stack>
      <ControlButton
        className={styles.inputButton}
        shouldDisable={selectedCount === 0}
        sx={{ outlineColor: (theme) => theme.palette.divider }}
        backgroundcolor="linear-gradient(90deg, rgba(71, 108, 250, 1) 0%, rgba(54, 95, 255, 1) 100%)"
        type="submit"
      >
        <DoneAllIcon />
        Finish Selected
      </ControlButton>
      <ControlButton
        className={styles.inputButton}
        shouldDisable={selectedCount === 0}
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
