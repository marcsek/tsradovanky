import { useEffect, useRef } from "react";

import { ListValues, bClickActions } from "../types";
import styles from "../StyleLandingPage.module.css";

import Checkbox from "@mui/material/Checkbox";
import { blue, grey } from "@mui/material/colors";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";

interface ListControlProps {
  listValues: ListValues;
  dispatch: React.Dispatch<bClickActions>;
}

let lastLength = 0;

const InputList: React.FC<ListControlProps> = ({ listValues, dispatch }) => {
  const scollToRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (lastLength < listValues.length) {
      scollToRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    lastLength = listValues.length;
  }, [listValues]);

  const isLastElement = (index: number): boolean => {
    return index === listValues.length - 1;
  };

  const shouldAnimate = (index: number): boolean => {
    return isLastElement(index) && lastLength <= listValues.length;
  };

  return (
    <ul className={styles.listContainer}>
      {listValues.length === 0 ? (
        <div className={styles.noReminders}>No reminders 🦉</div>
      ) : (
        listValues.map((listValue, index) => {
          return (
            <li ref={isLastElement(index) ? scollToRef : undefined} key={listValue.id}>
              <div
                className={shouldAnimate(index) ? styles.listNewElement : styles.listElContainer}
                onClick={() => {
                  dispatch({ type: "check", id: listValue.id, value: !listValue.checked });
                }}
              >
                <Checkbox
                  checked={listValue.checked}
                  onChange={() => {
                    dispatch({ type: "check", id: listValue.id, value: !listValue.checked });
                  }}
                  checkedIcon={<CheckCircleRoundedIcon />}
                  icon={<RadioButtonUncheckedRoundedIcon />}
                  sx={{
                    color: grey[600],
                    "&.Mui-checked": {
                      color: blue[400],
                    },
                  }}
                />
                <h5>{listValue.value}</h5>
              </div>
            </li>
          );
        })
      )}
    </ul>
  );
};

export default InputList;
