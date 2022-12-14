import { TNxte } from "../pages/NxtePage/types";

type SortFuncionType = (a: TNxte, b: TNxte) => 1 | -1 | 0;

const sortAtoZ: SortFuncionType = (a, b) => {
  if (a.title.toLowerCase() > b.title.toLowerCase()) {
    return 1;
  }
  return -1;
};

const sortByDate: SortFuncionType = (a, b) => {
  if (a.createdAt.getTime() < b.createdAt.getTime()) {
    return 1;
  }
  return -1;
};

export { sortByDate, sortAtoZ };
