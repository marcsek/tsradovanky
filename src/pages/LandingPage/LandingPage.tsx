import { useReducer } from "react";
import ButtonClickReducer from "./reducers/ButtonClickReducer";
import styles from "./StyleLandingPage.module.css";

import InputList from "./components/InputList";
import ListControls from "./components/ListControls";
import ListFilters from "./components/ListFilters";

import useListFilters from "./customHooks/useListFilters";

const LandingPage: React.FC = () => {
  const [listValues, dispatch] = useReducer(ButtonClickReducer, []);
  const [filtered, setFilters, filters] = useListFilters(listValues);

  const areAllSelected = () => {
    if (filtered.filteredList.length === 0) return false;

    return !filtered.filteredList.some((el) => el.checked === false);
  };

  const isOneSelected = () => {
    return filtered.filteredList.some((el) => el.checked === true);
  };

  const checkIfCanAdd = (newValue: string): boolean => {
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
      <ListFilters
        filters={filters}
        setFilters={setFilters}
        shouldBeChecked={areAllSelected()}
        dispatch={dispatch}
        filteredIds={filtered.filteredIds}
      />
      <InputList listValues={filtered.filteredList} dispatch={dispatch} />
      <ListControls
        isOneSelected={isOneSelected()}
        checkIfCanAdd={checkIfCanAdd}
        dispatch={dispatch}
        filteredSelectedIds={getFilteredSelectedIds()}
      />
    </div>
  );
};

export default LandingPage;
