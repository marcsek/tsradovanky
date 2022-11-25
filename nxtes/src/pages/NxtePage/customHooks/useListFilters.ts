import { useState, useMemo, useTransition } from "react";
import { TNxte, FiltersTypes, SortType } from "../types";
import { sortByDate, sortAtoZ } from "../../../utils/SortingFunctions";
import { defaultFilters } from "../components/ListFilters/DefaultFilters";

export interface FilteredOutput {
  filteredList: TNxte[];
  filteredIds: string[];
}

type FiltersHookType = [filtered: FilteredOutput, setFilters: React.Dispatch<React.SetStateAction<FiltersTypes>>];

const filterValue = (el: TNxte, filters: string) => {
  return el.value.includes(filters) || el.title.includes(filters);
};

const handleListFiltering = (filters: FiltersTypes, listToFilter: TNxte[]): TNxte[] => {
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

const useListFilters = (baseList: TNxte[]): FiltersHookType => {
  const [filters, setFilters] = useState<FiltersTypes>(defaultFilters);
  const [, startTransition] = useTransition();

  const filtered = useMemo<FilteredOutput>(() => {
    const filteredList: TNxte[] = handleListFiltering(filters, baseList);

    let filteredIds: string[] = [];

    filteredList.forEach(el => {
      filteredIds.push(el.id);
    });
    return { filteredList, filteredIds };
  }, [baseList, filters]);

  return [filtered, setFilters];
};

export default useListFilters;
