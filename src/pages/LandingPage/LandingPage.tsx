import { useReducer } from "react";
import ButtonClickReducer from "./reducers/ButtonClickReducer";
import styles from "./StyleLandingPage.module.css";

import InputList from "./components/inputList/InputList";
import ListControls from "./components/ListControls/ListControls";
import ListHeader from "./components/ListHeader/ListHeader";

import useListFilters from "./customHooks/useListFilters";

/* iba pre test */
import FakerListGenerator from "./FakerListGenerator";
import NotePopupRoot from "./components/NotePupup/NotePopupRoot";
/*---------------*/

const LandingPage: React.FC = () => {
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
      <InputList listValues={filtered.filteredList} dispatch={dispatch} />
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

export default LandingPage;
