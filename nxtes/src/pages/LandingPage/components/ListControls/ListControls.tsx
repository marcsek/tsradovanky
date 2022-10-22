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
import { selectedCountAnimation } from "./ListControlsAnimations";

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
            filteredSelectedIds.length !== 0 ? (theme.palette.mode === "dark" ? "var(--dark-pink)" : "#FE73492A") : theme.palette.action.active,
        }}
      >
        <FormControlLabel
          sx={{
            "&	.MuiFormControlLabel-label": {
              color: (theme) => (filteredSelectedIds.length === 0 ? theme.palette.text.primary : "var(--pink)"),
              whiteSpace: "nowrap",
            },
            m: 0,
          }}
          control={
            <Checkbox
              icon={filteredSelectedIds.length === 0 ? <CheckBoxOutlineBlankIcon /> : <IndeterminateCheckBoxIcon />}
              checked={shouldBeChecked}
              onChange={(e) => {
                dispatch({ type: "check", value: e.target.checked, id: filteredIds });
              }}
              sx={{
                color: filteredSelectedIds.length !== 0 ? "var(--pink)" : "gray",
                "&.Mui-checked": {
                  color: "var(--pink)",
                },
              }}
            />
          }
          labelPlacement="end"
          label="Select All"
        />
        {filteredSelectedIds.length !== 0 && (
          <Typography component={motion.p} {...selectedCountAnimation} sx={{ color: "var(--pink)" }}>
            {`${filteredSelectedIds.length} selected`}
          </Typography>
        )}
      </Stack>
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
      <ControlButton
        className={styles.inputButton}
        shouldDisable={filteredSelectedIds.length === 0}
        backgroundcolor="rgba(255, 49, 61, 1)"
        sx={{ outlineColor: (theme) => theme.palette.divider }}
        onClick={(e) => {
          e.preventDefault();
          handleRemoveReset();
          toast.success(`${filteredSelectedIds.length} reminders were deleted!`);
          dispatch({ type: "remove", ids: filteredSelectedIds });
        }}
      >
        <DeleteOutlineIcon />
        Remove Selected
      </ControlButton>
    </Stack>
  );
};

export default ListControls;
