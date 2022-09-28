import { useState } from "react";
import { ListValues } from "../types";

const useListFilters = () => {
  const [filters, setFilters] = useState("");

  const applyFilters = (list: ListValues): ListValues => {
    return list.filter((el) => el.value.includes(filters));
  };

  return { applyFilters, setFilters };
};

export default useListFilters;
