import { useReducer } from "react";
import ButtonClickReducer from "./reducers/ButtonClickReducer";
import styles from "./StyleLandingPage.module.css";

import { ListHeader, ListControls, NxteBoard } from "./components";

import useListFilters from "./customHooks/useListFilters";
import NotePopupRoot from "./components/NotePupup/NotePopupRoot";

/* iba pre test */
import FakerListGenerator from "./FakerListGenerator";
/*---------------*/

const NxtePage: React.FC = () => {
  const [listValues, dispatch] = useReducer(ButtonClickReducer, []);
  const [filtered, setFilters] = useListFilters(listValues);

  const areAllSelected = () => {
    if (filtered.filteredList.length === 0) return false;

    return !filtered.filteredList.some((el) => el.checked === false);
  };

  const doesAlreadyExist = (newValue: string): boolean => {
    return listValues.find((listValue) => listValue.value === newValue) === undefined;
  };

  const getFilteredSelectedIds = () => {
    const filteredIds: string[] = [];

    filtered.filteredList.forEach((el) => {
      if (el.checked) {
        filteredIds.push(el.id);
      }
    });

    return filteredIds;
  };

  return (
    <div className={styles.LandingContainer}>
      <NotePopupRoot dispatch={dispatch} doesAlreadyExist={doesAlreadyExist} />
      <ListHeader setFilters={setFilters} />
      <NxteBoard listValues={filtered.filteredList} dispatch={dispatch} />
      <ListControls
        shouldBeChecked={areAllSelected()}
        filteredIds={filtered.filteredIds}
        dispatch={dispatch}
        filteredSelectedIds={getFilteredSelectedIds()}
      />
      <FakerListGenerator dispatch={dispatch} />
    </div>
  );
};

export default NxtePage;
