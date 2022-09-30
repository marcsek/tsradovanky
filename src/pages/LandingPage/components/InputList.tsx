import { useEffect, useRef } from "react";

import { ListValues, bClickActions } from "../types";
import styles from "../StyleLandingPage.module.css";

import Checkbox from "@mui/material/Checkbox";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import { Box } from "@mui/system";
import { Stack, Typography } from "@mui/material";

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
    <Stack className={styles.listContainer} sx={{ backgroundColor: (theme) => theme.palette.background.paper }}>
      {listValues.length === 0 ? (
        <Typography variant="h4" className={styles.noReminders} sx={{ color: (theme) => theme.palette.text.primary }}>
          No reminders 🦉
        </Typography>
      ) : (
        listValues.map((listValue, index) => {
          return (
            <li ref={isLastElement(index) ? scollToRef : undefined} key={listValue.id}>
              <Box
                className={shouldAnimate(index) ? styles.listNewElement : styles.listElContainer}
                onClick={() => {
                  dispatch({ type: "check", id: listValue.id, value: !listValue.checked });
                }}
                sx={{
                  color: (theme) => theme.palette.text.primary,
                  "& h5:hover": {
                    filter: (theme) => (theme.palette.mode === "dark" ? "brightness(1.5)" : "brightness(0.95)"),
                  },
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
                    color: "#757575",
                    "&.Mui-checked": {
                      color: "#42a5f5",
                    },
                  }}
                />
                <Typography sx={{ backgroundColor: (theme) => theme.palette.common.white }} variant="h5">
                  {listValue.value}
                </Typography>
              </Box>
            </li>
          );
        })
      )}
    </Stack>
  );
};

export default InputList;
