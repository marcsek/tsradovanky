import { Link as RouterLink } from "react-router-dom";
import { useLogin } from "../../../queries/queryHooks/User";
import { Box, Link } from "@mui/material";
import { useFormik } from "formik";
import { loginValidationSchema } from "../schemas";
import ErrorPupup from "./BuildingComponents/ErrorPupup.component";
import { parseError } from "../../../utils/ParseError";

import AuthTitle from "./BuildingComponents/AuthTitle.component";
import AuthTextInput from "./BuildingComponents/AuthTextInput.component";
import AuthPasswordInput from "./BuildingComponents/AuthPasswordInput.component";
import AuthButton from "./BuildingComponents/AuthButton.component";

const LoginPage: React.FC = () => {
  const login = useLogin();

  const formik = useFormik({
    initialValues: {
      email: "ds@gmail.com",
      password: "kubo2013",
    },
    validationSchema: loginValidationSchema,
    onSubmit: values => {
      login.mutate(values);
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
            Sign in to <span style={{ color: "#FF6666" }}>Nxte</span>
          </>
        }
        subHeadComp={
          <>
            or&nbsp;
            <Link sx={{ color: theme => theme.palette.text.secondary }} underline="hover" to="/auth/register" component={RouterLink}>
              create an account!
            </Link>
          </>
        }
      />
      {login.isError && <ErrorPupup errorMessage={parseError(login.error as Error).cause} />}
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%", boxSizing: "border-box", gap: "25px" }}>
        <AuthTextInput formik={formik} label="Email" name="email" />
        <AuthPasswordInput formik={formik} label="Password" name="password" />
      </Box>
      <AuthButton isLoading={login.isLoading} label="Login" />
    </Box>
  );
};

export default LoginPage;
