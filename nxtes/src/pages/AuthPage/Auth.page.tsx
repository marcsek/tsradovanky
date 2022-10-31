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

  return <div>{InnerComponent}</div>;
};

export default AuthPage;
