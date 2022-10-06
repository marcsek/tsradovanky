import { useState, useCallback, useRef } from "react";
import { ListValues, ListValue, FiltersTypes, ApplyReturn, SetFiltersType } from "../types";
import { sortByDate, sortAtoZ } from "../../../utils/SortingFunctions";

type FiltersHookType = [filtered: ApplyReturn, setFilters: SetFiltersType, filters: FiltersTypes];

const filterValue = (el: ListValue, filters: string) => {
  return el.value.includes(filters);
};

const handleListFiltering = (filters: FiltersTypes, listToFilter: ListValues): ListValues => {
  let filteredList = listToFilter.filter((el) => filterValue(el, filters.keyword));

  if (filters.sort === "AtoZ") {
    filteredList = listToFilter.sort(sortAtoZ);
  } else if (filters.sort === "date") {
    filteredList = listToFilter.sort(sortByDate);
  }
  if (filters.reverse) {
    filteredList = listToFilter.reverse();
  }

  return filteredList;
};

const useListFilters = (baseList: ListValues): FiltersHookType => {
  const filters = useRef<FiltersTypes>({ sort: "date", keyword: "" });
  const [filtered, setFiltered] = useState<ApplyReturn>({ filteredIds: [], filteredList: [] });

  const updateFilters = useCallback(() => {
    const filteredList: ListValues = handleListFiltering(filters.current, baseList);

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
