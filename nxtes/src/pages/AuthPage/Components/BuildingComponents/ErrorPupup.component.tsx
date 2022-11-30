import React from "react";
import { Box, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

const ErrorPupup: React.FC<{ errorMessage: string }> = ({ errorMessage }) => {
  return (
    <Box
      sx={{
        backgroundColor: theme => (theme.palette.mode === "dark" ? "#ef5350dd" : "#ef5350"),
        borderRadius: "0.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        boxSizing: "border-box",
        px: "15px",
        gap: "5px",
        minHeight: "41px",
        width: "100%",
      }}
    >
      <ErrorIcon sx={{ color: "#ffebee" }} />
      <Typography variant="h6" sx={{ fontSize: "0.8rem", color: "#ffebee", fontWeight: "700" }}>
        {errorMessage}
      </Typography>
    </Box>
  );
};

export default ErrorPupup;
