import { TNxte } from "../pages/NxtePage/types";

export const parseDate = (userNxtes: TNxte[]) => {
  let parsedNxtes = [];
  try {
    parsedNxtes = userNxtes.map((nxte: TNxte) => {
      return { ...nxte, createdAt: new Date(nxte.createdAt) };
    });
  } catch (err) {
    throw new Error("Parsing Schema Failed");
  }
  return parsedNxtes;
};
