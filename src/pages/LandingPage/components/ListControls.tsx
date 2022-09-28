import { useRef, useState } from "react";
import { bClickActions } from "../types";
import styles from "../StyleLandingPage.module.css";
import { IoMdRemoveCircleOutline, IoMdAddCircleOutline } from "react-icons/io";

interface ListControlProps {
  dispatch: React.Dispatch<bClickActions>;
  isOneSelected: boolean;
}

let maxCharacterSize = 50;

const ListControls: React.FC<ListControlProps> = ({ dispatch, isOneSelected }) => {
  const [textValue, setTextValue] = useState<string>("");
  const selectAllRef = useRef<HTMLInputElement>(null);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (maxCharacterSize - event.target.value.length >= 0) {
      setTextValue(event.target.value);
    }
  };

  const handleInputReset = () => {
    setTextValue("");
  };

  const handleRemoveReset = () => {
    if (selectAllRef.current !== null) selectAllRef.current.checked = false;
  };

  return (
    <form className={styles.formControl}>
      <label htmlFor="input" className={styles.inputLabel}>
        {`${textValue.length} / ${maxCharacterSize}`}
      </label>
      <input id="input" className={styles.input} typeof="text" value={textValue} onChange={handleInputChange}></input>
      <button
        className={textValue !== "" ? styles.inputButtonGreen : styles.inputButtonInactive}
        onClick={(e) => {
          e.preventDefault();
          handleInputReset();
          dispatch({ type: "add", value: textValue });
        }}
      >
        <IoMdAddCircleOutline size={25} />
        Add
      </button>
      <button
        className={isOneSelected ? styles.inputButtonRed : styles.inputButtonInactive}
        onClick={(e) => {
          e.preventDefault();
          handleRemoveReset();
          dispatch({ type: "removeSelected" });
        }}
      >
        <IoMdRemoveCircleOutline size={25} />
        Remove Selected
      </button>
    </form>
  );
};

export default ListControls;
