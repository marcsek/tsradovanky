import { useState } from "react";

import { bClickActions } from "../types";
import styles from "../StyleLandingPage.module.css";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Box } from "@mui/system";
import FilterTextField from "../../../custom-material-styles/FilterTextField";

interface ListControlProps {
  dispatch: { call: React.Dispatch<bClickActions>; params: { ids: number[] } };
  shouldBeChecked: boolean;
  setFilters: React.Dispatch<React.SetStateAction<string>>;
}

const ListFilters: React.FC<ListControlProps> = ({ dispatch, shouldBeChecked, setFilters }) => {
  const [text, setText] = useState("");

  return (
    <Box className={styles.filtersBox}>
      <FilterTextField
        onChange={(e) => {
          setText(e.target.value);
          setFilters(e.target.value);
        }}
        value={text}
        label="Filter"
        variant="outlined"
        autoComplete="off"
        height="42px"
        InputLabelProps={{ shrink: true }}
        shouldShowBorder={text.length !== 0}
        sx={{
          label: {
            color: (theme) => theme.palette.text.secondary,
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              backgroundColor: (theme) => theme.palette.action.active,
            },
          },
        }}
      />

      <FormControlLabel
        sx={{
          "&	.MuiFormControlLabel-label": {
            color: (theme) => theme.palette.text.primary,
            whiteSpace: "nowrap",
          },
        }}
        control={
          <Checkbox
            checked={shouldBeChecked}
            onChange={(e) => {
              dispatch.call({ type: "check", value: e.target.checked, ids: dispatch.params.ids });
            }}
            sx={{
              color: "#FE7349",
              "&.Mui-checked": {
                color: "#FE7349",
              },
            }}
          />
        }
        label="Select All"
      />
    </Box>
  );
};

export default ListFilters;
