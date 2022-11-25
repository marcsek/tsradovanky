import { useReducer, useEffect } from "react";
import { TNxte } from "../types";

export type DispatchSelectAction =
  | { type: "update"; value: TNxte[] }
  | { type: "switchOne"; value: boolean; id: string }
  | { type: "switchMany"; value: boolean; ids: string[] };

function selectReducer(state: Map<string, boolean>, action: DispatchSelectAction) {
  let stateCopy = new Map(state);
  switch (action.type) {
    case "update":
      action.value.forEach(nxte => {
        if (!stateCopy.has(nxte.id)) {
          stateCopy.set(nxte.id, false);
        }
      });
      return stateCopy;

    case "switchOne":
      stateCopy.set(action.id, action.value);
      return stateCopy;

    case "switchMany":
      action.ids.forEach(id => {
        stateCopy.set(id, action.value);
      });
      return stateCopy;

    default:
      return state;
  }
}

const useSelectedNxtes = (nxtes: TNxte[]) => {
  //   const [selected, setSelected] = useState<Map<string, boolean>>(new Map());
  const [selected, dispatchSelect] = useReducer(selectReducer, new Map());

  useEffect(() => {
    dispatchSelect({ type: "update", value: nxtes });
  }, [nxtes]);

  const getFilteredSelectedIds = (filteredIds: string[]) => {
    let selectedIds: string[] = [];

    for (const [key, value] of selected) {
      if (filteredIds.includes(key) && value) {
        selectedIds.push(key);
      }
    }

    return selectedIds;
  };

  const areAllFilteredSelected = (filteredIds: string[]) => {
    for (const [key, value] of selected) {
      if (filteredIds.includes(key) && !value) {
        return false;
      }
    }

    return true;
  };

  return { selected, dispatchSelect, getFilteredSelectedIds, areAllFilteredSelected };
};

export default useSelectedNxtes;
