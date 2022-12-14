import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { styled } from "@mui/material/styles";

const MyLoadingButton = styled(LoadingButton, {
  shouldForwardProp: prop => prop !== "backgroundcolor",
})<{ backgroundcolor?: string } & LoadingButtonProps>(({ disabled, backgroundcolor: backgroundColor, theme }) => ({
  backgroundColor,
  color: disabled ? theme.palette.text.secondary : "inherit",
  outlineColor: theme.palette.divider,
  pointerEvents: disabled ? "none" : "all",
  boxShadow: "none",
  transition: "outline 0.075s ease-in-out, background-color 0.15s, color 0.075s ease-in-out",

  "&:focus": {
    outline: `3px solid ${theme.palette.divider}`,
  },

  "&:hover": {
    boxShadow: "none",
    backgroundColor,
  },
}));

export default MyLoadingButton;
