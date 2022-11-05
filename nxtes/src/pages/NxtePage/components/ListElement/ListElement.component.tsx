import { forwardRef, useState } from "react";

import { Box, Stack, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import { ElementColors, ListValue } from "../../types";
import { elementAnimation, editButtonAnimation } from "./ElementAnimation";
import styles from "./ListElement.module.css";
import { dateFormatSettings } from "../../../../utils/DateFormatSettings";
import EditIcon from "@mui/icons-material/Edit";

import { AnimatePresence, motion } from "framer-motion";
import NotePopupService from "../NotePupup/NotePopupService";
import EditNotePopup from "../NotePupup/NotePopupElements/EditNotePopUp";

interface ListElementProps {
  isLast: boolean;
  handleClick: (values: ListValue) => void;
  values: ListValue;
  isSelected: boolean;
}

const ListElement: React.ForwardRefRenderFunction<HTMLLIElement, ListElementProps> = ({ isLast, handleClick, values, isSelected }, ref) => {
  const [isHovered, setHovered] = useState(false);

  const handleEditButtonClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    NotePopupService.open(EditNotePopup, {
      initialValues: { text: { value: values.color }, title: { value: values.title }, color: values.color as ElementColors },
      id: values.id,
    });
  };

  return (
    <motion.li
      className={styles.listElLi}
      {...elementAnimation}
      layout
      layoutScroll={true}
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Box
        className={styles.listElContainer}
        onClick={() => handleClick(values)}
        sx={{
          color: theme => theme.palette.text.primary,
          backgroundColor: theme => theme.palette.common.white,
        }}
      >
        <Box className={styles.listElTop}>
          <Typography className={styles.elementTitle} sx={{ color: theme => theme.palette.text.primary }} variant="h4">
            {values.title}
          </Typography>
          <Checkbox
            checked={isSelected}
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
          <Typography className={styles.elementText} variant="h5" sx={{ color: theme => theme.palette.text.disabled }}>
            {values.value}
          </Typography>
          <Stack flexDirection="row" alignItems="center" justifyContent="space-between" width="100%">
            <Box className={styles.elementColorIndicator} sx={{ backgroundColor: values.color }}></Box>
            <Typography className={styles.elementDate} sx={{ color: theme => theme.palette.text.secondary }} variant="h6">
              {values.createdAt.toLocaleDateString("en-US", dateFormatSettings)}
            </Typography>
          </Stack>
        </Box>
        <AnimatePresence>
          {isHovered && (
            <Box
              component={motion.div}
              className={styles.elementEditBox}
              onClick={handleEditButtonClick}
              {...editButtonAnimation}
              sx={{
                color: theme => theme.palette.text.primary,
                backgroundColor: theme => (theme.palette.mode === "dark" ? "rgba(42 42 42)" : "rgba(194, 194, 194, 0.5)"),
              }}
            >
              <EditIcon sx={{ height: 18, width: 18 }} />
              <Typography>Edit</Typography>
            </Box>
          )}
        </AnimatePresence>
      </Box>
    </motion.li>
  );
};

export default forwardRef(ListElement);
