import { useRef, useState } from "react";
import { bClickActions } from "../types";
import styles from "../StyleLandingPage.module.css";
import FilterTextField from "../../../custom-material-styles/FilterTextField";
import { IoMdRemoveCircleOutline, IoMdAddCircleOutline } from "react-icons/io";
import FormControlLabel from "@mui/material/FormControlLabel";

interface ListControlProps {
  dispatch: { call: React.Dispatch<bClickActions>; params: { ids: number[] } };
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
      <FormControlLabel
        sx={{
          display: "flex",
          marginRight: "10px",
          marginLeft: 0,
          alignItems: "flex-start",
          gap: "5px",
          "&	.MuiFormControlLabel-label": {
            color: "gray",
            fontSize: "0.9rem",
          },
        }}
        control={
          <FilterTextField
            onChange={handleInputChange}
            value={textValue}
            className={styles.input}
            label="Reminder Text"
            variant="outlined"
            autoComplete="off"
            margin="none"
            InputLabelProps={{ shrink: true }}
            sx={{
              marginRight: "10px",
              height: "42px",
              width: "100%",
            }}
          />
        }
        label={`${textValue.length} / ${maxCharacterSize}`}
        labelPlacement="bottom"
      />
      <button
        className={textValue !== "" ? styles.inputButtonGreen : styles.inputButtonInactive}
        onClick={(e) => {
          e.preventDefault();
          handleInputReset();
          dispatch.call({ type: "add", value: textValue });
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
          dispatch.call({ type: "removeSelected", ids: dispatch.params.ids });
        }}
      >
        <IoMdRemoveCircleOutline size={25} />
        Remove Selected
      </button>
    </form>
  );
};

export default ListControls;
