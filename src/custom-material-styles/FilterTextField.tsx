import TextField, { TextFieldProps } from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { blue } from "@mui/material/colors";

const FilterTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  padding: 0,
  root: {
    overflow: "hidden",
  },
  input: {
    color: "#EAEBF1",
    padding: "8px",
    height: "26px",
    zIndex: 1,
  },
  label: {
    color: "gray",
  },
  transition: "all 2s",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      transition: "all 0.05s",
      borderColor: "#242328",
      backgroundColor: "#24232855",
      borderWidth: "2px",
    },
    "&:hover fieldset": {
      borderColor: "#242328",
    },
    "&.Mui-focused fieldset": {
      borderColor: blue[600],
    },
  },
}));

export default FilterTextField;
