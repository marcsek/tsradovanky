import { useRef, useState } from "react";
import { bClickActions } from "../types";
import styles from "../StyleLandingPage.module.css";
import FilterTextField from "../../../custom-material-styles/FilterTextField";
import ControlButton from "../../../custom-material-styles/ControlButton";
import { IoMdRemoveCircleOutline, IoMdAddCircleOutline } from "react-icons/io";
import { Stack, Typography } from "@mui/material";
import { toast } from "react-toastify";

interface ListControlProps {
  dispatch: { call: React.Dispatch<bClickActions>; params: { ids: string[] } };
  isOneSelected: boolean;
  checkIfCanAdd: (newValue: string) => boolean;
}

let maxCharacterSize = 50;

const ListControls: React.FC<ListControlProps> = ({ dispatch, isOneSelected, checkIfCanAdd }) => {
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

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!checkIfCanAdd(textValue)) {
      toast.warn("Uwaga, toto uz existuje!");
      return;
    }
    handleInputReset();
    dispatch.call({ type: "add", value: textValue });
  };

  return (
    // Musi byt wrapnute vo forme aby fungoval enter submit
    <form onSubmit={handleFormSubmit}>
      <Stack flexDirection="row" className={styles.formControl}>
        <Stack className={styles.textInputCont}>
          <FilterTextField
            onChange={handleInputChange}
            value={textValue}
            className={styles.input}
            label="Reminder Text"
            variant="outlined"
            autoComplete="off"
            height="42px"
            InputLabelProps={{ shrink: true }}
          />
          <Typography
            sx={{ color: (theme) => theme.palette.text.secondary, fontSize: "0.9rem" }}
          >{`${textValue.length} / ${maxCharacterSize}`}</Typography>
        </Stack>
        <ControlButton
          className={styles.inputButton}
          shouldDisable={textValue === ""}
          sx={{ outlineColor: (theme) => theme.palette.divider }}
          backgroundcolor="linear-gradient(90deg, rgba(71, 108, 250, 1) 0%, rgba(54, 95, 255, 1) 100%)"
          type="submit"
        >
          <IoMdAddCircleOutline size={25} />
          Add
        </ControlButton>
        <ControlButton
          className={styles.inputButton}
          shouldDisable={!isOneSelected}
          backgroundcolor="linear-gradient(90deg, rgba(234, 57, 67, 1) 0%, rgba(255, 49, 61, 1) 100%)"
          sx={{ outlineColor: (theme) => theme.palette.divider }}
          onClick={(e) => {
            e.preventDefault();
            handleRemoveReset();
            dispatch.call({ type: "removeSelected", ids: dispatch.params.ids });
          }}
        >
          <IoMdRemoveCircleOutline size={25} />
          Remove Selected
        </ControlButton>
      </Stack>
    </form>
  );
};

export default ListControls;
