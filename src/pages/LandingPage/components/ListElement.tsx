import { forwardRef } from "react";

import { Box } from "@mui/system";
import Checkbox from "@mui/material/Checkbox";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import { ListValue } from "../types";
import { Typography } from "@mui/material";
import styles from "../StyleLandingPage.module.css";

import { motion, usePresence } from "framer-motion";

interface ListElementProps {
  isLast: boolean;
  handleClick: (values: ListValue) => void;
  values: ListValue;
}

const transition = { type: "spring", stiffness: 500, damping: 50, mass: 1 };

const ListElement: React.ForwardRefRenderFunction<HTMLLIElement, ListElementProps> = ({ isLast, handleClick, values }, ref) => {
  const [isPresent, safeToRemove] = usePresence();

  const animations = {
    initial: "out",
    animate: isPresent ? "in" : "out",

    variants: {
      in: { scaleY: 1, opacity: 1 },
      out: { scaleY: 0, opacity: 0, zIndex: 0 },
    },

    onAnimationComplete: () => !isPresent && safeToRemove(),
    transition,
  };

  return (
    <motion.li {...animations} layout ref={isLast ? ref : undefined}>
      <Box
        className={styles.listElContainer}
        onClick={() => handleClick(values)}
        sx={{
          color: (theme) => theme.palette.text.primary,
          "& h5:hover": {
            filter: (theme) => (theme.palette.mode === "dark" ? "brightness(1.5)" : "brightness(0.95)"),
          },
        }}
      >
        <Checkbox
          checked={values.checked}
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
        <Typography sx={{ backgroundColor: (theme) => theme.palette.common.white }} variant="h5">
          {values.value}
        </Typography>
      </Box>
    </motion.li>
  );
};

export default forwardRef(ListElement);
