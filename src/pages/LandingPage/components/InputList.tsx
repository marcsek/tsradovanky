import { useEffect, useRef } from "react";

import { ListValues, bClickActions } from "../types";
import styles from "../StyleLandingPage.module.css";
import { FaTimes } from "react-icons/fa";

interface ListControlProps {
  listValues: ListValues;
  dispatch: React.Dispatch<bClickActions>;
}

let lastLength = 0;

const InputList: React.FC<ListControlProps> = ({ listValues, dispatch }) => {
  const scollToRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (scollToRef.current !== null && lastLength < listValues.length) {
      scollToRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    lastLength = listValues.length;
  }, [listValues]);

  return (
    <ul className={styles.listContainer}>
      {listValues.map((listValue, index) => {
        return (
          <li ref={index === listValues.length - 1 ? scollToRef : undefined} key={listValue.id}>
            <div className={styles.listElContainer}>
              <h5>{listValue.value}</h5>
              <button
                className={styles.button}
                onClick={(e) => {
                  dispatch({ type: "remove", idx: index });
                }}
              >
                <FaTimes size={20} />
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default InputList;
