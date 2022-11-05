import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginUser, logoutUser, registerUser } from "../UserQueries";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation(loginUser, {
    onSuccess: async data => {
      if (data) {
        queryClient.setQueryData(["user"], null);
        await queryClient.resetQueries(["user"]);
        navigate("/board");
      }
    },
    onError: error => {
      console.log(error, (error as Error).cause);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation<boolean, Error, unknown>(logoutUser, {
    onSuccess(data) {
      if (data) {
        queryClient.setQueryData(["user"], null);
      }
    },
    onError(err) {
      console.log(err);
    },
  });
};

export const useRegister = () => {
  const login = useLogin();

  return useMutation(registerUser, {
    onSuccess: (data, variables) => {
      login.mutate({ email: variables.email, password: variables.password });
    },
    onError: error => {
      console.log(error, (error as Error).cause);
    },
  });
};
