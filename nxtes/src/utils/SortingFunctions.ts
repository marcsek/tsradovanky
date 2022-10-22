import { ListValue } from "../pages/LandingPage/types";

type SortFuncionType = (a: ListValue, b: ListValue) => 1 | -1 | 0;

const sortAtoZ: SortFuncionType = (a, b) => {
  if (a.title.toLowerCase() > b.title.toLowerCase()) {
    return 1;
  }
  return -1;
};

const sortByDate: SortFuncionType = (a, b) => {
  if (a.date.getTime() < b.date.getTime()) {
    return 1;
  }
  return -1;
};

export { sortByDate, sortAtoZ };
