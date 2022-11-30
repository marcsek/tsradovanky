import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const ControlButton = styled(Button, {
  shouldForwardProp: prop => prop !== "backgroundcolor",
})<{ backgroundcolor?: string; outlinecolor?: string } & ButtonProps>(
  ({ disabled, backgroundcolor: backgroundColor, theme, variant, outlinecolor: outlineColor }) => ({
    backgroundColor,
    color: disabled ? theme.palette.text.secondary : "inherit",
    outlineColor: variant === "outlined" ? "none" : theme.palette.divider,
    pointerEvents: disabled ? "none" : "all",
    border: variant === "outlined" ? `2px solid ${outlineColor}` : "inherit",

    boxShadow: "none",
    transition: "outline 0.075s ease-in-out, background-color 0.15s, color 0.075s ease-in-out",

    "&:focus": {
      outline: variant !== "outlined" ? `3px solid ${theme.palette.divider}` : "none",
      border: variant === "outlined" ? `2px solid ${outlineColor}` : "inherit",
    },

    "&:hover": {
      boxShadow: "none",
      border: variant === "outlined" ? `2px solid ${outlineColor}` : "inherit",
      backgroundColor: backgroundColor ? backgroundColor : theme.palette.action.hover,
    },
  })
);

export default ControlButton;
