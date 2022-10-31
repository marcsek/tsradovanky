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
      <Link to="/userpage/login" replace>
        Login
      </Link>
    </div>
  );
};

export default RegisterComponent;
