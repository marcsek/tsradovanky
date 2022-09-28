import { useEffect, useRef } from "react";

import { ListValues, bClickActions } from "../types";
import styles from "../StyleLandingPage.module.css";

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
      {listValues.map((listValue, index) => {
        return (
          <li ref={isLastElement(index) ? scollToRef : undefined} key={listValue.id}>
            <div className={shouldAnimate(index) ? styles.listNewElement : styles.listElContainer}>
              <h5>{listValue.value}</h5>
              <input
                type="checkbox"
                checked={listValue.checked}
                onChange={() => {
                  dispatch({ type: "check", id: listValue.id, value: !listValue.checked });
                }}
              ></input>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default InputList;
