import { registerUser } from "../../../queries";
import { Link } from "react-router-dom";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { RegisterUserParams } from "../../../queries/types/inputTypes";
import { useLogin } from "../../../hooks";

const RegisterComponent = () => {
  const login = useLogin();

  const { mutate: register }: UseMutationResult<boolean, Error, RegisterUserParams> = useMutation<boolean, Error, RegisterUserParams>(
    async ({ email, password, name }) => registerUser({ email, password, name }),
    {
      onSuccess: (data, variables) => {
        login.mutate({ email: variables.email, password: variables.password });
      },
      onError: (error) => {
        console.log(error, error.cause);
      },
    }
  );
  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    register({ password: e.target.password.value, email: e.target.email.value, name: e.target.name.value });
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit} autoComplete="off">
        <input name="name" defaultValue="dadoKlinko"></input>
        <input name="email" defaultValue="ds@gmail.com"></input>
        <input name="password" defaultValue="kubo2013"></input>
        <button type="submit">Register</button>
      </form>
      <Link to="/auth/login" replace>
        Login
      </Link>
    </div>
  );
};

// import { Link as RouterLink } from "react-router-dom";
// import { useState } from "react";
// import { useLogin } from "../../../hooks";
// import FilterTextField from "../../../custom-material-styles/FilterTextField";
// import { Box, Typography, Link, InputAdornment, IconButton } from "@mui/material";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import MyLoadingButton from "../../../custom-material-styles/LoadingButton";
// import { checkIfEmail } from "../../../utils/validateInputs";

// interface formValuesType {
//   email: { value: string; error: string };
//   password: { value: string; error: string };
// }

// const LoginPage = () => {
//   const login = useLogin();
//   const [formValues, setFormValues] = useState<formValuesType>({ email: { value: "", error: "" }, password: { value: "", error: "" } });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     e.preventDefault();
//     let error = "";
//     if (e.target.name === "email" && !checkIfEmail(e.target.value)) {
//       error = "Invalid Email";
//     }
//     setFormValues((prev) => {
//       return { ...prev, [e.target.name]: { value: e.target.value, error } };
//     });
//   };

//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <Box
//       component="form"
//       sx={{ display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center", height: "100%", gap: "60px", px: "40px" }}
//     >
//       <Box sx={{ textAlign: "left", width: "100%" }}>
//         <Typography sx={{ color: (theme) => theme.palette.text.primary, fontSize: "1.7rem", mb: "10px" }} variant="h5">
//           Sign in to Nxte
//         </Typography>
//         <Typography sx={{ color: (theme) => theme.palette.text.secondary }}>
//           or&nbsp;
//           <Link sx={{ color: "var(--pink)" }} underline="hover" to="/userpage/register" component={RouterLink}>
//             create an account
//           </Link>
//         </Typography>
//       </Box>
//       <Box sx={{ display: "flex", flexDirection: "column", width: "100%", boxSizing: "border-box", gap: "20px" }}>
//         <FilterTextField
//           label="Email"
//           name="email"
//           variant="outlined"
//           autoComplete="off"
//           InputLabelProps={{ shrink: true }}
//           type="text"
//           value={formValues.email.value}
//           error={!!formValues.email.error}
//           onChange={handleInputChange}
//           helperText={formValues.email.error || " "}
//         />
//         <FilterTextField
//           label="Password"
//           name="password"
//           variant="outlined"
//           autoComplete="off"
//           value={formValues.password.value}
//           onChange={handleInputChange}
//           InputLabelProps={{ shrink: true }}
//           type={showPassword ? "text" : "password"}
//           helperText={formValues.password.error || " "}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end" sx={{ zIndex: "1" }}>
//                 <IconButton
//                   aria-label="toggle password visibility"
//                   onClick={() => {
//                     setShowPassword(!showPassword);
//                   }}
//                 >
//                   {showPassword ? (
//                     <VisibilityIcon sx={{ color: "gray", height: "20px", width: "20px" }} />
//                   ) : (
//                     <VisibilityOff sx={{ color: "gray", height: "20px", width: "20px" }} />
//                   )}
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Box>
//       <MyLoadingButton
//         loading={login.isLoading}
//         shouldDisable={login.isLoading}
//         sx={{ width: "100%", height: "41px" }}
//         backgroundcolor="rgba(54, 95, 255, 1)"
//       >
//         Login
//       </MyLoadingButton>
//     </Box>
//   );
// };

// export default LoginPage;

export default RegisterComponent;
