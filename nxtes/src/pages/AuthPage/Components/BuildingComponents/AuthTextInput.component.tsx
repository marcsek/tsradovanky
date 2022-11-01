import React from "react";
import FilterTextField from "../../../../custom-material-styles/FilterTextField";
import { FormikProps } from "formik";

interface AuthTextInputParams {
  formik: FormikProps<any>;
  name: string;
  label: string;
}

const AuthTextInput: React.FC<AuthTextInputParams> = ({ formik, name, label }) => {
  return (
    <FilterTextField
      label={label}
      name={name}
      variant="outlined"
      autoComplete="off"
      InputLabelProps={{ shrink: true }}
      type="text"
      value={formik.values[name]}
      onChange={formik.handleChange}
      helperText={formik.touched[name] && String(formik.errors[name] ?? "")}
      error={formik.touched[name] && !!formik.errors[name]}
      onBlur={formik.handleBlur}
    />
  );
};

export default AuthTextInput;
