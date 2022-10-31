import { Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLogin } from "../../../hooks";
import FilterTextField from "../../../custom-material-styles/FilterTextField";
import { Box, Typography, Link, InputAdornment, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import MyLoadingButton from "../../../custom-material-styles/LoadingButton";
import ErrorIcon from "@mui/icons-material/Error";

const defaultError = { email: "", password: "", global: "" };

const LoginPage = () => {
  const login = useLogin();
  const [errors, setErrors] = useState(defaultError);

  const handleFormSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    login.mutate({ password: target.password.value, email: target.email.value });
  };

  useEffect(() => {
    const cause: any = login?.error?.cause;
    const causeProp: any = cause?.extensions?.exception?.validationErrors[0]?.property;

    if (login.error?.message === "Argument Validation Error") {
      if (causeProp === "email") {
        setErrors((prev) => {
          return { ...defaultError, email: "Invalid email" };
        });
      } else if (causeProp === "password") {
        setErrors((prev) => {
          return { ...defaultError, password: "Invalid Password" };
        });
      }
    } else if (login.error?.message === "User doesnt exist") {
      setErrors((prev) => {
        return { ...defaultError, global: "User doesn't exist" };
      });
    } else if (login.error?.message === "Wrong credentials") {
      setErrors((prev) => {
        return { ...defaultError, global: "Wrong credentials" };
      });
    }
  }, [login.error]);

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box
      component="form"
      onSubmit={handleFormSubmit}
      sx={{ display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center", height: "100%", gap: "40px", px: "40px" }}
    >
      <Box sx={{ textAlign: "left", width: "100%", display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography sx={{ color: (theme) => theme.palette.text.primary, fontSize: "1.7rem", mb: "10px" }} variant="h5">
            Sign in to <span style={{ color: "#FF6666" }}>Nxte</span>
          </Typography>
          <Typography sx={{ color: (theme) => theme.palette.text.secondary }}>
            or&nbsp;
            <Link sx={{ color: (theme) => theme.palette.text.secondary }} underline="hover" to="/auth/register" component={RouterLink}>
              create an account
            </Link>
          </Typography>
        </Box>
        <Box
          sx={{
            height: "50px",
            width: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            borderRadius: "50%",
            backgroundColor: (theme) => theme.palette.background.paper,
          }}
        >
          <img style={{ height: "30px", width: "100%", display: "block" }} alt="chain" src="/chains.svg"></img>
        </Box>
      </Box>
      {!!errors.global && (
        <Box
          sx={{
            backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#ef5350dd" : "#ef5350"),
            borderRadius: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            boxSizing: "border-box",
            px: "15px",
            gap: "5px",
            minHeight: "41px",
            width: "100%",
          }}
        >
          <ErrorIcon sx={{ color: "#ffebee" }} />
          <Typography variant="h6" sx={{ fontSize: "0.8rem", color: "#ffebee", fontWeight: "700" }}>
            {errors.global}
          </Typography>
        </Box>
      )}
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%", boxSizing: "border-box", gap: "20px" }}>
        <FilterTextField
          label="Email"
          name="email"
          variant="outlined"
          autoComplete="off"
          InputLabelProps={{ shrink: true }}
          type="text"
          helperText={errors.email || " "}
          error={!!errors.email}
        />
        <FilterTextField
          label="Password"
          name="password"
          variant="outlined"
          autoComplete="off"
          InputLabelProps={{ shrink: true }}
          type={showPassword ? "text" : "password"}
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
      </Box>
      <MyLoadingButton
        loading={login.isLoading}
        shouldDisable={login.isLoading}
        type="submit"
        sx={{ width: "100%", height: "41px", outlineColor: (theme) => theme.palette.divider, color: "#eaebf1" }}
        backgroundcolor="rgba(54, 95, 255, 1)"
      >
        Login
      </MyLoadingButton>
    </Box>
  );
};

export default LoginPage;
