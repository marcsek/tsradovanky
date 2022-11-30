import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import ControlButton from "../custom-material-styles/ControlButton";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const ErrorModal: React.FC<{ resetErrorBoundary: () => void; error: Error }> = ({ resetErrorBoundary, error }) => {
  console.log(error.message);
  return (
    <Stack
      sx={{
        width: "clamp(60%, 700px, 100%)",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        gap: "50px",
      }}
    >
      <Stack
        sx={{ p: "1.5rem", backgroundColor: "#FF666642", width: "fit-content", height: "fit-content", borderRadius: "50%", mb: "10px" }}
      >
        <WarningAmberIcon sx={{ width: "100px", height: "100px", pb: "5px", boxSizing: "border-box", color: "#FF6666" }} />
      </Stack>
      <Stack sx={{ gap: "10px" }}>
        <Typography variant="h4" sx={{ color: theme => theme.palette.text.primary, minWidth: "max-content" }}>
          There was an Error
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: theme => theme.palette.text.secondary,
            fontSize: "1.1rem",
            "& span": { color: "#FF6666", textDecoration: "underline", cursor: "pointer" },
          }}
        >
          Please retry now or try again later.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: theme => theme.palette.text.secondary,
            fontSize: "0.7rem",
            "& span": { color: "#FF6666", textDecoration: "underline", cursor: "pointer" },
          }}
        >
          <>Error Code: {error.cause}</>
        </Typography>
      </Stack>
      <ControlButton
        onClick={resetErrorBoundary}
        variant="outlined"
        outlinecolor="#FF6666"
        sx={{ px: "30px", py: "7px", color: theme => theme.palette.text.primary }}
      >
        Retry Now
      </ControlButton>
    </Stack>
  );
};

export default ErrorModal;
