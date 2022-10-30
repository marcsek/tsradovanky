import React, { useContext } from "react";
import { loginUser, logoutUser } from "../../queries";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { LoginUserParams } from "../../queries/types/inputTypes";

const UserPage: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const { mutate: login }: UseMutationResult<boolean, Error, LoginUserParams> = useMutation<boolean, Error, LoginUserParams>(
    async ({ email, password }) => loginUser({ email, password }),
    {
      onSuccess: (data) => {
        if (data) {
          queryClient.invalidateQueries(["user"]);
          navigate("/");
        }
      },
      onError: (error) => {
        console.log(error, error.cause);
      },
    }
  );

  const { mutate: logout }: UseMutationResult<boolean, Error, unknown> = useMutation<boolean, Error, unknown>(async () => logoutUser(), {
    onSuccess(data) {
      if (data) {
        queryClient.setQueryData(["user"], null);
      }
    },
    onError(err) {
      console.log(err);
    },
  });

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    login({ password: e.target.password.value, email: e.target.email.value });
  };

  const handleLogout = (e: any) => {
    logout({});
  };

  return (
    <div>
      {!user ? (
        <form onSubmit={handleFormSubmit} autoComplete="off">
          <input name="email" defaultValue="ds@gmail.com"></input>
          <input name="password" defaultValue="kubo2013"></input>
          <button type="submit">Login</button>
        </form>
      ) : (
        <button onClick={handleLogout}>logout</button>
      )}
    </div>
  );
};

export default UserPage;
