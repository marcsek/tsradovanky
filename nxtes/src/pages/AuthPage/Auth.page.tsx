import { Stack, Box, Paper } from "@mui/material";
import { Navigate, useLocation, useParams } from "react-router-dom";
import LoginPage from "./Components/Login.component";
import RegisterComponent from "./Components/Register.component";

const AuthPage: React.FC = () => {
  const location = useLocation();
  const { type } = useParams();

  const InnerComponent: React.ReactNode = type ? (
    <>{type === "register" ? <RegisterComponent /> : <LoginPage />}</>
  ) : (
    <Navigate to="login" state={{ from: location }} replace />
  );

  return (
    <Stack sx={{ flexDirection: "row", height: "100%" }}>
      <Box sx={{ flexGrow: 1, backgroundColor: theme => theme.palette.background.paper }}></Box>
      <Paper
        elevation={1}
        sx={{ flexBasis: "clamp(80%, 700px, 100%)", maxWidth: "500px", background: theme => theme.palette.background.default }}
      >
        {InnerComponent}
      </Paper>
    </Stack>
  );
};

export default AuthPage;
