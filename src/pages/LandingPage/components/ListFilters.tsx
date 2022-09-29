import { useState } from "react";

import { bClickActions } from "../types";
import styles from "../StyleLandingPage.module.css";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Box } from "@mui/system";
import FilterTextField from "../../../custom-material-styles/FilterTextField";
import { pink, blue } from "@mui/material/colors";

interface ListControlProps {
  dispatch: { call: React.Dispatch<bClickActions>; params: { ids: number[] } };
  shouldBeChecked: boolean;
  setFilters: React.Dispatch<React.SetStateAction<string>>;
}

const ListFilters: React.FC<ListControlProps> = ({ dispatch, shouldBeChecked, setFilters }) => {
  const [text, setText] = useState("");

  return (
    <div>
      <Box className={styles.filtersBox}>
        <FilterTextField
          onChange={(e) => {
            setText(e.target.value);
            setFilters(e.target.value);
          }}
          value={text}
          className={text.length !== 0 ? styles.outline : ""}
          label="Filter"
          variant="outlined"
          autoComplete="off"
          margin="normal"
          InputLabelProps={{ shrink: true }}
          sx={{
            width: 500,
            "& fieldset": {
              borderColor: text.length !== 0 ? blue[600] : "dark-gray",
              borderWidth: text.length !== 0 ? "2px" : "",
            },
          }}
        />

        <FormControlLabel
          sx={{
            "&	.MuiFormControlLabel-label": {
              color: "#EAEBF1",
              // fontSize: "0.9rem",
            },
          }}
          control={
            <Checkbox
              checked={shouldBeChecked}
              onChange={(e) => {
                dispatch.call({ type: "check", value: e.target.checked, ids: dispatch.params.ids });
              }}
              // checkedIcon={<Favorite />}
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
    </div>
  );
};

export default ListFilters;
