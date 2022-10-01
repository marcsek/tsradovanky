import { useState, useCallback } from "react";
import { ListValues } from "../types";

interface ApplyReturn {
  filteredList: ListValues;
  filteredIds: string[];
}
type FiltersHookType = [applyFilters: () => ApplyReturn, setFilters: React.Dispatch<React.SetStateAction<string>>];

const useListFilters = (baseList: ListValues): FiltersHookType => {
  const [filters, setFilters] = useState("");

  const applyFilters = useCallback((): ApplyReturn => {
    let filteredList = baseList.filter((el) => el.value.includes(filters));
    let filteredIds: string[] = [];

    filteredList.forEach((el) => {
      filteredIds.push(el.id);
    });
    return { filteredList, filteredIds };
  }, [baseList, filters]);

  return [applyFilters, setFilters];
};

export default useListFilters;
