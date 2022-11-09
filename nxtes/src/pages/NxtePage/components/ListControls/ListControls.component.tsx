import styles from "./ListConstrols.module.css";
import ControlButton from "../../../../custom-material-styles/ControlButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { Stack, Typography } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { motion } from "framer-motion";
import { selectedCountAnimation } from "./ListControlsAnimations";
import { DispatchSelectAction } from "../../customHooks/useSelectedNxtes";
import { useDeleteNxtes } from "../../../../queries/queryHooks/Nxte";
import MyLoadingButton from "../../../../custom-material-styles/LoadingButton";

interface ListControlProps {
  filteredSelectedIds: string[];
  shouldBeChecked: boolean;
  selected: Map<string, boolean>;
  dispatchSelect: React.Dispatch<DispatchSelectAction>;
}

const ListControls: React.FC<ListControlProps> = ({ filteredSelectedIds, shouldBeChecked, selected, dispatchSelect }) => {
  const { mutate: deleteNxtes, isLoading: isDeleting } = useDeleteNxtes();

  return (
    <Stack className={styles.formControl}>
      <Stack
        className={styles.controlSelectCont}
        sx={{
          backgroundColor: theme =>
            filteredSelectedIds.length !== 0
              ? theme.palette.mode === "dark"
                ? "var(--dark-pink)"
                : "#ff66662A"
              : theme.palette.action.active,
        }}
      >
        <FormControlLabel
          sx={{
            "&	.MuiFormControlLabel-label": {
              color: theme => (filteredSelectedIds.length === 0 ? theme.palette.text.primary : "var(--pink)"),
              whiteSpace: "nowrap",
            },
            m: 0,
          }}
          control={
            <Checkbox
              icon={filteredSelectedIds.length === 0 ? <CheckBoxOutlineBlankIcon /> : <IndeterminateCheckBoxIcon />}
              checked={shouldBeChecked}
              onChange={e => {
                dispatchSelect({ type: "switchMany", ids: Array.from(selected.keys()), value: e.target.checked });
              }}
              sx={{
                color: filteredSelectedIds.length !== 0 ? "var(--pink)" : "rgb(90,90,90)",
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
        disabled={filteredSelectedIds.length === 0}
        sx={{ outlineColor: theme => theme.palette.divider }}
        backgroundcolor="rgba(54, 95, 255, 1)"
        type="submit"
        variant="contained"
      >
        <DoneAllIcon />
        Finish Selected
      </ControlButton>
      <MyLoadingButton
        className={styles.inputButton}
        // shouldDisable={filteredSelectedIds.length === 0 || isDeleting}
        disabled={filteredSelectedIds.length === 0 || isDeleting}
        backgroundcolor="rgba(255, 49, 61, 1)"
        loading={isDeleting}
        variant="contained"
        sx={{
          outlineColor: theme => theme.palette.divider,
        }}
        onClick={e => {
          e.preventDefault();
          deleteNxtes({ ids: filteredSelectedIds });
        }}
      >
        <DeleteOutlineIcon />
        Remove Selected
      </MyLoadingButton>
    </Stack>
  );
};

export default ListControls;
