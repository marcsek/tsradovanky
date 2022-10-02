import { useState, useCallback, useRef } from "react";
import { ListValues, ListValue, FiltersTypes, ApplyReturn, SetFiltersType } from "../types";

type FiltersHookType = [filtered: ApplyReturn, setFilters: SetFiltersType, filters: FiltersTypes];

const sortAtoZ = (a: ListValue, b: ListValue) => {
  if (a.value.toLowerCase() > b.value.toLowerCase()) {
    return 1;
  }
  return -1;
};

const filterValue = (el: ListValue, filters: string) => {
  return el.value.includes(filters);
};

const useListFilters = (baseList: ListValues): FiltersHookType => {
  const filters = useRef<FiltersTypes>({ sort: "date", keyword: "" });
  const [filtered, setFiltered] = useState<ApplyReturn>({ filteredIds: [], filteredList: [] });

  const updateFilters = useCallback(() => {
    let filteredList: ListValues = baseList.filter((el) => filterValue(el, filters.current.keyword));
    if (filters.current.sort === "AtoZ") {
      filteredList = filteredList.sort(sortAtoZ);
    }
    if (filters.current.reverse) {
      filteredList = filteredList.reverse();
    }
    let filteredIds: string[] = [];

    filteredList.forEach((el) => {
      filteredIds.push(el.id);
    });
    setFiltered({ filteredList, filteredIds });
  }, [baseList]);

  const setFilters = useCallback(
    (prev: (prev: FiltersTypes) => FiltersTypes) => {
      filters.current = prev(filters.current);
      updateFilters();
    },
    [updateFilters]
  );

  return [filtered, setFilters, filters.current];
};

export default useListFilters;
