import { useReducer } from "react";
import ButtonClickReducer from "./reducers/ButtonClickReducer";
import styles from "./StyleLandingPage.module.css";

import InputList from "./components/InputList";
import ListControls from "./components/ListControls";
import ListFilters from "./components/ListFilters";

import useListFilters from "./customHooks/useListFilters";

const LandingPage: React.FC = () => {
  const [listValues, dispatch] = useReducer(ButtonClickReducer, []);
  const { applyFilters, setFilters } = useListFilters();

  const areAllSelected = () => {
    if (listValues.length === 0) return false;

    return !listValues.some((el) => el.checked === false);
  };

  const isOneSelected = () => {
    return listValues.some((el) => el.checked === true);
  };

  return (
    <div className={styles.LandingContainer}>
      <ListFilters setFilters={setFilters} shouldBeChecked={areAllSelected()} dispatch={dispatch} />
      <InputList listValues={applyFilters(listValues)} dispatch={dispatch} />
      <ListControls isOneSelected={isOneSelected()} dispatch={dispatch} />
    </div>
  );
};

export default LandingPage;
