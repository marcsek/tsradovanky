import { Link } from "react-router-dom";

import { useLogin } from "../../../hooks";

const LoginPage = () => {
  const login = useLogin();

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    login.mutate({ password: e.target.password.value, email: e.target.email.value });
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit} autoComplete="off">
        <input name="email" defaultValue="ds@gmail.com"></input>
        <input name="password" defaultValue="kubo2013"></input>
        <button type="submit">Login</button>
      </form>
      <Link to="/userpage/register" replace>
        Register
      </Link>
    </div>
  );
};

export default LoginPage;
