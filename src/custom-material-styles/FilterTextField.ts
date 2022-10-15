import TextField, { TextFieldProps } from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { blue } from "@mui/material/colors";

type FilterText = TextFieldProps & {
  shouldShowBorder?: boolean;
  height?: string | number;
};

const FilterTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== "shouldShowBorder",
})<FilterText>(({ shouldShowBorder, height, theme }) => ({
  padding: 0,
  width: "100%",

  root: {
    boxSizing: "border-box",
  },
  input: {
    color: theme.palette.text.primary,
    padding: "0 8px",
    height,
    zIndex: 1,
  },
  textarea: {
    color: theme.palette.text.disabled,
    zIndex: 1,
  },
  label: {
    color: theme.palette.text.secondary,
    // fontSize: "1.02rem",
    // left: "-2px",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      transition: "border 0.05s",
      backgroundColor: theme.palette.action.active,
      borderColor: shouldShowBorder ? blue[600] : theme.palette.divider,
      borderWidth: shouldShowBorder ? "2px" : "",
    },
    "&:hover fieldset": {
      borderColor: shouldShowBorder ? blue[400] : theme.palette.divider,
    },
    "&.Mui-focused fieldset": {
      borderColor: blue[600],
    },
  },
}));

export default FilterTextField;
