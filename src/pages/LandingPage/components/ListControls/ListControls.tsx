import { useRef } from "react";
import { bClickActions } from "../../types";
import styles from "./ListConstrols.module.css";
import ControlButton from "../../../../custom-material-styles/ControlButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { Stack, Typography } from "@mui/material";
import { toast } from "react-toastify";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { motion } from "framer-motion";

interface ListControlProps {
  dispatch: React.Dispatch<bClickActions>;
  selectedCount?: number;
  filteredSelectedIds: string[];
  filteredIds: string[];
  shouldBeChecked: boolean;
}

const ListControls: React.FC<ListControlProps> = ({ dispatch, filteredSelectedIds, filteredIds, shouldBeChecked }) => {
  const selectAllRef = useRef<HTMLInputElement>(null);

  const handleRemoveReset = () => {
    if (selectAllRef.current !== null) selectAllRef.current.checked = false;
  };

  return (
    <Stack className={styles.formControl}>
      <Stack
        className={styles.controlSelectCont}
        sx={{
          backgroundColor: (theme) =>
            filteredSelectedIds.length !== 0 ? (theme.palette.mode === "dark" ? "#FE734911" : "#FE73492A") : theme.palette.action.active,
        }}
      >
        <FormControlLabel
          sx={{
            "&	.MuiFormControlLabel-label": {
              color: (theme) => (filteredSelectedIds.length === 0 ? theme.palette.text.primary : "#FE7349"),
              whiteSpace: "nowrap",
            },
            m: 0,
          }}
          control={
            <Checkbox
              icon={filteredSelectedIds.length === 0 ? <CheckBoxOutlineBlankIcon /> : <IndeterminateCheckBoxIcon />}
              checked={shouldBeChecked}
              onChange={(e) => {
                dispatch({ type: "check", value: e.target.checked, ids: filteredIds });
              }}
              sx={{
                color: filteredSelectedIds.length !== 0 ? "#FE7349" : "gray",
                "&.Mui-checked": {
                  color: "#FE7349",
                },
              }}
            />
          }
          labelPlacement="end"
          label="Select All"
        />
        {filteredSelectedIds.length !== 0 && (
          <Typography component={motion.p} initial={{ y: "120%" }} animate={{ y: "0" }} exit={{ y: "120%" }} sx={{ color: "#FE7349" }}>
            {`${filteredSelectedIds.length} selected`}
          </Typography>
        )}
      </Stack>
      {/* "linear-gradient(90deg, rgba(71, 108, 250, 1) 0%, rgba(54, 95, 255, 1) 100%)" */}
      <ControlButton
        className={styles.inputButton}
        shouldDisable={filteredSelectedIds.length === 0}
        sx={{ outlineColor: (theme) => theme.palette.divider }}
        backgroundcolor="rgba(54, 95, 255, 1)"
        type="submit"
      >
        <DoneAllIcon />
        Finish Selected
      </ControlButton>
      {/* linear-gradient(90deg, rgba(234, 57, 67, 1) 0%, rgba(255, 49, 61, 1) 100%) */}
      <ControlButton
        className={styles.inputButton}
        shouldDisable={filteredSelectedIds.length === 0}
        backgroundcolor="rgba(255, 49, 61, 1)"
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
