import { bClickActions, FiltersTypes, SetFiltersType } from "../types";
import styles from "../StyleLandingPage.module.css";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Box, Stack } from "@mui/system";
import FilterTextField from "../../../custom-material-styles/FilterTextField";
import FilterSortSelector from "./FilterSortSelector";

interface ListControlProps {
  dispatch: React.Dispatch<bClickActions>;
  shouldBeChecked: boolean;
  setFilters: SetFiltersType;
  filteredIds: string[];
  filters: FiltersTypes;
}

const ListFilters: React.FC<ListControlProps> = ({ dispatch, shouldBeChecked, setFilters, filteredIds, filters }) => {
  return (
    <Box className={styles.filtersBox}>
      <FormControlLabel
        sx={{
          "&	.MuiFormControlLabel-label": {
            color: (theme) => theme.palette.text.primary,
            whiteSpace: "nowrap",
          },
          ml: "40px",
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
      <Stack sx={{ flexDirection: "row", height: "100%", gap: 1, flexGrow: 2, maxWidth: 500 }}>
        <FilterTextField
          onChange={(e) => {
            setFilters((prev) => {
              return { ...prev, keyword: e.target.value };
            });
          }}
          value={filters.keyword}
          label="Keyword"
          variant="outlined"
          autoComplete="off"
          height="42px"
          InputLabelProps={{ shrink: true }}
          shouldShowBorder={filters.keyword.length !== 0}
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
        <FilterSortSelector setFilters={setFilters} filters={filters} />
      </Stack>
    </Box>
  );
};

export default ListFilters;
