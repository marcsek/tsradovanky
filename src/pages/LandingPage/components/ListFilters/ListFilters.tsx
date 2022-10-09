import { FiltersTypes, SetFiltersType } from "../../types";
import styles from "../../StyleLandingPage.module.css";
import { Box, Stack } from "@mui/system";
import FilterTextField from "../../../../custom-material-styles/FilterTextField";
import FilterSortSelector from "./FilterSortSelector";
import { useState } from "react";

interface ListControlProps {
  setFilters: SetFiltersType;
  // filters: FiltersTypes;
}

const ListFilters: React.FC<ListControlProps> = ({ setFilters }) => {
  const [keyword, setKeyword] = useState("");

  return (
    <Box className={styles.filtersBox}>
      <Stack sx={{ flexDirection: "row", height: "100%", gap: 1, flexGrow: 2 }}>
        <FilterTextField
          onChange={(e) => {
            setKeyword(e.target.value);
            setFilters((prev) => {
              return { ...prev, keyword: e.target.value };
            });
          }}
          value={keyword}
          label="Keyword"
          variant="outlined"
          autoComplete="off"
          height="42px"
          InputLabelProps={{ shrink: true }}
          shouldShowBorder={keyword.length !== 0}
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
        <FilterSortSelector setFilters={setFilters} />
      </Stack>
    </Box>
  );
};

export default ListFilters;