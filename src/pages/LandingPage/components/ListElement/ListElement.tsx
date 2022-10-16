import { forwardRef, useState } from "react";

import { Box, Stack } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import { ElementColors, ListValue, NewNoteFormType } from "../../types";
import { Typography } from "@mui/material";
import { elementAnimation } from "./ElementAnimation";
import styles from "./ListElement.module.css";
import { dateFormatSettings } from "../../../../utils/DateFormatSettings";
import EditIcon from "@mui/icons-material/Edit";

import { AnimatePresence, motion } from "framer-motion";
import NotePopupService from "../NotePupup/NotePopupService";
import AnotherTestTwo from "../NotePupup/NotePopupElements/EditNotePopUp";

interface ListElementProps {
  isLast: boolean;
  handleClick: (values: ListValue) => void;
  values: ListValue;
}

const ListElement: React.ForwardRefRenderFunction<HTMLLIElement, ListElementProps> = ({ isLast, handleClick, values }, ref) => {
  const [isHovered, setHovered] = useState(false);

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
          <Stack flexDirection="row" alignItems="center" justifyContent="space-between" width="100%">
            <Box sx={{ backgroundColor: values.color, width: "15%", height: "14.4px", borderRadius: "1rem" }}></Box>
            <Typography className={styles.elementDate} sx={{ color: (theme) => theme.palette.text.secondary }} variant="h6">
              {values.date.toLocaleDateString("en-US", dateFormatSettings)}
            </Typography>
          </Stack>
        </Box>
        <AnimatePresence>
          {isHovered && (
            <Box
              component={motion.div}
              initial={{ translate: "-50%", opacity: 0 }}
              animate={{ translate: "0%", opacity: 1 }}
              exit={{ scale: "0%", opacity: 0 }}
              onClick={(e) => {
                e.stopPropagation();
                const daco: NewNoteFormType = {
                  text: { value: values.value, maxSize: 230 },
                  title: { value: values.title, maxSize: 50 },
                  color: values.color as ElementColors,
                };
                NotePopupService.open(AnotherTestTwo, { initialValues: daco, id: values.id });
              }}
              sx={{
                backgroundColor: "rgba(27,27,30, 0.5)",
                position: "absolute",
                height: 25,
                p: "2px 10px",
                left: 0,
                top: 0,
                borderRadius: "8px 15px 15px 0px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
                color: (theme) => theme.palette.text.primary,
                cursor: "pointer",
              }}
            >
              <EditIcon sx={{ height: 18, width: 18 }}></EditIcon>
              <Typography sx={{}}>Edit</Typography>
            </Box>
          )}
        </AnimatePresence>
      </Box>
    </motion.li>
  );
};

export default forwardRef(ListElement);
