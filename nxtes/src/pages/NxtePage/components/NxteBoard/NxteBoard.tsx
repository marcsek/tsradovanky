import { useEffect, useRef, memo } from "react";

import { ListValues, bClickActions, ListValue } from "../../types";
import styles from "../../StyleLandingPage.module.css";

import { Stack, Typography } from "@mui/material";
import { ListElement } from "../index";
import { AnimatePresence, motion } from "framer-motion";
import { inputListAnimation } from "./InputListAnimation";

interface ListControlProps {
  listValues: ListValues;
  dispatch: React.Dispatch<bClickActions>;
}

let lastLength = 0;

const NxteBoard: React.FC<ListControlProps> = ({ listValues, dispatch }) => {
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

  const handleElementClick = (values: ListValue) => {
    dispatch({ type: "check", id: values.id, value: !values.checked });
  };

  return (
    <Stack component={motion.div} layoutScroll className={styles.listContainer} sx={{ backgroundColor: (theme) => theme.palette.background.paper }}>
      <AnimatePresence mode="popLayout">
        {listValues.length === 0 ? (
          <Typography
            component={motion.div}
            {...inputListAnimation}
            variant="h4"
            className={styles.noReminders}
            sx={{ color: (theme) => theme.palette.text.primary }}
          >
            <p>
              No <strong>Nxtes</strong>, add some...
            </p>
          </Typography>
        ) : (
          listValues.map((listValue, index) => {
            return <ListElement isLast={isLastElement(index)} key={listValue.id} handleClick={handleElementClick} values={listValue} />;
          })
        )}
      </AnimatePresence>
    </Stack>
  );
};

export default memo(NxteBoard);
