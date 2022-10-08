import { forwardRef } from "react";

import { Box } from "@mui/system";
import Checkbox from "@mui/material/Checkbox";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import { ListValue } from "../../types";
import { Typography } from "@mui/material";
import { elementAnimation } from "./ElementAnimation";
import styles from "./ListElement.module.css";
import { dateFormatSettings } from "../../../../utils/DateFormatSettings";

import { motion, usePresence } from "framer-motion";

interface ListElementProps {
  isLast: boolean;
  handleClick: (values: ListValue) => void;
  values: ListValue;
}

const ListElement: React.ForwardRefRenderFunction<HTMLLIElement, ListElementProps> = ({ isLast, handleClick, values }, ref) => {
  const [isPresent, safeToRemove] = usePresence();

  const animation = elementAnimation(isPresent, safeToRemove);

  return (
    <motion.li className={styles.listElLi} {...animation} layout ref={isLast ? ref : undefined}>
      <Box
        className={styles.listElContainer}
        onClick={() => handleClick(values)}
        sx={{
          color: (theme) => theme.palette.text.primary,
          backgroundColor: (theme) => theme.palette.common.white,
        }}
      >
        <Box className={styles.listElTop}>
          <Typography className={styles.elementTitle} sx={{ color: (theme) => theme.palette.text.primary }} variant="h4">
            {values.title}
          </Typography>
          <Checkbox
            checked={values.checked}
            className={styles.checkbox}
            onChange={() => handleClick(values)}
            checkedIcon={<CheckCircleRoundedIcon />}
            icon={<RadioButtonUncheckedRoundedIcon />}
            sx={{
              color: "#757575",
              "&.Mui-checked": {
                color: "#42a5f5",
              },
            }}
          />
        </Box>
        <Box className={styles.listElementBox}>
          <Typography className={styles.elementText} variant="h5" sx={{ color: (theme) => theme.palette.text.disabled }}>
            {values.value}
          </Typography>
          <Typography className={styles.elementDate} sx={{ color: (theme) => theme.palette.text.secondary }} variant="h6">
            {values.date.toLocaleDateString("en-US", dateFormatSettings)}
          </Typography>
        </Box>
      </Box>
    </motion.li>
  );
};

export default forwardRef(ListElement);
