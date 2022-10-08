import { FiltersTypes, SetFiltersType } from "../types";
import styles from "../StyleLandingPage.module.css";
import { Box, Stack } from "@mui/system";
import FilterTextField from "../../../custom-material-styles/FilterTextField";
import FilterSortSelector from "./FilterSortSelector";

interface ListControlProps {
  setFilters: SetFiltersType;
  filters: FiltersTypes;
}

const ListFilters: React.FC<ListControlProps> = ({ setFilters, filters }) => {
  return (
    <Box className={styles.filtersBox}>
      <Stack sx={{ flexDirection: "row", height: "100%", gap: 1, flexGrow: 2 }}>
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
