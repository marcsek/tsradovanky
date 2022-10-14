import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";

type ColorPickButtonProps = ButtonProps & {
  backgroundcolor?: string;
  shouldBePicked: boolean;
  represColor: string;
};

const ColorPickButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "shouldBePicked" && prop !== "represColor",
})<ColorPickButtonProps>(({ backgroundcolor: backgroundColor, shouldBePicked, represColor, theme }) => ({
  outlineColor: theme.palette.divider,

  ".MuiTouchRipple-child": {
    backgroundColor: represColor,
  },
  borderColor: shouldBePicked ? `${represColor}55` : theme.palette.divider,
  backgroundColor: shouldBePicked ? `${represColor}11` : theme.palette.common.white,
  //   transition: "outline 0.075s ease-in-out, background-color 0.15s, color 0.075s ease-in-out",

  //   "&:focus": {
  //     outline: `3px solid ${theme.palette.divider}`,
  //   },

  "&:hover": {
    backgroundColor: backgroundColor,
    borderColor: shouldBePicked ? `${represColor}55` : theme.palette.divider,
  },
}));

export default ColorPickButton;
