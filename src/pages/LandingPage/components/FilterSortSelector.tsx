import { useState, useEffect } from "react";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Divider from "@mui/material/Divider";
import { FiltersTypes, SetFiltersType } from "../types";
import { styled } from "@mui/material/styles";
import { Stack } from "@mui/material";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";
import DateRangeIcon from "@mui/icons-material/DateRange";
import styles from "../StyleLandingPage.module.css";

interface SortSlectorControlProps {
  setFilters: SetFiltersType;
  filters: FiltersTypes;
}

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: 0,
    color: theme.palette.text.secondary,
    "&.Mui-selected": {
      color: theme.palette.text.primary,
    },
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

const FilterSortSelector: React.FC<SortSlectorControlProps> = ({ setFilters, filters }) => {
  const [sortSelect, setSortSelect] = useState<string>(filters.sort);
  const [reverseToggle, setReverseToggle] = useState<string[]>([]);

  const handleSortSelect = (event: React.MouseEvent<HTMLElement>, newFormats: string) => {
    if (newFormats?.length) {
      setSortSelect(newFormats);
    }
  };

  const handleReverseToggle = (event: React.MouseEvent<HTMLElement>, newFormats: string[]) => {
    setReverseToggle(newFormats);
  };

  useEffect(() => {
    setFilters((prev) => {
      return { ...prev, sort: sortSelect, reverse: reverseToggle.length ? true : false };
    });
  }, [sortSelect, reverseToggle, setFilters]);

  return (
    <Stack
      className={styles.filterSelector}
      sx={{
        border: (theme) => `1px solid ${theme.palette.divider}`,
        backgroundColor: (theme) => theme.palette.action.active,
      }}
    >
      <StyledToggleButtonGroup size="small" value={sortSelect} exclusive onChange={handleSortSelect}>
        <ToggleButton defaultChecked value="AtoZ" aria-label="left aligned">
          <SortByAlphaIcon />
        </ToggleButton>
        <ToggleButton value="date" aria-label="centered">
          <DateRangeIcon />
        </ToggleButton>
      </StyledToggleButtonGroup>
      <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
      <StyledToggleButtonGroup size="small" value={reverseToggle} onChange={handleReverseToggle}>
        <ToggleButton value="AtoZ" aria-label="left aligned">
          <FlipCameraAndroidIcon />
        </ToggleButton>
      </StyledToggleButtonGroup>
    </Stack>
  );
};

export default FilterSortSelector;
