import React from "react";
import { Stack, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import NxteIcon from "./NxteIcon.svg";
import { useTheme } from "@mui/material/styles";
import NotePopupService from "../../NotePupup/NotePopupService";
import NewNotePopUp from "../../NotePupup/NotePopupElements/NewNotePopUp";

const NoNxteInfo: React.FC<{ title: string }> = ({ title }) => {
  const theme = useTheme();

  return (
    <Stack sx={{ position: "absolute", alignItems: "center", top: "50%", left: "50%", translate: "-50% -50%", gap: "0.6rem" }}>
      <Box>
        <NxteIcon
          forCol={theme.palette.mode === "light" ? "#BCC4CA" : "#343434"}
          bckCol={theme.palette.mode === "light" ? "#676767" : "#A8A8A8"}
        />
      </Box>
      <Stack
        sx={{ gap: "0.4rem" }}
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Typography variant="h5" sx={{ color: theme => theme.palette.text.primary }}>
          {title}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: theme => theme.palette.text.secondary,
            fontSize: "1rem",
            "& span": { color: "#FF6666", textDecoration: "underline", cursor: "pointer" },
          }}
        >
          Go create one <span onClick={() => NotePopupService.open(NewNotePopUp)}>here</span>
        </Typography>
      </Stack>
    </Stack>
  );
};

export default NoNxteInfo;
