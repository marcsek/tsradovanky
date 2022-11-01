import { useState } from "react";
import FilterTextField from "../../../../custom-material-styles/FilterTextField";
import { FormikProps } from "formik";
import { InputAdornment, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface AuthTextInputParams {
  formik: FormikProps<any>;
  name: string;
  label: string;
}

const AuthPasswordInput: React.FC<AuthTextInputParams> = ({ formik, name, label }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FilterTextField
      label={label}
      name={name}
      variant="outlined"
      autoComplete="off"
      InputLabelProps={{ shrink: true }}
      type={showPassword ? "text" : "password"}
      value={formik.values[name]}
      onChange={formik.handleChange}
      helperText={formik.touched[name] && String(formik.errors[name] ?? "")}
      error={formik.touched[name] && !!formik.errors[name]}
      onBlur={formik.handleBlur}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end" sx={{ zIndex: "1" }}>
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? (
                <VisibilityIcon sx={{ color: (theme) => theme.palette.text.secondary, height: "20px", width: "20px" }} />
              ) : (
                <VisibilityOff sx={{ color: (theme) => theme.palette.text.secondary, height: "20px", width: "20px" }} />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default AuthPasswordInput;
