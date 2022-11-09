import TextField, { TextFieldProps } from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { blue } from "@mui/material/colors";

type FilterText = TextFieldProps & {
  shouldShowBorder?: boolean;
};

const FilterTextField = styled(TextField, {
  shouldForwardProp: prop => prop !== "shouldShowBorder",
})<FilterText>(({ shouldShowBorder, theme, error }) => ({
  padding: 0,
  width: "100%",

  root: {
    boxSizing: "border-box",
  },
  input: {
    color: theme.palette.text.primary,
    padding: "9px 12px",
    zIndex: 1,
  },
  textarea: {
    zIndex: 1,
  },
  label: {
    color: theme.palette.text.secondary,
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      transition: "border 0.05s",
      backgroundColor: theme.palette.action.active,
      borderColor: shouldShowBorder ? (error ? theme.palette.error : blue[600]) : theme.palette.divider,
      borderWidth: shouldShowBorder ? "2px" : "",
    },
    "&:hover fieldset": {
      borderColor: shouldShowBorder ? blue[400] : error ? theme.palette.error : theme.palette.divider,
    },
    "&.Mui-focused fieldset": {
      borderColor: error ? theme.palette.error : blue[600],
    },
  },
}));

export default FilterTextField;
