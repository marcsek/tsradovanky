import { bClickActions } from "../types";
import styles from "../StyleLandingPage.module.css";
import { IoMdRemoveCircleOutline, IoMdAddCircleOutline } from "react-icons/io";

interface ListControlProps {
  textValue: string;
  handleInputChange: React.ChangeEventHandler<HTMLInputElement>;
  dispatch: React.Dispatch<bClickActions>;
  listValuesLength: number;
  handleInputReset: () => void;
}

const ListControls: React.FC<ListControlProps> = ({ textValue, handleInputChange, dispatch, listValuesLength, handleInputReset }) => {
  return (
    <form className={styles.formControl}>
      <label htmlFor="input" className={styles.inputLabel}>
        {`${textValue.length} / 50`}
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
        className={listValuesLength !== 0 ? styles.inputButtonRed : styles.inputButtonInactive}
        onClick={(e) => {
          e.preventDefault();
          dispatch({ type: "remove" });
        }}
      >
        <IoMdRemoveCircleOutline size={25} />
        Remove All
      </button>
    </form>
  );
};

export default ListControls;
