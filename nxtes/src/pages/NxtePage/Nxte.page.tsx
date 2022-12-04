import { useEffect } from "react";
import styles from "./StyleLandingPage.module.css";

import { ListHeader, ListControls, NxteBoard } from "./components";

import useListFilters from "./customHooks/useListFilters";
import NotePopupRoot from "./components/NotePupup/NotePopupRoot.component";

/* iba pre test */
// import FakerListGenerator from "./FakerListGenerator";
import { useNxtes } from "../../queries/queryHooks/Nxte";
import useSelectedNxtes from "./customHooks/useSelectedNxtes";
/*---------------*/

//NOTE: When loggin in for second time in a row without a refresh, too many renders occur
const NxtePage: React.FC = () => {
  const { data: nxtes } = useNxtes();
  const [filtered, setFilters] = useListFilters(nxtes);
  const { selected, dispatchSelect, getFilteredSelectedIds, areAllFilteredSelected } = useSelectedNxtes(filtered?.filteredList ?? []);

  const doesAlreadyExist = (newValue: string): boolean => {
    return nxtes.find(listValue => listValue.value === newValue) === undefined;
  };

  useEffect(() => {
    console.log(nxtes);
    console.log("render");
    console.log(filtered);
  });

  return (
    <div className={styles.LandingContainer}>
      <NotePopupRoot doesAlreadyExist={doesAlreadyExist} />
      <ListHeader setFilters={setFilters} />
      <NxteBoard
        listValues={filtered?.filteredList ?? []}
        selected={selected}
        dispatchSelect={dispatchSelect}
        dataExists={nxtes.length !== 0}
      />
      <ListControls
        shouldBeChecked={areAllFilteredSelected(filtered?.filteredIds ?? [])}
        filteredSelectedIds={getFilteredSelectedIds(filtered?.filteredIds ?? [])}
        selected={selected}
        dispatchSelect={dispatchSelect}
      />
      {/* <FakerListGenerator /> */}
    </div>
  );
};

export default NxtePage;
