import { NxteSchema } from "../../queries/schemas/Nxte";

export type TNxte = Zod.infer<typeof NxteSchema>;

export interface FiltersTypes {
  sort: SortType;
  reverse?: boolean;
  keyword: string;
}

export enum SortType {
  AtoZ = "ATOZ",
  Date = "DATE",
}

export enum ElementColors {
  GREEN = "#00AB55",
  YELLOW = "#FDA92D",
  BLUE = "#2065D1",
  RED = "#FF3030",
  PURPLE = "#7635DC",
}
