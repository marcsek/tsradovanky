import { Link as RouterLink } from "react-router-dom";
import { useRegister } from "../../../queries/queryHooks/User";
import { useFormik } from "formik";
import { registerValidatioSchema } from "../schemas";
import { Box, Link } from "@mui/material";
import ErrorPupup from "./BuildingComponents/ErrorPupup.component";
import { parseError } from "../../../utils/ParseError";
import AuthTitle from "./BuildingComponents/AuthTitle.component";
import AuthTextInput from "./BuildingComponents/AuthTextInput.component";
import AuthPasswordInput from "./BuildingComponents/AuthPasswordInput.component";
import AuthButton from "./BuildingComponents/AuthButton.component";

const RegisterComponent = () => {
  const register = useRegister();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validationSchema: registerValidatioSchema,
    onSubmit: values => {
      register.mutate(values);
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        gap: "40px",
        px: "40px",
      }}
    >
      <AuthTitle
        headingComp={
          <>
            Create an account for <span style={{ color: "#FF6666" }}>Nxte</span>
          </>
        }
        subHeadComp={
          <>
            Already a user?&nbsp;
            <Link sx={{ color: theme => theme.palette.text.secondary }} underline="hover" to="/auth/login" component={RouterLink}>
              Log in!
            </Link>
          </>
        }
      />
      {register.isError && <ErrorPupup errorMessage={parseError(register.error as Error).cause} />}

      <Box sx={{ display: "flex", flexDirection: "column", width: "100%", boxSizing: "border-box", gap: "25px" }}>
        <AuthTextInput formik={formik} name="name" label="Name" />
        <AuthTextInput formik={formik} name="email" label="Email" />
        <AuthPasswordInput formik={formik} name="password" label="Password" />
      </Box>
      <AuthButton isLoading={register.isLoading} label="Create Account" />
    </Box>
  );
};

export default RegisterComponent;
