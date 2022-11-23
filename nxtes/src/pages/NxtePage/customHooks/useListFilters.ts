import { useState, useMemo, useTransition } from "react";
import { ListValue, FiltersTypes, SetFiltersType, SortType } from "../types";
import { sortByDate, sortAtoZ } from "../../../utils/SortingFunctions";
import { defaultFilters } from "../components/ListFilters/DefaultFilters";

export interface FilteredOutput {
  filteredList: ListValue[];
  filteredIds: string[];
}

type FiltersHookType = [filtered: FilteredOutput, setFilters: SetFiltersType];

const filterValue = (el: ListValue, filters: string) => {
  return el.value.includes(filters) || el.title.includes(filters);
};

const handleListFiltering = (filters: FiltersTypes, listToFilter: ListValue[]): ListValue[] => {
  let filteredList = listToFilter.filter(el => filterValue(el, filters.keyword));

  if (filters.sort === SortType.AtoZ) {
    filteredList = filteredList.sort(sortAtoZ);
  } else if (filters.sort === SortType.Date) {
    filteredList = filteredList.sort(sortByDate);
  }
  if (filters.reverse) {
    filteredList = filteredList.reverse();
  }
  return filteredList;
};

const useListFilters = (baseList: ListValue[]): FiltersHookType => {
  const [filters, setFilters] = useState<FiltersTypes>(defaultFilters);
  const [, startTransition] = useTransition();

  const filtered = useMemo<FilteredOutput>(() => {
    const filteredList: ListValue[] = handleListFiltering(filters, baseList);

    let filteredIds: string[] = [];

    filteredList.forEach(el => {
      filteredIds.push(el.id);
    });
    return { filteredList, filteredIds };
  }, [baseList, filters]);

  return [filtered, setFilters];
};

export default useListFilters;
