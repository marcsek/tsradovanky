import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";

type ControlButtonType = ButtonProps & {
  shouldDisable?: boolean;
  backgroundcolor?: string;
};

const ControlButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "shouldDisable",
})<ControlButtonType>(({ shouldDisable, backgroundcolor: backgroundColor, theme }) => ({
  background: shouldDisable ? theme.palette.common.white : backgroundColor,
  color: shouldDisable ? theme.palette.text.secondary : "inherit",
  outlineColor: theme.palette.divider,
  pointerEvents: shouldDisable ? "none" : "all",

  transition: "outline 0.075s ease-in-out, background-color 0.15s, color 0.075s ease-in-out",

  "&:focus": {
    outline: `3px solid ${theme.palette.divider}`,
  },

  "&:hover": {
    backgroundColor: backgroundColor,
  },
}));

export default ControlButton;
