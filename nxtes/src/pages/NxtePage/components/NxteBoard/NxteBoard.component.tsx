import { useEffect, useRef, memo } from "react";
import { ListValue } from "../../types";
import styles from "../../StyleLandingPage.module.css";

import { Stack, Typography } from "@mui/material";
import { ListElement } from "../index";
import { AnimatePresence, motion } from "framer-motion";
import { inputListAnimation } from "./InputListAnimation";
import { DispatchSelectAction } from "../../customHooks/useSelectedNxtes";

interface ListControlProps {
  listValues: ListValue[];
  selected: Map<string, boolean>;
  dispatchSelect: React.Dispatch<DispatchSelectAction>;
}

let lastLength = 0;

const NxteBoard: React.FC<ListControlProps> = ({ listValues, selected, dispatchSelect }) => {
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
    dispatchSelect({ type: "switchOne", id: values.id, value: !selected.get(values.id) ?? false });
  };

  return (
    <Stack
      component={motion.div}
      layoutScroll
      className={styles.listContainer}
      sx={{ backgroundColor: theme => theme.palette.background.paper }}
    >
      <AnimatePresence mode="popLayout">
        {listValues.length === 0 ? (
          <Typography
            component={motion.div}
            {...inputListAnimation}
            variant="h4"
            initial={false}
            className={styles.noReminders}
            sx={{ color: theme => theme.palette.text.primary }}
          >
            <p>
              No <span>Nxtes</span>, add some...
            </p>
          </Typography>
        ) : (
          listValues.map((listValue, index) => {
            return (
              <ListElement
                isLast={isLastElement(index)}
                key={listValue.id}
                handleClick={handleElementClick}
                values={listValue}
                isSelected={selected.get(listValue.id) ?? false}
              />
            );
          })
        )}
      </AnimatePresence>
    </Stack>
  );
};

export default memo(NxteBoard);
