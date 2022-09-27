import { useState, useReducer } from "react";
import ButtonClickReducer from "./reducers/ButtonClickReducer";
import styles from "./StyleLandingPage.module.css";

import InputList from "./components/InputList";
import ListControls from "./components/ListControls";

const LandingPage: React.FC = () => {
  const [textValue, setTextValue] = useState<string>("");
  const [listValues, dispatch] = useReducer(ButtonClickReducer, []);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (50 - event.target.value.length >= 0) {
      setTextValue(event.target.value);
    }
  };

  const handleInputReset = () => {
    setTextValue("");
  };

  return (
    <div className={styles.LandingContainer}>
      <InputList listValues={listValues} dispatch={dispatch} />
      <ListControls
        listValuesLength={listValues.length}
        textValue={textValue}
        handleInputChange={handleInputChange}
        handleInputReset={handleInputReset}
        dispatch={dispatch}
      />
    </div>
  );
};

export default LandingPage;
