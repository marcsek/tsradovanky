import * as yup from "yup";

export const loginValidationSchema = yup.object({
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup.string().min(8, "Must have at least 8 characters").required("Password is required"),
});

export const registerValidatioSchema = yup.object({
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(15, "Name cannot be longer than 15 characters")
    .required("Name is required"),
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Must have at least 8 characters")
    .matches(/^(?=.*\d)(?=.*[a-z]).{8,40}$/, "Password must containt one digit")
    .required("Password is required"),
});
