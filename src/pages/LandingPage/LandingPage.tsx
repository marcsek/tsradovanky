import { useReducer } from "react";
import ButtonClickReducer from "./reducers/ButtonClickReducer";
import styles from "./StyleLandingPage.module.css";

import InputList from "./components/InputList";
import ListControls from "./components/ListControls";
import ListFilters from "./components/ListFilters";

import useListFilters from "./customHooks/useListFilters";

const LandingPage: React.FC = () => {
  const [listValues, dispatch] = useReducer(ButtonClickReducer, []);
  const [applyFilters, setFilters] = useListFilters(listValues);

  let filtersOutcome = applyFilters();

  const areAllSelected = () => {
    if (filtersOutcome.filteredList.length === 0) return false;

    return !filtersOutcome.filteredList.some((el) => el.checked === false);
  };

  const isOneSelected = () => {
    return filtersOutcome.filteredList.some((el) => el.checked === true);
  };

  return (
    <div className={styles.LandingContainer}>
      <ListFilters
        setFilters={setFilters}
        shouldBeChecked={areAllSelected()}
        dispatch={{ call: dispatch, params: { ids: filtersOutcome.filteredIds } }}
      />
      <InputList listValues={filtersOutcome.filteredList} dispatch={dispatch} />
      <ListControls isOneSelected={isOneSelected()} dispatch={{ call: dispatch, params: { ids: filtersOutcome.filteredIds } }} />
    </div>
  );
};

export default LandingPage;
