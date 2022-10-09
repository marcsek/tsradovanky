import { useState, useEffect } from "react";

import ToggleButton from "@mui/material/ToggleButton";
import Divider from "@mui/material/Divider";
import { FiltersTypes, SetFiltersType, SortType } from "../types";
import { Stack } from "@mui/material";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";
import DateRangeIcon from "@mui/icons-material/DateRange";
import styles from "../StyleLandingPage.module.css";
import StyledToggleButtonGroup from "../../../custom-material-styles/StyledToggleButtonGroup";

interface SortSlectorControlProps {
  setFilters: SetFiltersType;
  filters: FiltersTypes;
}

const FilterSortSelector: React.FC<SortSlectorControlProps> = ({ setFilters, filters }) => {
  const [sortSelect, setSortSelect] = useState<SortType>(filters.sort);
  const [reverseToggle, setReverseToggle] = useState<string[]>([]);

  const handleSortSelect = (_: any, newFormats: string) => {
    if (newFormats === null || !newFormats?.length) {
      return;
    }
    if (Object.values(SortType).includes(newFormats as unknown as SortType)) {
      const asSortType: SortType = newFormats as SortType;
      setSortSelect(asSortType);
      return;
    }
    console.error("Wrong sort enum type");
  };

  const handleReverseToggle = (_: any, newFormats: string[]) => {
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
        <ToggleButton defaultChecked value={SortType.AtoZ} aria-label="left aligned">
          <SortByAlphaIcon />
        </ToggleButton>
        <ToggleButton value={SortType.Date} aria-label="centered">
          <DateRangeIcon />
        </ToggleButton>
      </StyledToggleButtonGroup>
      <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
      <StyledToggleButtonGroup size="small" value={reverseToggle} onChange={handleReverseToggle}>
        <ToggleButton value="reverse" aria-label="left aligned">
          <FlipCameraAndroidIcon />
        </ToggleButton>
      </StyledToggleButtonGroup>
    </Stack>
  );
};

export default FilterSortSelector;
